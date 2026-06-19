'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

export default function ClairPage() {
  return (
    <div
      style={{
        background: '#F4F4F4',
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
          style={{
            fontFamily: jakarta,
            fontSize: '13px',
            color: '#666',
            textDecoration: 'none',
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
                color: '#888',
                textDecoration: 'none',
              }}
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
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          src="/work-cards/clair-logo.png"
          alt="Clair"
          style={{
            maxWidth: '420px',
            width: '60%',
            height: 'auto',
            marginBottom: '48px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: instrument,
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.01em',
                        color: '#666',
            marginBottom: '14px',
          }}
        >
          Case Study · In Progress
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            fontFamily: jakarta,
            fontSize: '18px',
            color: '#444',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          Coming soon.
        </motion.p>
      </main>
    </div>
  )
}
