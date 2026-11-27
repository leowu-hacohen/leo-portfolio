import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Arrange from '../../../../components/photos/Arrange'
import { getPhotoSet, photoUrls } from '../../../../lib/photos'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Arrange photos', robots: { index: false, follow: false } }

export default async function ArrangePage({ params }: { params: Promise<{ slug: string }> }) {
  // Local-only tool: never served from the live site.
  if (process.env.NODE_ENV !== 'development') notFound()

  const set = getPhotoSet((await params).slug)
  if (!set) notFound()

  const known = set.photos.map((p) => p.n)
  const file = join(process.cwd(), 'data', 'photos', '.arrange', `${set.slug}.json`)
  let saved: { order: string[]; hidden: string[] } | null = null
  if (existsSync(file)) {
    const s = JSON.parse(readFileSync(file, 'utf8'))
    const valid = s.order?.length === known.length && [...s.order].sort().join() === [...known].sort().join()
    if (valid) saved = { order: s.order, hidden: s.hidden ?? [] }
  }

  return (
    <div style={{ background: '#F4F4F4', minHeight: '100vh' }}>
      <Arrange
        slug={set.slug}
        artist={set.artist}
        photos={set.photos.map((p) => ({ n: p.n, grid: photoUrls(set, p).grid }))}
        saved={saved}
      />
    </div>
  )
}
