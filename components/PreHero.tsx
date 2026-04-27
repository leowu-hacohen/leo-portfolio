'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ICONS = ['teacup', 'submarine', 'microphone', 'burger', 'headphones', 'briefcase']
const ICON_DURATION = 0.6
const TOTAL_DURATION = ICONS.length * ICON_DURATION // 3.6s

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
          {/* Label */}
          <p
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              color: '#111111',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              margin: '0 0 32px 0',
            }}
          >
            Loading Products...
          </p>

          {/* Cycling icon — outer div handles enter/exit, inner img handles float */}
          <div style={{ position: 'relative', width: '140px', height: '140px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={ICONS[iconIndex]}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.1,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                transition={{
                  opacity: { duration: 0.25 },
                  scale: { type: 'spring', stiffness: 200, damping: 18 },
                }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <motion.img
                  src={`/icons/${ICONS[iconIndex]}.svg`}
                  alt={ICONS[iconIndex]}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 1.6,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 0.3,
                  }}
                  width={140}
                  height={140}
                  style={{ display: 'block', width: '140px', height: '140px' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: '32px',
              width: '200px',
              height: '6px',
              background: '#f0f0f0',
              borderRadius: '9999px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: TOTAL_DURATION, ease: 'linear' }}
              style={{
                height: '100%',
                background: '#111111',
                borderRadius: '9999px',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
