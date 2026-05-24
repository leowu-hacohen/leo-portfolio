'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ICONS = ['teacup', 'submarine', 'microphone', 'burger', 'headphones', 'briefcase']
const T = 0.9
const ICON_DURATION = 0.6 * T
const TOTAL_DURATION = ICONS.length * ICON_DURATION

interface PreHeroProps {
  // Called the instant we start fading out — parent mounts Hero behind us
  // so its entry animation overlaps with our exit (seamless reveal).
  onReveal: () => void
  // Called after fade-out fully completes — parent removes us from the tree.
  onExit: () => void
}

export default function PreHero({ onReveal, onExit }: PreHeroProps) {
  const [iconIndex, setIconIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const onRevealRef = useRef(onReveal)
  const onExitRef = useRef(onExit)
  useEffect(() => { onRevealRef.current = onReveal })
  useEffect(() => { onExitRef.current = onExit })

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex(i => Math.min(i + 1, ICONS.length - 1))
    }, ICON_DURATION * 1000)

    const hideTimer = setTimeout(() => {
      clearInterval(interval)
      onRevealRef.current()
      setVisible(false)
    }, TOTAL_DURATION * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => onExitRef.current()}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 * T, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
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
                  transition: { duration: 0.28 * T, ease: 'easeOut' },
                }}
                transition={{
                  opacity: { duration: 0.22 * T },
                  scale:  { type: 'spring', stiffness: 180, damping: 22 },
                  y:      { type: 'spring', stiffness: 150, damping: 22 },
                  rotate: { type: 'spring', stiffness: 130, damping: 22 },
                }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <motion.img
                  src={`/icons/${ICONS[iconIndex]}.svg`}
                  alt={ICONS[iconIndex]}
                  animate={{ y: [0, -10, 0, 6, 0], rotate: [0, -4, 0, 4, 0] }}
                  transition={{
                    duration: 2.4 * T,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 0.18 * T,
                  }}
                  width={160}
                  height={160}
                  style={{ display: 'block', width: '160px', height: '160px' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
