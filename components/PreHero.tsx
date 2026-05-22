'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ICONS = ['teacup', 'submarine', 'microphone', 'burger', 'headphones', 'briefcase']
const T = 0.9
const ICON_DURATION = 0.6 * T
const TOTAL_DURATION = ICONS.length * ICON_DURATION

// Must match Hero.tsx ringIcons positions exactly
const RING_ICONS = [
  { name: 'teacup',     top: 18, leftPct: 18,  rightPct: null, rotation: -10 },
  { name: 'submarine',  top: 18, leftPct: null, rightPct: 18,  rotation: 8   },
  { name: 'briefcase',  top: 46, leftPct: 10,  rightPct: null, rotation: -6  },
  { name: 'microphone', top: 46, leftPct: null, rightPct: 10,  rotation: 6   },
  { name: 'headphones', top: 74, leftPct: 20,  rightPct: null, rotation: -8  },
  { name: 'burger',     top: 74, leftPct: null, rightPct: 20,  rotation: 10  },
]

const ICON_SIZE = 160

interface PreHeroProps {
  onComplete: () => void
}

export default function PreHero({ onComplete }: PreHeroProps) {
  const [iconIndex, setIconIndex] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'dispersing'>('cycling')
  const [bgVisible, setBgVisible] = useState(true)
  const [targets, setTargets] = useState<Array<{ x: number; y: number }>>([])
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete })

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex(i => Math.min(i + 1, ICONS.length - 1))
    }, ICON_DURATION * 1000)

    const disperseTimer = setTimeout(() => {
      clearInterval(interval)

      const w = window.innerWidth
      const h = window.innerHeight
      // Top-left corner of a centered 160×160 icon
      const cx = w / 2 - ICON_SIZE / 2
      const cy = h / 2 - ICON_SIZE / 2

      const computed = RING_ICONS.map(icon => {
        const targetLeft = icon.leftPct !== null
          ? (icon.leftPct / 100) * w
          : w - (icon.rightPct! / 100) * w - ICON_SIZE
        const targetTop = (icon.top / 100) * h
        return { x: targetLeft - cx, y: targetTop - cy }
      })

      setTargets(computed)
      setPhase('dispersing')
    }, TOTAL_DURATION * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(disperseTimer)
    }
  }, [])

  // Icons fly for ~700 ms, then fade the overlay; call onComplete once fully clear
  useEffect(() => {
    if (phase !== 'dispersing') return
    const bgTimer  = setTimeout(() => setBgVisible(false), 700)
    const doneTimer = setTimeout(() => onCompleteRef.current(), 700 + 520)
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(doneTimer)
    }
  }, [phase])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        pointerEvents: phase === 'dispersing' ? 'none' : 'auto',
      }}
    >
      {/* White overlay — fades out after icons have reached their positions */}
      <AnimatePresence>
        {bgVisible && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.52, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, background: '#ffffff' }}
          />
        )}
      </AnimatePresence>

      {/* Cycling phase — single icon at center */}
      {phase === 'cycling' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
        </div>
      )}

      {/* Disperse phase — all icons fly from center to ring positions */}
      {phase === 'dispersing' && targets.length > 0 &&
        RING_ICONS.map((icon, i) => (
          <motion.div
            key={icon.name}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.88, rotate: 0 }}
            animate={{
              opacity: 1,
              x: targets[i].x,
              y: targets[i].y,
              scale: 1,
              rotate: icon.rotation,
            }}
            transition={{
              opacity: { duration: 0.22, delay: i * 0.045 },
              x:       { type: 'spring', stiffness: 80, damping: 17, delay: i * 0.045 },
              y:       { type: 'spring', stiffness: 80, damping: 17, delay: i * 0.045 },
              scale:   { type: 'spring', stiffness: 160, damping: 20, delay: i * 0.045 },
              rotate:  { type: 'spring', stiffness: 110, damping: 20, delay: i * 0.045 },
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: `-${ICON_SIZE / 2}px`,
              marginLeft: `-${ICON_SIZE / 2}px`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/icons/${icon.name}.svg`}
              alt={icon.name}
              width={ICON_SIZE}
              height={ICON_SIZE}
              style={{ display: 'block', width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px` }}
            />
          </motion.div>
        ))
      }
    </div>
  )
}
