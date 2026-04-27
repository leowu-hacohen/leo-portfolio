'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export interface CaseStudySection {
  label: string
  heading: string
  body: string
  hasImage?: boolean
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudyProps {
  role: string
  timeline: string
  type: string
  tools: string
  company: string
  descriptor: string
  tags: string[]
  context: string
  contributions: string[]
  metrics: CaseStudyMetric[]
  sections: CaseStudySection[]
  prevHref?: string
  nextHref?: string
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const metaLabel: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  color: '#999',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '4px',
}

const metaValue: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '14px',
  color: '#111',
  fontWeight: 400,
}

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  color: '#999',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '12px',
}

const cardStyle: React.CSSProperties = {
  background: '#fafafa',
  borderRadius: '12px',
  padding: '28px',
  flex: 1,
}

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

const metaContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const metaItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const rightContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const rightItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const metricsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const metricCard = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CaseStudy({
  role,
  timeline,
  type,
  tools,
  company,
  descriptor,
  tags,
  context,
  contributions,
  metrics,
  sections,
  prevHref,
  nextHref,
}: CaseStudyProps) {
  const metaFields = [
    { label: 'Role', value: role },
    { label: 'Timeline', value: timeline },
    { label: 'Type', value: type },
    { label: 'Tools', value: tools },
  ]

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
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 40px 120px',
        }}
      >
        {/* 1. NAV ─────────────────────────────────────────────────────────── */}
        <motion.nav
          {...fadeUp(0)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '28px',
            paddingBottom: '48px',
          }}
        >
          <Link
            href="/"
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
                { label: 'About',  href: '/about' },
                { label: 'Work',   href: '/#work' },
                { label: 'Extras', href: '/extras' },
              ] as const
            ).map(({ label, href }) => (
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
          </div>
        </motion.nav>

        {/* 2. HERO BLOCK ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: '480px',
            background: '#f5f5f5',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: jakarta,
              fontSize: '13px',
              color: '#ccc',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Cover Image
          </span>
        </motion.div>

        {/* 3. METADATA ROW ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: '64px',
            marginTop: '48px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left sidebar */}
          <motion.div
            variants={metaContainer}
            initial="hidden"
            animate="show"
            style={{
              width: '220px',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {metaFields.map(({ label, value }) => (
              <motion.div key={label} variants={metaItem}>
                <div style={metaLabel}>{label}</div>
                <div style={metaValue}>{value}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right content */}
          <motion.div
            variants={rightContainer}
            initial="hidden"
            animate="show"
            style={{ flex: 1 }}
          >
            <motion.h1
              variants={rightItem}
              style={{
                fontFamily: jakarta,
                fontSize: '42px',
                fontWeight: 600,
                color: '#111',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {company}
            </motion.h1>

            <motion.p
              variants={rightItem}
              style={{
                fontFamily: noto,
                fontStyle: 'italic',
                fontSize: '16px',
                color: '#888',
                marginTop: '10px',
                marginBottom: '20px',
                lineHeight: 1.5,
              }}
            >
              {descriptor}
            </motion.p>

            <motion.div
              variants={rightItem}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: jakarta,
                    fontSize: '13px',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: '999px',
                    padding: '4px 12px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* 4. DIVIDER ──────────────────────────────────────────────────────── */}
        <div
          style={{
            height: '1px',
            background: '#f0f0f0',
            margin: '48px 0',
          }}
        />

        {/* 5. CONTEXT + CONTRIBUTIONS ──────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            style={cardStyle}
          >
            <div style={sectionLabelStyle}>Context</div>
            <p
              style={{
                fontFamily: jakarta,
                fontSize: '15px',
                color: '#444',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {context}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            style={cardStyle}
          >
            <div style={sectionLabelStyle}>My Contributions</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {contributions.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start',
                    marginBottom: i < contributions.length - 1 ? '10px' : 0,
                  }}
                >
                  <span
                    style={{
                      marginTop: '7px',
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#111',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: jakarta,
                      fontSize: '14px',
                      color: '#333',
                      lineHeight: 1.7,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 6. CONTENT SECTIONS ─────────────────────────────────────────────── */}
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ marginTop: '72px' }}
          >
            <div style={sectionLabelStyle}>{section.label}</div>
            <h2
              style={{
                fontFamily: jakarta,
                fontSize: '24px',
                fontWeight: 600,
                color: '#111',
                letterSpacing: '-0.01em',
                margin: '0 0 16px',
              }}
            >
              {section.heading}
            </h2>
            <p
              style={{
                fontFamily: jakarta,
                fontSize: '15px',
                color: '#555',
                lineHeight: 1.8,
                margin: 0,
                maxWidth: '680px',
              }}
            >
              {section.body}
            </p>
            {section.hasImage && (
              <div
                style={{
                  marginTop: '32px',
                  width: '100%',
                  height: '400px',
                  background: '#f5f5f5',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: jakarta,
                    fontSize: '12px',
                    color: '#ccc',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Image Placeholder
                </span>
              </div>
            )}
          </motion.div>
        ))}

        {/* 7. RESULTS ROW ──────────────────────────────────────────────────── */}
        {metrics.length > 0 && (
          <motion.div
            variants={metricsContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '72px',
            }}
          >
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={metricCard}
                style={{
                  ...cardStyle,
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#111',
                    lineHeight: 1,
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '13px',
                    color: '#888',
                    marginTop: '6px',
                  }}
                >
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 8. FOOTER NAV ───────────────────────────────────────────────────── */}
        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '48px',
            marginTop: '80px',
            display: 'flex',
            justifyContent: 'center',
            gap: '64px',
          }}
        >
          {prevHref ? (
            <Link
              href={prevHref}
              style={{
                fontFamily: jakarta,
                fontSize: '14px',
                color: '#888',
                textDecoration: 'none',
              }}
            >
              ← Previous
            </Link>
          ) : (
            <span style={{ fontFamily: jakarta, fontSize: '14px', color: '#ddd' }}>
              ← Previous
            </span>
          )}
          {nextHref ? (
            <Link
              href={nextHref}
              style={{
                fontFamily: jakarta,
                fontSize: '14px',
                color: '#888',
                textDecoration: 'none',
              }}
            >
              Next →
            </Link>
          ) : (
            <span style={{ fontFamily: jakarta, fontSize: '14px', color: '#ddd' }}>
              Next →
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
