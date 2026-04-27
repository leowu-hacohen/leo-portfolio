import type { CSSProperties } from 'react'

const jakarta = 'var(--font-jakarta), sans-serif'

/** Small caps labels (eyebrow, section tags, meta) */
const caseStudyLabelAccent = '#b42318'

export const caseStudyJakarta = jakarta

/** Eyebrow (e.g. PRODUCT MARKETING · CASE STUDY) */
export const caseStudyEyebrow: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: caseStudyLabelAccent,
  marginBottom: '16px',
}

/** Meta sidebar labels (Role, Timeline, …) — same treatment as eyebrow, tighter spacing */
export const caseStudyMetaLabel: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: caseStudyLabelAccent,
  marginBottom: '4px',
}

/** Main case study page title (H1) */
export const caseStudyTitle: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '44px',
  fontWeight: 700,
  color: '#111',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  margin: 0,
}

/** Subtitle / tagline under the title */
export const caseStudyDescriptor: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '18px',
  fontWeight: 400,
  fontStyle: 'italic',
  color: '#666',
  lineHeight: 1.5,
  margin: '14px 0 0',
  maxWidth: '680px',
}

/** PROBLEM, MY ROLE, Context sidebar labels, etc. */
export const caseStudySectionLabel: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: caseStudyLabelAccent,
  marginBottom: '12px',
}

/** Section H2 (Problem, My Role, …) */
export const caseStudySectionHeading: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '24px',
  fontWeight: 600,
  color: '#111',
  letterSpacing: '-0.01em',
  lineHeight: 1.25,
  margin: '0 0 16px',
}

/** Body paragraphs */
export const caseStudyBody: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '16px',
  fontWeight: 400,
  color: '#444',
  lineHeight: 1.75,
  margin: 0,
  maxWidth: '680px',
}

export const caseStudyBulletList: CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
  maxWidth: '680px',
}

/** Use with caseStudyBody for the text span; leading column is a literal · */
export const caseStudyBulletChar: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '16px',
  fontWeight: 400,
  color: '#444',
  lineHeight: 1.75,
  flexShrink: 0,
  width: '0.6em',
  userSelect: 'none' as const,
}

export const caseStudyContentMaxWidth: CSSProperties = {
  maxWidth: '680px',
  margin: '0 auto',
  width: '100%',
}

export const caseStudySectionBlock: CSSProperties = {
  marginTop: '64px',
}
