'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CASE_STUDY_LABEL_COLORS } from '../../../components/caseStudyTheme'

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

export default function DesignUciComingSoonPage() {
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

      <div
        style={{
          flex: 1,
          maxWidth: '640px',
          margin: '0 auto',
          padding: '80px 40px 120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '20px',
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work-cards/design-uci.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          style={{
            fontFamily: jakarta,
            fontSize: '11px',
            fontWeight: 500,
            color: CASE_STUDY_LABEL_COLORS.designUci,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}
        >
          Case study
        </motion.p>

        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontFamily: noto,
            fontSize: '36px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}
        >
          Design @ UCI
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
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
          This case study is on the way. Check back soon.
        </motion.p>
      </div>
    </div>
  )
}
