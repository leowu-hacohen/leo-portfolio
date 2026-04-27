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
  // Snappy follow so the cursor doesn’t trail the pointer
  const springX = useSpring(x, { damping: 40, stiffness: 600, mass: 0.2 })
  const springY = useSpring(y, { damping: 40, stiffness: 600, mass: 0.2 })

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
          borderRadius: 999,
        }}
        // Tween, not spring: spring on width/padding felt laggy on hover
        transition={{ type: 'tween', duration: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
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
        <AnimatePresence initial={false} mode="sync">
          {isPill && (
            <motion.span
              key={cursor.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05, ease: 'linear' }}
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
