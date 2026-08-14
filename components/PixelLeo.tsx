'use client'

/*
  PixelLeo — a tiny pixel-art Leo that walks along the bottom of the
  viewport (sprite idea borrowed from Megan Yap's site pet, character is
  Leo). Walks left/right and turns around at the viewport edges; click
  him for a quip; drag him anywhere and he falls back to the ground and
  keeps walking. Respects prefers-reduced-motion (stands still, still
  talks on click).
*/

import { useEffect, useRef, useState } from 'react'

const SPRITE_W = 44
const SPRITE_H = 64
const SPEED = 42 // px per second
const GREETING = "hi, i'm leo :)"

const QUIPS = [
  "you can't beat someone who's having fun",
  'i used to shoot concerts',
  'i came into tech from the side door',
  'drag me somewhere!',
  'kind of useless but fun',
  'scroll down, the work is good i promise',
  'ok back to walking',
]

export default function PixelLeo() {
  const spriteRef = useRef<HTMLDivElement | null>(null)
  const x = useRef(24)
  const dir = useRef<1 | -1>(1)
  const dragging = useRef(false)
  const walking = useRef(true)
  const quipIndex = useRef(0)
  const [bubble, setBubble] = useState<string | null>(null)
  const [reduced, setReduced] = useState(false)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function say(text: string, ms = 2600) {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    setBubble(text)
    bubbleTimer.current = setTimeout(() => setBubble(null), ms)
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)

    const greet = setTimeout(() => say(GREETING, 3200), 1200)

    if (mq.matches) return () => clearTimeout(greet)

    let raf = 0
    let last = performance.now()

    function frame(now: number) {
      const dt = Math.min(now - last, 48) / 1000
      last = now
      if (walking.current && !dragging.current) {
        x.current += dir.current * SPEED * dt
        const max = window.innerWidth - SPRITE_W - 12
        if (x.current > max) {
          x.current = max
          dir.current = -1
        } else if (x.current < 12) {
          x.current = 12
          dir.current = 1
        }
        const el = spriteRef.current
        if (el) {
          el.style.transform = `translateX(${x.current}px)`
          const img = el.querySelector('img')
          if (img) img.style.transform = `scaleX(${dir.current === 1 ? 1 : -1})`
        }
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(greet)
    }
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    const el = spriteRef.current
    if (!el) return
    e.preventDefault()
    dragging.current = true
    walking.current = false
    const offsetX = e.clientX - x.current
    let movedFar = false

    function move(ev: PointerEvent) {
      movedFar = movedFar || Math.abs(ev.clientX - offsetX - x.current) > 4
      x.current = Math.max(0, Math.min(window.innerWidth - SPRITE_W, ev.clientX - offsetX))
      const lift = Math.max(
        0,
        Math.min(window.innerHeight - SPRITE_H, window.innerHeight - ev.clientY - SPRITE_H / 2),
      )
      el!.style.transform = `translateX(${x.current}px) translateY(${-lift}px) rotate(${dir.current * 6}deg)`
    }
    function up() {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      if (!movedFar) {
        // it was a tap, not a drag; let onClick handle it
        dragging.current = false
        walking.current = true
        return
      }
      el!.style.transition = 'transform 0.4s cubic-bezier(0.3, 1.5, 0.5, 1)'
      el!.style.transform = `translateX(${x.current}px)`
      setTimeout(() => {
        el!.style.transition = ''
        dragging.current = false
        walking.current = true
      }, 430)
      say('ok back to walking', 1600)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  function onClick() {
    if (dragging.current) return
    say(QUIPS[quipIndex.current % QUIPS.length])
    quipIndex.current += 1
  }

  return (
    <div
      ref={spriteRef}
      onPointerDown={reduced ? undefined : onPointerDown}
      onClick={onClick}
      role="img"
      aria-label="pixel Leo walking around"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: SPRITE_W,
        height: SPRITE_H,
        zIndex: 60,
        cursor: 'grab',
        transform: `translateX(${reduced ? 24 : x.current}px)`,
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {bubble && (
        <div
          style={{
            position: 'absolute',
            bottom: SPRITE_H + 10,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(22, 19, 14, 0.92)',
            color: '#FBF8F3',
            fontFamily: 'var(--font-instrument), sans-serif',
            fontSize: '12.5px',
            lineHeight: 1.35,
            padding: '7px 12px',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {bubble}
          <span
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(22, 19, 14, 0.92)',
            }}
          />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pet/leo-sprite.png"
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
          animation: reduced ? undefined : 'pixel-leo-walk 0.55s ease-in-out infinite',
          transformOrigin: '50% 100%',
        }}
      />
      <style>{`
        @keyframes pixel-leo-walk {
          0%, 100% { translate: 0 0; rotate: -2.5deg; }
          50% { translate: 0 -2.5px; rotate: 2.5deg; }
        }
      `}</style>
    </div>
  )
}
