import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { getPhotoSet } from '../../../../lib/photos'

/**
 * Local-only store for arrange mode (/photos/<slug>/arrange).
 * Saves the order Leo drags photos into, plus any he hides, to
 * data/photos/.arrange/<slug>.json (gitignored). Running the import script
 * in that order is what "locks it in". Disabled outside `next dev`.
 */

const DIR = join(process.cwd(), 'data', 'photos', '.arrange')
const devOnly = () => process.env.NODE_ENV !== 'development'

export async function GET(req: Request) {
  if (devOnly()) return new Response(null, { status: 404 })
  const slug = new URL(req.url).searchParams.get('slug') ?? ''
  const file = join(DIR, `${slug}.json`)
  if (!/^[a-z0-9-]+$/.test(slug) || !existsSync(file)) return Response.json(null)
  return Response.json(JSON.parse(readFileSync(file, 'utf8')))
}

export async function POST(req: Request) {
  if (devOnly()) return new Response(null, { status: 404 })
  const { slug, order, hidden } = (await req.json()) as { slug: string; order: string[]; hidden: string[] }
  const set = getPhotoSet(slug)
  if (!set) return new Response(null, { status: 404 })
  const known = set.photos.map((p) => p.n)
  const isPermutation = order.length === known.length && [...order].sort().join() === [...known].sort().join()
  if (!isPermutation || !hidden.every((n) => known.includes(n))) return new Response(null, { status: 400 })
  mkdirSync(DIR, { recursive: true })
  writeFileSync(join(DIR, `${slug}.json`), JSON.stringify({ order, hidden, savedAt: new Date().toISOString() }, null, 2) + '\n')
  return new Response(null, { status: 204 })
}
