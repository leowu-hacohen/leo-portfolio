'use client'

import { useEffect, useRef, useState } from 'react'

const jakarta = 'var(--font-jakarta), sans-serif'

type Tile = { n: string; grid: string }
type Saved = { order: string[]; hidden: string[] } | null

export default function Arrange({ slug, artist, photos, saved }: { slug: string; artist: string; photos: Tile[]; saved: Saved }) {
  const byN = Object.fromEntries(photos.map((p) => [p.n, p]))
  const [order, setOrder] = useState<string[]>(saved?.order ?? photos.map((p) => p.n))
  const [hidden, setHidden] = useState<Set<string>>(new Set(saved?.hidden ?? []))
  const [dragN, setDragN] = useState<string | null>(null)
  const [overN, setOverN] = useState<string | null>(null)
  const [status, setStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null)
  const first = useRef(true)
  // Pointer-driven drag: a press only becomes a drag after 5px of movement,
  // so the nudge/hide buttons keep working as plain clicks.
  const drag = useRef<{ n: string; x: number; y: number; active: boolean } | null>(null)
  const over = useRef<string | null>(null)

  const onPointerDown = (e: React.PointerEvent, n: string) => {
    if (e.button !== 0 || (e.target as Element).closest('button')) return
    drag.current = { n, x: e.clientX, y: e.clientY, active: false }
    ;(e.currentTarget as Element).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    if (!d.active && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) {
      d.active = true
      setDragN(d.n)
    }
    if (!d.active) return
    setGhost({ x: e.clientX, y: e.clientY })
    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-n]')?.getAttribute('data-n') ?? null
    over.current = target
    setOverN(target)
  }
  const onPointerUp = () => {
    const d = drag.current
    if (d?.active && over.current && over.current !== d.n) move(d.n, order.indexOf(over.current))
    drag.current = null
    over.current = null
    setDragN(null)
    setOverN(null)
    setGhost(null)
  }

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setStatus('saving')
    const t = setTimeout(() => {
      fetch('/api/photos/arrange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, order, hidden: [...hidden] }),
      })
        .then((r) => setStatus(r.ok ? 'saved' : 'error'))
        .catch(() => setStatus('error'))
    }, 250)
    return () => clearTimeout(t)
  }, [order, hidden, slug])

  const move = (n: string, to: number) =>
    setOrder((o) => {
      const next = o.filter((x) => x !== n)
      next.splice(Math.max(0, Math.min(to, next.length)), 0, n)
      return next
    })
  const toggleHidden = (n: string) =>
    setHidden((h) => {
      const next = new Set(h)
      if (next.has(n)) next.delete(n)
      else next.add(n)
      return next
    })

  const visibleCount = order.length - hidden.size
  const chip: React.CSSProperties = { border: 0, borderRadius: '999px', background: 'rgba(255,255,255,0.92)', color: '#111', fontFamily: jakarta, fontSize: '12px', fontWeight: 600, padding: '5px 9px', cursor: 'pointer' }

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 4vw 120px', fontFamily: jakarta }}>
      <style>{`
        .ar-tile .ar-tools { opacity: 0; transition: opacity .15s ease; }
        .ar-tile:hover .ar-tools { opacity: 1; }
      `}</style>

      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: '#F4F4F4', padding: '16px 0 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c2410c' }}>Arrange mode · only on your computer</div>
          <h1 style={{ fontSize: '30px', fontWeight: 700, letterSpacing: '-0.02em', margin: '6px 0 6px', color: '#111' }}>{artist}</h1>
          <p style={{ fontSize: '14px', color: '#666', margin: 0, maxWidth: '640px', lineHeight: 1.55 }}>
            Drag photos into the order you want. Position 1 is the cover. Hover a photo to nudge it or hide it from the set.
            Everything saves as you go, so tell Claude to lock it in when you&apos;re done.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
          <span style={{ color: '#666' }}>
            {visibleCount} in the set{hidden.size > 0 && ` · ${hidden.size} hidden`}
          </span>
          <span style={{ fontWeight: 600, color: status === 'error' ? '#b91c1c' : status === 'saving' ? '#a16207' : '#15803d' }}>
            {status === 'error' ? 'Not saved, is the dev server running?' : status === 'saving' ? 'Saving…' : 'Saved ✓'}
          </span>
          <button
            type="button"
            onClick={() => {
              setOrder(photos.map((p) => p.n))
              setHidden(new Set())
            }}
            style={{ border: '1px solid #ddd', background: '#fff', borderRadius: '999px', padding: '8px 14px', fontFamily: jakarta, fontSize: '13px', cursor: 'pointer' }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '14px', marginTop: '10px' }}>
        {order.map((n, i) => {
          const isHidden = hidden.has(n)
          const isOver = overN === n && dragN !== n
          return (
            <div
              key={n}
              className="ar-tile"
              data-n={n}
              onPointerDown={(e) => onPointerDown(e, n)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                position: 'relative',
                cursor: dragN ? 'grabbing' : 'grab',
                userSelect: 'none',
                opacity: dragN === n ? 0.35 : 1,
                outline: isOver ? '3px solid #2563eb' : 'none',
                outlineOffset: '3px',
                borderRadius: '6px',
                transition: 'outline-color .1s',
              }}
            >
              <div style={{ aspectRatio: '4 / 5', background: '#111', borderRadius: '6px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={byN[n].grid}
                  alt={`Photo ${n}`}
                  draggable={false}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: isHidden ? 'grayscale(1)' : 'none', opacity: isHidden ? 0.3 : 1 }}
                />
              </div>
              <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '6px', alignItems: 'center', pointerEvents: 'none' }}>
                <span style={{ background: i === 0 && !isHidden ? '#2563eb' : '#111', color: '#fff', borderRadius: '999px', fontSize: '13px', fontWeight: 700, minWidth: '26px', height: '26px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 7px' }}>
                  {i + 1}
                </span>
                {i === 0 && !isHidden && <span style={{ background: '#2563eb', color: '#fff', borderRadius: '999px', fontSize: '11px', fontWeight: 600, padding: '4px 8px' }}>Cover</span>}
                {isHidden && <span style={{ background: '#b91c1c', color: '#fff', borderRadius: '999px', fontSize: '11px', fontWeight: 600, padding: '4px 8px' }}>Hidden</span>}
              </div>
              <span style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', pointerEvents: 'none' }}>was {n}</span>
              <div className="ar-tools" style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', gap: '5px' }}>
                <button type="button" aria-label="Move earlier" onClick={() => move(n, i - 1)} disabled={i === 0} style={chip}>←</button>
                <button type="button" aria-label="Move later" onClick={() => move(n, i + 1)} disabled={i === order.length - 1} style={chip}>→</button>
                <button type="button" onClick={() => move(n, 0)} style={chip}>First</button>
                <button type="button" onClick={() => toggleHidden(n)} style={chip}>{isHidden ? 'Show' : 'Hide'}</button>
              </div>
            </div>
          )
        })}
      </div>

      {dragN && ghost && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={byN[dragN].grid}
          alt=""
          style={{ position: 'fixed', left: ghost.x - 45, top: ghost.y - 56, width: '90px', height: '112px', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 12px 30px rgba(0,0,0,0.35)', pointerEvents: 'none', zIndex: 50, transform: 'rotate(-3deg)' }}
        />
      )}
    </div>
  )
}
