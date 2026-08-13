'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { caseStudyRadius } from '../../../components/caseStudyTheme'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrumentSerif = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

export default function IHeartPage() {
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
          style={{ fontFamily: jakarta, fontSize: '13px', color: '#666', textDecoration: 'none' }}
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
              style={{ fontFamily: jakarta, fontSize: '13px', color: '#888', textDecoration: 'none' }}
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          src="/work-cards/iheart-logo.jpeg"
          alt="iHeartMedia"
          style={{
            maxWidth: '360px',
            width: '60%',
            height: 'auto',
            marginBottom: '48px',
            borderRadius: caseStudyRadius,
            boxShadow: '0 30px 80px rgba(200, 16, 46, 0.18)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            fontFamily: instrumentSerif,
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '0.01em',
                        color: '#666',
            marginBottom: '14px',
          }}
        >
          Product Management Intern, Summer 2026
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
          The internship wrapped in July, the case study is on its way.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ marginTop: '40px' }}
        >
          <Link
            href="/work/findy"
            data-cursor-pill="Next project"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              fontWeight: 600,
              color: '#c8102e',
              textDecoration: 'none',
            }}
          >
            Meanwhile, read Findy →
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
