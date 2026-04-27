'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

const navLinkStyle: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '13px',
  fontWeight: 400,
  color: '#b0b0b0',
  textDecoration: 'none',
  letterSpacing: '0.02em',
}

export default function ExtrasPage() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: jakarta,
        color: '#111',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <motion.nav
        {...fadeUp(0)}
        style={{
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto',
          padding: '28px 40px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          href="/"
          data-cursor-pill="Back"
          style={{
            fontFamily: jakarta,
            fontSize: '13px',
            fontWeight: 400,
            color: '#888',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          ← Back
        </Link>
        <div style={{ display: 'flex', gap: '32px' }}>
          {(
            [
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Work', href: '/#work' },
              { label: 'Extras', href: '/extras' },
            ] as const
          ).map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-cursor-pill={label}
              style={
                label === 'Extras'
                  ? { ...navLinkStyle, color: '#111' }
                  : navLinkStyle
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.nav>

      <div
        style={{
          flex: 1,
          maxWidth: '640px',
          margin: '0 auto',
          padding: '100px 40px 120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.p
          {...fadeUp(0.06)}
          style={{
            fontFamily: jakarta,
            fontSize: '11px',
            fontWeight: 500,
            color: '#999',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}
        >
          Coming soon
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          style={{
            fontFamily: noto,
            fontSize: '40px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 20px',
          }}
        >
          Extras
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          style={{
            fontFamily: jakarta,
            fontSize: '17px',
            fontWeight: 400,
            color: '#666',
            lineHeight: 1.6,
            maxWidth: '420px',
            margin: 0,
          }}
        >
          Side projects, experiments, and other things I want to show will live
          here. Not quite ready — check back later.
        </motion.p>
      </div>
    </div>
  )
}
