'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

export type GalleryPhoto = {
  n: string
  w: number
  h: number
  grid: string
  large: string
  full: string
  fullName: string
  size: string
}

type Props = {
  slug: string
  artist: string
  kicker: string | null
  photos: GalleryPhoto[]
  zip: { href: string; size: string } | null
}

function DownloadIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Gallery({ slug, artist, kicker, photos, zip }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const touchX = useRef<number | null>(null)

  // Download pings: one email per burst of downloads, not one per photo.
  const pending = useRef<Set<string>>(new Set())
  const flushTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flush = useCallback(() => {
    if (flushTimer.current) clearTimeout(flushTimer.current)
    if (pending.current.size === 0) return
    const body = JSON.stringify({ slug, items: [...pending.current] })
    pending.current.clear()
    const sent = navigator.sendBeacon?.('/api/photos/notify', new Blob([body], { type: 'application/json' }))
    if (!sent) fetch('/api/photos/notify', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {})
  }, [slug])
  const track = (item: string) => {
    pending.current.add(item)
    if (flushTimer.current) clearTimeout(flushTimer.current)
    if (item === 'zip') flush()
    else flushTimer.current = setTimeout(flush, 15_000)
  }
  useEffect(() => {
    const onHide = () => document.visibilityState === 'hidden' && flush()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
    }
  }, [flush])

  const go = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  )

  // Deep links: /photos/stevelacy#12 opens photo 12, so a team can point at a frame.
  useEffect(() => {
    const n = Number(window.location.hash.slice(1))
    if (n >= 1 && n <= photos.length) setOpen(n - 1)
  }, [photos.length])

  useEffect(() => {
    const url = `${window.location.pathname}${window.location.search}`
    history.replaceState(null, '', open === null ? url : `${url}#${open + 1}`)
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, go])

  // Masonry that reads left to right: each photo goes to the currently
  // shortest column, so 01 02 03 run across the top and columns stay balanced.
  const [cols, setCols] = useState(3)
  useEffect(() => {
    const fit = () => setCols(window.innerWidth < 1000 ? 2 : 3)
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  const columns: { p: GalleryPhoto; i: number }[][] = Array.from({ length: cols }, () => [])
  const heights = new Array(cols).fill(0)
  photos.forEach((p, i) => {
    const c = heights.indexOf(Math.min(...heights))
    columns[c].push({ p, i })
    heights[c] += p.h / p.w
  })

  const current = open === null ? null : photos[open]

  return (
    <>
      <style>{`
        .pg-grid { display: flex; gap: 14px; align-items: flex-start; }
        .pg-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 14px; }
        .pg-tile { position: relative; }
        @media (max-width: 640px) { .pg-grid, .pg-col { gap: 8px; } }
        .pg-dl { opacity: 0; transition: opacity .2s ease; }
        .pg-tile:hover .pg-dl, .pg-dl:focus-visible { opacity: 1; }
        @media (hover: none) { .pg-dl { opacity: 1; } }
        .pg-btn { transition: transform .15s ease, background .2s ease; }
        .pg-btn:active { transform: scale(.97); }
      `}</style>

      {/* Header */}
      <header
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '84px 5vw 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
      >
        <div>
          {kicker && <div style={{ fontFamily: instrument, fontSize: '14px', color: '#777', marginBottom: '14px' }}>{kicker}</div>}
          <h1 style={{ fontFamily: jakarta, fontSize: 'clamp(34px, 4.4vw, 52px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0, color: '#111' }}>
            {artist}
          </h1>
        </div>

        {photos.length > 0 && zip && (
          <a
            href={zip.href}
            download
            onClick={() => track('zip')}
            className="pg-btn"
            data-cursor-pill="Download all"
            aria-label={`Download all ${photos.length} photos as a zip, ${zip.size}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: '#111', color: '#fff', borderRadius: '999px', padding: '12px 20px', fontFamily: jakarta, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
            <DownloadIcon /> Download all
            <span style={{ fontWeight: 400, opacity: 0.6 }}>{zip.size}</span>
          </a>
        )}
      </header>

      {/* Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 5vw 120px' }}>
        {photos.length === 0 ? (
          <p style={{ fontFamily: jakarta, fontSize: '17px', color: '#888', margin: '40px 0' }}>
            Photos are on their way, check back soon.
          </p>
        ) : (
          <div className="pg-grid">
            {columns.map((col, c) => (
              <div key={c} className="pg-col">
            {col.map(({ p, i }) => (
              <motion.div
                key={p.n}
                className="pg-tile"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(i * 0.04, 0.5) }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo ${i + 1} of ${photos.length}`}
                  data-cursor-pill="View"
                  style={{ display: 'block', width: '100%', padding: 0, border: 0, background: '#e9e9e9', borderRadius: '4px', overflow: 'hidden', cursor: 'zoom-in', aspectRatio: `${p.w} / ${p.h}` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.grid} alt={`${artist}, photo ${i + 1}`} width={p.w} height={p.h} loading={i < 6 ? 'eager' : 'lazy'} decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
                <a
                  href={p.full}
                  download={p.fullName}
                  onClick={() => track(p.n)}
                  className="pg-dl"
                  aria-label={`Download photo ${i + 1} at full resolution, ${p.size}`}
                  data-cursor-pill={`Download · ${p.size}`}
                  style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '999px', background: 'rgba(255,255,255,0.92)', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.18)' }}
                >
                  <DownloadIcon />
                </a>
                <span style={{ position: 'absolute', left: '10px', bottom: '10px', fontFamily: jakarta, fontSize: '11px', fontWeight: 600, color: '#fff', background: 'rgba(0,0,0,0.45)', borderRadius: '999px', padding: '3px 8px', pointerEvents: 'none' }}>
                  {p.n}
                </span>
              </motion.div>
            ))}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${open + 1} of ${photos.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(null)}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
              touchX.current = null
            }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(12,12,12,0.94)', display: 'flex', flexDirection: 'column' }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', color: '#fff', fontFamily: jakarta, fontSize: '13px' }}>
              <span style={{ opacity: 0.7 }}>
                {open + 1} / {photos.length}
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={current.full}
                  download={current.fullName}
                  onClick={() => track(current.n)}
                  aria-label={`Download this photo at full resolution, ${current.size}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#111', borderRadius: '999px', padding: '8px 14px', fontWeight: 600, textDecoration: 'none' }}
                >
                  <DownloadIcon size={14} /> Download <span style={{ fontWeight: 400, opacity: 0.55 }}>{current.size}</span>
                </a>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: 0, borderRadius: '999px', width: '36px', height: '36px', fontSize: '18px', cursor: 'pointer' }}>
                  ×
                </button>
              </div>
            </div>

            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 64px 24px', minHeight: 0 }}>
              <AnimatePresence mode="wait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={current.n}
                  src={current.large}
                  alt={`${artist}, photo ${open + 1}`}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '3px', userSelect: 'none' }}
                />
              </AnimatePresence>
              {photos.length > 1 &&
                ([-1, 1] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-label={d < 0 ? 'Previous photo' : 'Next photo'}
                    onClick={(e) => {
                      e.stopPropagation()
                      go(d)
                    }}
                    style={{ position: 'absolute', top: '50%', [d < 0 ? 'left' : 'right']: '14px', transform: 'translateY(-50%)', width: '42px', height: '42px', borderRadius: '999px', border: 0, background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: '20px', cursor: 'pointer' }}
                  >
                    {d < 0 ? '‹' : '›'}
                  </button>
                ))}
            </div>

            {/* Preload neighbors so arrowing through feels instant */}
            <div aria-hidden="true" style={{ display: 'none' }}>
              {[1, -1].map((d) => {
                const nb = photos[(open + d + photos.length) % photos.length]
                // eslint-disable-next-line @next/next/no-img-element
                return <img key={d} src={nb.large} alt="" />
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
