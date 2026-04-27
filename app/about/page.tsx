'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/#work' },
  { label: 'Extras', href: '/extras' },
] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

const sectionEyebrow: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  color: '#999',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '20px',
}

const headingStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '28px',
  fontWeight: 600,
  color: '#111',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  margin: '0 0 32px 0',
}

const statRows: { label: string; value: number; max: number }[] = [
  { label: 'Communication', value: 9, max: 10 },
  { label: 'Creativity', value: 9, max: 10 },
  { label: 'Strategic Thinking', value: 9, max: 10 },
  { label: 'Execution', value: 8, max: 10 },
  { label: 'Technical Ability', value: 7, max: 10 },
]

const hobbies: { emoji: string; name: string; level: string }[] = [
  { emoji: '🏃', name: 'Morning runs', level: 'LVL 3' },
  { emoji: '🎧', name: 'DJing', level: 'INTERMEDIATE' },
  { emoji: '🎸', name: 'Guitar', level: 'LVL 2' },
  { emoji: '🏀', name: 'Basketball', level: 'LVL 4' },
  { emoji: '📷', name: 'Concert Photography', level: 'INTERMEDIATE' },
  { emoji: '🎲', name: 'Board Games', level: 'LVL 3' },
  { emoji: '🎾', name: 'Squash', level: 'LVL 1' },
  { emoji: '⭐', name: 'Beli Ratings', level: 'INTERMEDIATE' },
  { emoji: '💻', name: 'Vibe Coding', level: 'LVL 2' },
]

function StatRow({
  label,
  value,
  max,
}: {
  label: string
  value: number
  max: number
}) {
  const pct = (value / max) * 100
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontFamily: jakarta,
            fontSize: '15px',
            fontWeight: 500,
            color: '#111',
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: jakarta,
            fontSize: '13px',
            fontWeight: 400,
            color: '#666',
          }}
        >
          {value}/{max} {/* TODO */}
        </span>
      </div>
      <div
        style={{
          height: '4px',
          background: '#f0f0f0',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: '#111',
            borderRadius: '9999px',
            transition: 'width 0.5s ease-out',
          }}
        />
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: jakarta,
        color: '#111',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 40px 120px',
        }}
      >
        {/* Top nav: same as homepage (About · Work · Extras) */}
        <motion.nav
          {...fadeUp(0)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
            paddingTop: '28px',
            paddingBottom: '64px',
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
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
        </motion.nav>

        {/* Page title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            fontFamily: jakarta,
            fontSize: '44px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 64px 0',
            textAlign: 'center',
          }}
        >
          About
        </motion.h1>

        {/* Section 1: Character sheet */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div style={sectionEyebrow}>Character sheet</div>
          <h2 style={headingStyle}>How I work</h2>
          {/* TODO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '24px',
            }}
          >
            {statRows.map((row) => (
              <div
                key={row.label}
                style={{
                  background: '#fafafa',
                  border: '1px solid #f0f0f0',
                  borderRadius: '12px',
                  padding: '20px 24px',
                }}
              >
                <StatRow label={row.label} value={row.value} max={row.max} />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 2: Leveling up */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginTop: '96px' }}
        >
          <div style={sectionEyebrow}>Leveling up</div>
          <h2 style={headingStyle}>Off the clock</h2>
          {/* TODO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}
          >
            {hobbies.map((h) => (
              <div
                key={h.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '18px 20px',
                  background: '#ffffff',
                  border: '1px solid #e8e8e8',
                  borderRadius: '12px',
                }}
              >
                <span
                  style={{
                    fontSize: '28px',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  role="img"
                  aria-hidden
                >
                  {h.emoji}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: jakarta,
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#111',
                    }}
                  >
                    {h.name}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: jakarta,
                    fontSize: '10px',
                    fontWeight: 600,
                    color: '#666',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {h.level} {/* TODO */}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3: Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ marginTop: '96px', textAlign: 'center' }}
        >
          <div style={sectionEyebrow}>Philosophy</div>
          <p
            style={{
              fontFamily: noto,
              fontSize: '22px',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#666',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            {/* TODO */}
            I don&apos;t move on a problem until I understand the why.
            Everything else follows.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
