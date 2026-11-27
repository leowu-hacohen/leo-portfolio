import type { Metadata } from 'next'
import Link from 'next/link'
import PhotosNav from '../../components/photos/PhotosNav'
import { formatShowDate, getAllPhotoSets, photoUrls } from '../../lib/photos'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

export const metadata: Metadata = {
  title: 'Photos · Leo Wu-Hacohen',
  description: 'Concert and artist photography by Leo Wu-Hacohen.',
}

export default function PhotosIndex() {
  const sets = getAllPhotoSets().filter((s) => !s.unlisted && s.photos.length > 0)

  return (
    <div style={{ background: '#F4F4F4', minHeight: '100vh' }}>
      <PhotosNav />
      <main style={{ padding: '120px max(16px, 4vw) 120px' }}>
        <div style={{ fontFamily: instrument, fontSize: '14px', color: '#777', marginBottom: '14px' }}>Photos</div>
        <h1 style={{ fontFamily: jakarta, fontSize: 'clamp(30px, 3.6vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0, color: '#111', maxWidth: '720px' }}>
          Concerts and artists I&apos;ve photographed.
        </h1>

        {sets.length === 0 ? (
          <p style={{ fontFamily: jakarta, fontSize: '17px', color: '#888', marginTop: '40px' }}>
            The first gallery is on its way, check back soon.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px 18px', marginTop: '48px' }}>
            {sets.map((set) => {
              const cover = set.photos[set.cover - 1] ?? set.photos[0]
              const meta = [set.venue, formatShowDate(set.date)].filter(Boolean).join(' · ')
              return (
                <Link key={set.slug} href={`/photos/${set.slug}`} data-cursor-pill="Open gallery" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ aspectRatio: '4 / 5', borderRadius: '4px', overflow: 'hidden', background: '#e6e6e6' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoUrls(set, cover).grid} alt={`${set.artist} cover`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ fontFamily: jakarta, fontSize: '18px', fontWeight: 700, color: '#111', marginTop: '14px', letterSpacing: '-0.01em' }}>{set.artist}</div>
                  <div style={{ fontFamily: jakarta, fontSize: '13.5px', color: '#888', marginTop: '4px' }}>
                    {meta ? `${meta} · ` : ''}
                    {set.photos.length} photos
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
