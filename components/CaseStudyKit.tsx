'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { caseStudyJakarta, caseStudyRadius } from './caseStudyTheme'

const jakarta = caseStudyJakarta
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

export const kitReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

// ─── Meta cards row (Airla-style Role/Tools/Team/Duration) ────────────────────

export function MetaCards({
  items,
  accent,
}: {
  items: { label: string; value: string }[]
  accent: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '12px',
        margin: '40px 0 0',
      }}
    >
      {items.map(({ label, value }) => (
        <motion.div
          key={label}
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
          }}
          style={{
            background: '#ffffff',
            border: '1px solid #ececec',
            borderRadius: caseStudyRadius,
            padding: '16px 18px',
          }}
        >
          <div style={{ fontFamily: instrument, fontSize: '12px', color: accent, marginBottom: '6px' }}>
            {label}
          </div>
          <div style={{ fontFamily: jakarta, fontSize: '14px', fontWeight: 500, color: '#111', lineHeight: 1.4 }}>
            {value}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Sticky section rail (Queenie/Caleb-style TOC) ────────────────────────────

export function SectionRail({
  sections,
  accent,
}: {
  sections: { id: string; label: string }[]
  accent: string
}) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Sections"
      style={{
        position: 'fixed',
        left: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      className="case-rail"
    >
      <style>{`@media (max-width: 1180px) { .case-rail { display: none !important; } }`}</style>
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: isActive ? accent : '#d0d0d0',
                transition: 'background 0.25s ease',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: jakarta,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? '#111' : '#b0b0b0',
                fontWeight: isActive ? 600 : 400,
                transition: 'color 0.25s ease',
              }}
            >
              {label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}

// ─── Visual panel with caption (Caleb-style gray panel) ──────────────────────

export function VisualPanel({
  children,
  caption,
  padded = true,
}: {
  children: React.ReactNode
  caption?: React.ReactNode
  padded?: boolean
}) {
  return (
    <motion.figure {...kitReveal} style={{ margin: '32px 0 0' }}>
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #ececec',
          borderRadius: caseStudyRadius,
          padding: padded ? 'clamp(20px, 4vw, 40px)' : 0,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
      {caption && (
        <figcaption
          style={{
            fontFamily: jakarta,
            fontSize: '13.5px',
            color: '#888',
            textAlign: 'center',
            marginTop: '14px',
            lineHeight: 1.6,
          }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}

// ─── Numbered takeaway cards (Airla lessons style) ───────────────────────────

export function TakeawayCards({
  title = 'What I took away',
  items,
  accent,
}: {
  title?: string
  items: { title: string; body: string }[]
  accent: string
}) {
  return (
    <div>
      {title ? (
        <motion.h2
          {...kitReveal}
          style={{
            fontFamily: jakarta,
            fontSize: '24px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.01em',
            margin: '0 0 24px',
          }}
        >
          {title}
        </motion.h2>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.06 }}
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              background: '#ffffff',
              border: '1px solid #ececec',
              borderRadius: caseStudyRadius,
              padding: '26px 28px',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `${accent}18`,
                color: accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: instrument,
                fontSize: '19px',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: jakarta, fontSize: '16.5px', fontWeight: 600, color: '#111', marginBottom: '6px' }}>
                {t.title}
              </div>
              <p style={{ fontFamily: jakarta, fontSize: '15px', color: '#555', lineHeight: 1.7, margin: 0 }}>
                {t.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Next project footer (Airla-style) ────────────────────────────────────────

export function NextProjectFooter({
  prev,
  next,
  accent,
}: {
  prev?: { label: string; href: string }
  next: { label: string; href: string; descriptor: string }
  accent: string
}) {
  return (
    <div style={{ marginTop: '96px', borderTop: '1px solid #e4e4e4', paddingTop: '56px' }}>
      <motion.div {...kitReveal} style={{ fontFamily: instrument, fontSize: 'clamp(28px, 4vw, 42px)', color: '#111', marginBottom: '24px' }}>
        Next project
      </motion.div>
      <motion.div {...kitReveal}>
        <Link
          href={next.href}
          data-cursor-pill="Keep reading"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            background: '#ffffff',
            border: '1px solid #ececec',
            borderRadius: caseStudyRadius,
            padding: '28px 32px',
            textDecoration: 'none',
          }}
        >
          <div>
            <div style={{ fontFamily: jakarta, fontSize: '20px', fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>
              {next.label}
            </div>
            <div style={{ fontFamily: jakarta, fontSize: '14px', color: '#888', marginTop: '6px' }}>
              {next.descriptor}
            </div>
          </div>
          <span style={{ color: accent, fontSize: '22px', flexShrink: 0 }}>→</span>
        </Link>
      </motion.div>
      {prev && (
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Link
            href={prev.href}
            style={{ fontFamily: jakarta, fontSize: '14px', color: '#888', textDecoration: 'none' }}
          >
            ← Previous · {prev.label}
          </Link>
        </div>
      )}
    </div>
  )
}
