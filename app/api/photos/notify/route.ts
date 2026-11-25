import { formatBytes, getPhotoSet } from '../../../../lib/photos'

/**
 * Emails Leo when someone downloads from a gallery.
 * The gallery batches downloads into one ping per burst, so a team grabbing
 * ten photos produces one email, not ten.
 *
 * Needs two env vars (set in Vercel, Project → Settings → Environment Variables):
 *   RESEND_API_KEY  from resend.com (free tier is plenty)
 *   NOTIFY_EMAIL    where pings go; must be the email you signed up to Resend with
 * Without them the route accepts the ping and does nothing.
 */

export const runtime = 'nodejs'

const SITE = 'https://www.leowuhacohen.com'

// Best effort cap so a spammed endpoint can't flood the inbox (per server instance).
const MAX_PER_HOUR = 30
let windowStart = Date.now()
let sentThisWindow = 0

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(null, { status: 400 })
  }
  const { slug, items } = (body ?? {}) as { slug?: unknown; items?: unknown }
  if (typeof slug !== 'string' || !/^[a-z0-9-]{1,60}$/.test(slug) || !Array.isArray(items)) {
    return new Response(null, { status: 400 })
  }

  const set = getPhotoSet(slug)
  if (!set) return new Response(null, { status: 404 })

  const known = new Set(set.photos.map((p) => p.n))
  const picked = [...new Set(items.slice(0, 300).filter((i): i is string => typeof i === 'string'))]
  const wantsZip = picked.includes('zip') && set.zip !== null
  const photoNums = picked.filter((i) => known.has(i)).sort()
  if (!wantsZip && photoNums.length === 0) return new Response(null, { status: 400 })

  const now = Date.now()
  if (now - windowStart > 3_600_000) {
    windowStart = now
    sentThisWindow = 0
  }
  if (sentThisWindow >= MAX_PER_HOUR) return new Response(null, { status: 429 })

  const h = req.headers
  const decode = (v: string | null) => (v ? decodeURIComponent(v) : null)
  const where = [decode(h.get('x-vercel-ip-city')), h.get('x-vercel-ip-country-region'), h.get('x-vercel-ip-country')]
    .filter(Boolean)
    .join(', ')
  const ua = h.get('user-agent') ?? ''
  const device = /iPhone/.test(ua) ? 'an iPhone' : /iPad/.test(ua) ? 'an iPad' : /Android/.test(ua) ? 'an Android phone' : /Macintosh/.test(ua) ? 'a Mac' : /Windows/.test(ua) ? 'a Windows PC' : 'a browser'

  const what = [
    wantsZip && set.zip ? `All ${set.photos.length} photos (zip, ${formatBytes(set.zip.bytes)})` : null,
    photoNums.length ? `Photo${photoNums.length > 1 ? 's' : ''} ${photoNums.join(', ')}` : null,
  ].filter(Boolean) as string[]

  const subject = wantsZip
    ? `${set.artist}: someone downloaded the full set`
    : `${set.artist}: ${photoNums.length} photo${photoNums.length > 1 ? 's' : ''} downloaded`
  const when = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'medium', timeStyle: 'short' })
  const text = [
    `Someone on ${device}${where ? ` near ${where}` : ''} downloaded from your ${set.artist} gallery:`,
    '',
    ...what.map((w) => `  - ${w}`),
    '',
    `${when} Pacific`,
    `${SITE}/photos/${set.slug}`,
  ].join('\n')

  const key = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_EMAIL
  if (!key || !to) {
    if (process.env.NODE_ENV !== 'production') console.log(`[photo ping, not sent: no RESEND_API_KEY/NOTIFY_EMAIL]\n${subject}\n${text}`)
    return new Response(null, { status: 204 })
  }

  sentThisWindow++
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Photo pings <onboarding@resend.dev>', to: [to], subject, text }),
  })
  if (!res.ok) console.error('photo ping failed', res.status, await res.text())
  return new Response(null, { status: res.ok ? 204 : 502 })
}
