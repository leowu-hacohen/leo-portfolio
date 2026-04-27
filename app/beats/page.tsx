'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

export default function BeatsPage() {
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
      {/* Top nav */}
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
              style={{
                fontFamily: jakarta,
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
        </div>
      </motion.nav>

      {/* Hero / Coming Soon block */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 32px 120px',
        }}
      >
        <motion.div
          {...fadeUp(0.05)}
          style={{
            fontFamily: jakarta,
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          Data Analytics Extern · Case Study
        </motion.div>

        <motion.h1
          {...fadeUp(0.1)}
          style={{
            fontFamily: jakarta,
            fontSize: '52px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            margin: 0,
            maxWidth: '720px',
          }}
        >
          Beats by Dre: Coming Soon
        </motion.h1>

        <motion.p
          {...fadeUp(0.15)}
          style={{
            fontFamily: noto,
            fontStyle: 'italic',
            fontSize: '17px',
            color: '#888',
            margin: '18px 0 0',
            lineHeight: 1.55,
            maxWidth: '560px',
          }}
        >
          Surfacing consumer listening patterns to inform product and brand
          strategy. Full case study is being written up, check back shortly.
        </motion.p>

        <motion.div
          {...fadeUp(0.22)}
          style={{
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#999',
            fontFamily: jakarta,
            fontSize: '13px',
            letterSpacing: '0.04em',
          }}
        >
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#111',
              display: 'inline-block',
            }}
          />
          <span>In progress</span>
        </motion.div>

        <motion.div
          {...fadeUp(0.28)}
          style={{
            marginTop: '64px',
            display: 'flex',
            gap: '32px',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            ← Home
          </Link>
          <Link
            href="/work/chagee"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            See Chagee →
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
