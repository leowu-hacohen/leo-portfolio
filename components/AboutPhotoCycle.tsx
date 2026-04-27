'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type AboutPhotoCycleProps = {
  images: readonly string[] | string[]
  /** Fixed height for the relative wrapper (pixels) */
  heightPx: number
  intervalMs?: number
  fadeSec?: number
  /** Passed to `next/image` for responsive srcset */
  sizes?: string
  /**
   * When set, the shown image follows this index (no internal timer).
   * Use for syncing multiple cycles (e.g. two horizontal slots with offset).
   */
  activeIndex?: number
}

export default function AboutPhotoCycle({
  images,
  heightPx,
  intervalMs = 4000,
  fadeSec = 0.8,
  sizes = '33vw',
  activeIndex: activeIndexProp,
}: AboutPhotoCycleProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const n = images.length
  const isControlled = activeIndexProp !== undefined
  const index = isControlled ? activeIndexProp! : internalIndex

  useEffect(() => {
    console.log('[AboutPhotoCycle] image sources:', images)
  }, [images])

  useEffect(() => {
    if (isControlled || n < 2) return
    const t = window.setInterval(() => {
      setInternalIndex((i) => (i + 1) % n)
    }, intervalMs)
    return () => window.clearInterval(t)
  }, [n, intervalMs, isControlled])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${heightPx}px`,
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#f5f5f5',
      }}
    >
      {images.map((src, i) => (
        <motion.div
          key={src}
          initial={false}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: fadeSec, ease: 'easeInOut' as const }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            style={{
              objectFit: 'cover',
              borderRadius: '12px',
            }}
            priority={i === 0}
          />
        </motion.div>
      ))}
    </div>
  )
}
