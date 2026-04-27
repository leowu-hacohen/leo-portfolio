'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'

interface CursorState {
  variant: 'default' | 'pill'
  text: string
}

export default function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 28, stiffness: 380, mass: 0.35 })
  const springY = useSpring(y, { damping: 28, stiffness: 380, mass: 0.35 })

  const [cursor, setCursor] = useState<CursorState>({
    variant: 'default',
    text: '',
  })
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }

    const evaluateTarget = (target: EventTarget | null) => {
      const el = (target as HTMLElement | null)?.closest?.(
        '[data-cursor-pill]',
      ) as HTMLElement | null
      if (el) {
        setCursor({ variant: 'pill', text: el.dataset.cursorPill ?? '' })
      } else {
        setCursor({ variant: 'default', text: '' })
      }
    }

    const onOver = (e: MouseEvent) => evaluateTarget(e.target)
    const onOut = (e: MouseEvent) => evaluateTarget(e.relatedTarget)
    const onLeaveDoc = () => setVisible(false)
    const onEnterDoc = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.documentElement.addEventListener('mouseleave', onLeaveDoc)
    document.documentElement.addEventListener('mouseenter', onEnterDoc)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
      document.documentElement.removeEventListener('mouseenter', onEnterDoc)
    }
  }, [x, y])

  if (!enabled) return null

  const isPill = cursor.variant === 'pill'

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 120ms ease',
      }}
    >
      <motion.div
        animate={{
          width: isPill ? 'auto' : 16,
          height: isPill ? 36 : 16,
          paddingLeft: isPill ? 18 : 0,
          paddingRight: isPill ? 18 : 0,
          background: '#111111',
          borderRadius: isPill ? 999 : 999,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          mixBlendMode: 'normal',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isPill && (
            <motion.span
              key={cursor.text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                fontFamily: jakarta,
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.01em',
              }}
            >
              {cursor.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
