'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CASE_STUDY_LABEL_COLORS,
  caseStudyBody,
  caseStudyBulletChar,
  caseStudyBulletList,
  caseStudyDescriptor,
  caseStudyJakarta,
  caseStudyLabelStyles,
  caseStudySectionHeading,
  caseStudyTitle,
} from './caseStudyTheme'

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
  /** Full-bleed background image for the area below the hero (e.g. Nami canvas) */
  canvasBackdropSrc?: string
  /** Small-caps label color (Role, PROBLEM, …). Defaults to Nami blue. */
  labelAccent?: string
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const jakarta = caseStudyJakarta

const metaValue: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '14px',
  color: '#111',
  fontWeight: 400,
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
  canvasBackdropSrc,
  labelAccent = CASE_STUDY_LABEL_COLORS.nami,
}: CaseStudyProps) {
  const L = caseStudyLabelStyles(labelAccent)
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
      {/* Top: nav + hero only (full-width band stays clean) */}
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 40px 0',
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
      </div>

      {/* Below hero: optional full-bleed backdrop, then same-width content column */}
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        {canvasBackdropSrc ? (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              minHeight: '100%',
              zIndex: 0,
              backgroundColor: '#050a14',
              backgroundImage: `url(${canvasBackdropSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundAttachment: 'scroll',
            }}
          />
        ) : null}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
        <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '0 40px 120px',
              backgroundColor: canvasBackdropSrc
                ? 'rgba(255, 255, 255, 0.94)'
                : 'transparent',
              borderRadius: canvasBackdropSrc ? '12px' : undefined,
            }}
        >
        {/* 3. METADATA ROW ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: '64px',
            marginTop: '64px',
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
                <div style={L.metaLabel}>{label}</div>
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
            <motion.h1 variants={rightItem} style={caseStudyTitle}>
              {company}
            </motion.h1>

            <motion.p
              variants={rightItem}
              style={{
                ...caseStudyDescriptor,
                marginTop: '10px',
                marginBottom: '20px',
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
            margin: '64px 0',
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
            <div style={L.sectionLabel}>Context</div>
            <p style={{ ...caseStudyBody, margin: '0 auto' }}>{context}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            style={cardStyle}
          >
            <div style={L.sectionLabel}>My Contributions</div>
            <ul style={caseStudyBulletList}>
              {contributions.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                    marginBottom: i < contributions.length - 1 ? '10px' : 0,
                  }}
                >
                  <span style={caseStudyBulletChar}>·</span>
                  <span style={caseStudyBody}>{item}</span>
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
            style={{ marginTop: '64px' }}
          >
            <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto' }}>
              <div style={L.sectionLabel}>{section.label}</div>
              <h2 style={caseStudySectionHeading}>{section.heading}</h2>
              <p style={caseStudyBody}>{section.body}</p>
            </div>
            {section.hasImage && (
              <div
                style={{
                  marginTop: '32px',
                  width: '100%',
                  maxWidth: '680px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
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
              marginTop: '64px',
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
      </div>
    </div>
  )
}
