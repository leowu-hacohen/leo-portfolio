'use client'

/**
 * Hero orb from the Lumina app (leowu-hacohen/lumina) — same gradients, blobs, and motion.
 * @see https://github.com/leowu-hacohen/lumina
 */
import { motion } from 'framer-motion'

const BASE = 300

type LuminaOrbProps = {
  /** Display diameter in px (default matches Lumina home hero: 300). */
  size?: number
}

export default function LuminaOrb({ size = 140 }: LuminaOrbProps) {
  const s = size / BASE

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 345 * s,
        minHeight: 360 * s,
      }}
    >
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 345 * s,
          height: 345 * s,
          borderRadius: '50%',
          background:
            'linear-gradient(145deg, #EF8070 0%, #A472D8 45%, #6AA8E2 80%, #BBA8E8 100%)',
          filter: `blur(${40 * s}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -22 * s,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 200 * s,
          height: 36 * s,
          background: 'rgba(140, 100, 190, 0.18)',
          filter: `blur(${20 * s}px)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={{ y: [0, -20 * s, 0], scale: [1, 1.03, 1] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          width: 300 * s,
          height: 300 * s,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          flexShrink: 0,
          zIndex: 1,
          boxShadow: `0 ${16 * s}px ${56 * s}px rgba(155, 115, 215, 0.22)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(145deg, #EDD5C3 0%, #D5BCE8 55%, #BBCFEA 100%)',
          }}
        />
        <motion.div
          animate={{
            x: [0, 90 * s, -70 * s, 50 * s, 0],
            y: [0, -70 * s, 90 * s, -50 * s, 0],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '75%',
            height: '75%',
            top: '-10%',
            left: '-10%',
            background: '#EF8070',
            filter: `blur(${48 * s}px)`,
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{
            x: [0, -80 * s, 60 * s, -40 * s, 0],
            y: [0, 80 * s, -60 * s, 40 * s, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '68%',
            height: '68%',
            top: '-8%',
            right: '-8%',
            background: '#A472D8',
            filter: `blur(${44 * s}px)`,
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{
            x: [0, 70 * s, -90 * s, 40 * s, 0],
            y: [0, 85 * s, -50 * s, -70 * s, 0],
          }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '62%',
            height: '62%',
            bottom: '-8%',
            right: '-8%',
            background: '#6AA8E2',
            filter: `blur(${46 * s}px)`,
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{
            x: [0, -60 * s, 80 * s, -50 * s, 0],
            y: [0, -80 * s, 50 * s, 70 * s, 0],
          }}
          transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '60%',
            height: '60%',
            bottom: '-8%',
            left: '-8%',
            background: '#BBA8E8',
            filter: `blur(${40 * s}px)`,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 34% 27%, rgba(255,255,255,0.38) 0%, transparent 52%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 50%, transparent 42%, rgba(35,15,55,0.16) 100%)',
          }}
        />
      </motion.div>
    </div>
  )
}
