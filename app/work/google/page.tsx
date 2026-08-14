'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { caseStudyRadius } from '../../../components/caseStudyTheme'

const instrument = 'var(--font-instrument), sans-serif'
const instrumentSerif = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

const GOOGLE_BLUE = '#4285F4'

export default function GooglePage() {
  return (
    <div
      style={{
        background: '#FBF8F3',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 7vw',
        }}
      >
        <Link
          href="/"
          data-cursor-pill="Back"
          style={{ fontFamily: instrument, fontSize: '13px', color: '#8A8377', textDecoration: 'none' }}
        >
          ← Back
        </Link>
        <div style={{ display: 'flex', gap: '32px' }}>
          {(
            [
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Work', href: '/#work' },
              { label: 'Playground', href: '/playground' },
            ] as const
          ).map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-cursor-pill={label}
              style={{ fontFamily: instrument, fontSize: '13px', color: '#8A8377', textDecoration: 'none' }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 7vw 80px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '160px',
            height: '160px',
            background: '#ffffff',
            border: '1px solid rgba(22,19,14,0.12)',
            borderRadius: caseStudyRadius,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '48px',
            boxShadow: '0 30px 80px rgba(66, 133, 244, 0.18)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/google-g.svg"
            alt="Google"
            style={{ width: '84px', height: '84px', display: 'block' }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: instrumentSerif,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: '#8A8377',
            marginBottom: '14px',
          }}
        >
          Campus ambassador
</motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            fontFamily: instrument,
            fontSize: '18px',
            color: '#4A443B',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          Coming soon, this one is just getting started.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ marginTop: '40px' }}
        >
          <Link
            href="/work/clair"
            data-cursor-pill="Next project"
            style={{
              fontFamily: instrument,
              fontSize: '14px',
              fontWeight: 600,
              color: GOOGLE_BLUE,
              textDecoration: 'none',
            }}
          >
            Meanwhile, read Clair →
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
