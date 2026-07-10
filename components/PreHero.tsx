'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ObjectIcon from './ObjectIcon'
import { heroRingIcons } from './heroRingIcons'
import { caseStudyRadius } from './caseStudyTheme'

const ICON_SIZE = 160
// Faster icon steps; longer overlay fade so the reveal into Hero feels gradual.
const ICON_STEP_MS = 340
const FADE_OUT_MS = 950
// Extra beat on the last icon so AI @ UCI (and the final swap) registers before fade.
const TOTAL_MS = heroRingIcons.length * ICON_STEP_MS + 280

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
  const [ready, setReady] = useState(false)
  const onRevealRef = useRef(onReveal)
  const onExitRef = useRef(onExit)
  useEffect(() => { onRevealRef.current = onReveal })
  useEffect(() => { onExitRef.current = onExit })

  // Preload every intro icon before the timer starts so first-load has no
  // network/decode race against the 340ms slot. Cached loads resolve instantly.
  useEffect(() => {
    let cancelled = false
    const loads = heroRingIcons.map(icon => new Promise<void>(resolve => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = `/icons/${icon.name}.${icon.ext ?? 'svg'}`
    }))
    // Hard cap so a stuck asset can't strand the intro forever.
    const cap = new Promise<void>(resolve => setTimeout(resolve, 1200))
    Promise.race([Promise.all(loads).then(() => {}), cap]).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!ready) return
    const interval = setInterval(() => {
      setIconIndex(i => Math.min(i + 1, heroRingIcons.length - 1))
    }, ICON_STEP_MS)

    const hideTimer = setTimeout(() => {
      clearInterval(interval)
      onRevealRef.current()
      setVisible(false)
    }, TOTAL_MS)

    return () => {
      clearInterval(interval)
      clearTimeout(hideTimer)
    }
  }, [ready])

  const icon = heroRingIcons[iconIndex]

  return (
    <AnimatePresence onExitComplete={() => onExitRef.current()}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#F4F4F4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div style={{ position: 'relative', width: `${ICON_SIZE}px`, height: `${ICON_SIZE}px` }}>
            <AnimatePresence mode="sync">
              <motion.div
                key={icon.name}
                initial={{ opacity: 0, scale: 0.72, y: 14, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{
                  opacity: 0,
                  scale: 1.08,
                  y: -10,
                  rotate: 8,
                  transition: { duration: 0.14, ease: 'easeIn' },
                }}
                transition={{
                  opacity: { duration: 0.12 },
                  scale:  { type: 'spring', stiffness: 420, damping: 32 },
                  y:      { type: 'spring', stiffness: 380, damping: 30 },
                  rotate: { type: 'spring', stiffness: 340, damping: 28 },
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0, 4, 0] }}
                  transition={{
                    duration: 1.6,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 0.08,
                  }}
                  style={{
                    transform: icon.scale ? `scale(${icon.scale})` : undefined,
                    background: icon.introBackdrop,
                    borderRadius: icon.introBackdrop ? caseStudyRadius : undefined,
                    padding: icon.introBackdrop ? '14px' : undefined,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ObjectIcon
                    name={icon.name}
                    ext={icon.ext}
                    rotation={icon.rotation}
                    translateY={0}
                    size={icon.introBackdrop ? ICON_SIZE - 28 : ICON_SIZE}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
