'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CASE_STUDY_LABEL_COLORS,
  caseStudyLabelStyles,
  caseStudyRadius,
} from '../../../components/caseStudyTheme'

const instrument = 'var(--font-instrument), sans-serif'
const instrumentSerif = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

const labelStyles = caseStudyLabelStyles(CASE_STUDY_LABEL_COLORS.designUci)

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

export default function DesignUciComingSoonPage() {
  return (
    <div
      style={{
        background: '#FBF8F3',
        minHeight: '100vh',
        fontFamily: instrument,
        color: '#16130E',
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
            fontFamily: instrument,
            fontSize: '13px',
            fontWeight: 400,
            color: '#8A8377',
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
              { label: 'Playground', href: '/playground' },
            ] as const
          ).map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-cursor-pill={label}
              style={{
                fontFamily: instrument,
                fontSize: '13px',
                fontWeight: 400,
                color: 'rgba(138,131,119,0.75)',
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
            borderRadius: caseStudyRadius,
            background: '#16130E',
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
            ...labelStyles.eyebrow,
            margin: '0 0 16px',
          }}
        >
          Case study
        </motion.p>

        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontFamily: instrumentSerif,
            fontSize: '36px',
            fontWeight: 400,
            color: '#16130E',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
            margin: '0 0 16px',
          }}
        >
          Design @ UCI
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          style={{
            fontFamily: instrument,
            fontSize: '17px',
            fontWeight: 400,
            color: '#4A443B',
            lineHeight: 1.6,
            maxWidth: '420px',
            margin: 0,
          }}
        >
          This case study is on the way. Check back soon.
        </motion.p>

        <motion.div {...fadeUp(0.24)} style={{ marginTop: '32px' }}>
          <Link
            href="/work/clair"
            data-cursor-pill="Next project"
            style={{
              fontFamily: instrument,
              fontSize: '14px',
              fontWeight: 600,
              color: CASE_STUDY_LABEL_COLORS.designUci,
              textDecoration: 'none',
            }}
          >
            Meanwhile, read Clair →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
