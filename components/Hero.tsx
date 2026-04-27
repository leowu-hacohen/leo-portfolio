'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ObjectIcon from './ObjectIcon'

const icons = [
  { name: 'submarine',  rotation: -15, translateY: -12 },
  { name: 'headphones', rotation:  12, translateY:  10 },
  { name: 'teacup',     rotation: -10, translateY:   6 },
  { name: 'microphone', rotation:   8, translateY: -14 },
  { name: 'burger',     rotation: -12, translateY:  12 },
  { name: 'briefcase',  rotation:  10, translateY:  -8 },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const displayStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jakarta), sans-serif',
  fontSize: '60px',
  fontWeight: 700,
  color: '#111111',
  lineHeight: 1,
  letterSpacing: '-0.03em',
}

export default function Hero() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Nav animates in as one unit */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          paddingTop: '28px',
        }}
      >
        {(['About', 'Work', 'Resume'] as const).map((label) => (
          <Link
            key={label}
            href={`/${label.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              color: '#b0b0b0',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            {label}
          </Link>
        ))}
      </motion.nav>

      {/* Hero — stagger container */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '120px',
          overflow: 'visible',
        }}
      >
        {/* Line 1: product [submarine] manager [headphones] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflow: 'visible',
          }}
        >
          <motion.span variants={item} style={displayStyle}>product</motion.span>
          <motion.span variants={item} style={{ display: 'inline-block', flexShrink: 0 }}>
            <ObjectIcon {...icons[0]} />
          </motion.span>
          <motion.span variants={item} style={displayStyle}>manager</motion.span>
          <motion.span variants={item} style={{ display: 'inline-block', flexShrink: 0 }}>
            <ObjectIcon {...icons[1]} />
          </motion.span>
        </div>

        {/* Line 2: [teacup] [microphone] who ships with taste. [burger] [briefcase] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '14px',
            overflow: 'visible',
          }}
        >
          <motion.span variants={item} style={{ display: 'inline-block', flexShrink: 0 }}>
            <ObjectIcon {...icons[2]} />
          </motion.span>
          <motion.span variants={item} style={{ display: 'inline-block', flexShrink: 0 }}>
            <ObjectIcon {...icons[3]} />
          </motion.span>
          <motion.span variants={item} style={displayStyle}>who ships with taste.</motion.span>
          <motion.span variants={item} style={{ display: 'inline-block', flexShrink: 0 }}>
            <ObjectIcon {...icons[4]} />
          </motion.span>
          <motion.span variants={item} style={{ display: 'inline-block', flexShrink: 0 }}>
            <ObjectIcon {...icons[5]} />
          </motion.span>
        </div>
      </motion.div>
    </div>
  )
}
