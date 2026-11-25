import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Gallery, { type GalleryPhoto } from '../../../components/photos/Gallery'
import PhotosNav from '../../../components/photos/PhotosNav'
import { formatBytes, formatShowDate, getAllPhotoSets, getPhotoSet, photoUrls, zipUrl } from '../../../lib/photos'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPhotoSets().map((s) => ({ slug: s.slug }))
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const set = getPhotoSet((await params).slug)
  if (!set) return {}
  const title = `${set.artist} · Photos by ${set.credit}`
  const where = [set.venue, formatShowDate(set.date)].filter(Boolean).join(', ')
  const description = set.photos.length
    ? `${set.photos.length} photos${where ? ` from ${where}` : ''}. Download one or all of them in a click.`
    : `Photos by ${set.credit}, coming soon.`
  const cover = set.photos[set.cover - 1]
  const image = cover ? photoUrls(set, cover).large : undefined
  return {
    metadataBase: new URL('https://www.leowuhacohen.com'),
    title,
    description,
    robots: set.unlisted ? { index: false, follow: false } : undefined,
    openGraph: { title, description, type: 'website', images: image ? [image] : undefined },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, images: image ? [image] : undefined },
  }
}

export default async function PhotoSetPage({ params }: Params) {
  const set = getPhotoSet((await params).slug)
  if (!set) notFound()

  const kicker = [set.event, set.venue, set.city, formatShowDate(set.date)].filter(Boolean).join(' · ') || 'Photos'
  const photos: GalleryPhoto[] = set.photos.map((p) => ({
    n: p.n,
    w: p.w,
    h: p.h,
    ...photoUrls(set, p),
    fullName: p.full,
    size: formatBytes(p.bytes),
  }))
  const zipHref = zipUrl(set)

  return (
    <div style={{ background: '#F4F4F4', minHeight: '100vh' }}>
      <PhotosNav back="/photos" />
      <Gallery
        artist={set.artist}
        kicker={kicker}
        credit={set.credit}
        photos={photos}
        zip={zipHref && set.zip ? { href: zipHref, size: formatBytes(set.zip.bytes) } : null}
      />
    </div>
  )
}
