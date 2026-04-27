'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ICONS = ['teacup', 'submarine', 'microphone', 'burger', 'headphones', 'briefcase']
const ICON_DURATION = 0.6
const TOTAL_DURATION = ICONS.length * ICON_DURATION // 3.6s

const jakarta = 'var(--font-jakarta), sans-serif'

interface PreHeroProps {
  onComplete: () => void
}

export default function PreHero({ onComplete }: PreHeroProps) {
  const [iconIndex, setIconIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex(i => Math.min(i + 1, ICONS.length - 1))
    }, ICON_DURATION * 1000)

    const hideTimer = setTimeout(() => {
      clearInterval(interval)
      setVisible(false)
    }, TOTAL_DURATION * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current()}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          {/* Cycling icon. Outer wrapper handles enter / exit (scale + rotate +
              vertical pop). Inner motion.img handles a perpetual float + soft
              rotation so the icon feels alive while it's on screen. */}
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={ICONS[iconIndex]}
                initial={{ opacity: 0, scale: 0.55, y: 24, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{
                  opacity: 0,
                  scale: 1.18,
                  y: -18,
                  rotate: 12,
                  transition: { duration: 0.28, ease: 'easeOut' },
                }}
                transition={{
                  opacity: { duration: 0.22 },
                  scale: { type: 'spring', stiffness: 320, damping: 14 },
                  y: { type: 'spring', stiffness: 260, damping: 16 },
                  rotate: { type: 'spring', stiffness: 220, damping: 14 },
                }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <motion.img
                  src={`/icons/${ICONS[iconIndex]}.svg`}
                  alt={ICONS[iconIndex]}
                  animate={{
                    y: [0, -10, 0, 6, 0],
                    rotate: [0, -4, 0, 4, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 0.18,
                  }}
                  width={160}
                  height={160}
                  style={{ display: 'block', width: '160px', height: '160px' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step dots: one for each icon. The dot for the active icon scales
              up + fills black; previous dots stay filled, future dots stay
              ghosted. Reads as a tactile "loading" indicator that matches the
              minimal black-on-white theme. */}
          <div
            style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {ICONS.map((name, i) => {
              const active = i === iconIndex
              const passed = i < iconIndex
              return (
                <motion.span
                  key={name}
                  animate={{
                    scale: active ? 1.4 : 1,
                    backgroundColor: passed || active ? '#111111' : '#e5e5e5',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 22,
                  }}
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '999px',
                  }}
                />
              )
            })}
          </div>

          {/* Subtle caption */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
            style={{
              marginTop: '20px',
              fontFamily: jakarta,
              fontSize: '11px',
              fontWeight: 500,
              color: '#999',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Warming up
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
