import type { CSSProperties } from 'react'

const jakarta = 'var(--font-jakarta), sans-serif'

/** Per-project accent for small-caps labels (eyebrow, PROBLEM, Role, etc.) */
export const CASE_STUDY_LABEL_COLORS = {
  chagee: '#a82620',
  bcec: '#2a4a7a',
  inNOut: '#c40000',
  nami: '#0d5a9a',
  designUci: '#2563eb',
} as const

export type CaseStudyLabelKey = keyof typeof CASE_STUDY_LABEL_COLORS

export const caseStudyJakarta = jakarta

const DEFAULT_LABEL = '#6b6b6b'

/** Eyebrow (e.g. PRODUCT MARKETING · CASE STUDY) — prefer `caseStudyLabelStyles(accent).eyebrow` */
export const caseStudyEyebrow: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: DEFAULT_LABEL,
  marginBottom: '16px',
}

/** Meta sidebar labels (Role, Timeline, …) */
export const caseStudyMetaLabel: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: DEFAULT_LABEL,
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
  color: DEFAULT_LABEL,
  marginBottom: '12px',
}

/** Set label accent color (hex) for eyebrow, meta, and section small-caps. */
export function caseStudyLabelStyles(accent: string) {
  return {
    eyebrow: { ...caseStudyEyebrow, color: accent } as CSSProperties,
    metaLabel: { ...caseStudyMetaLabel, color: accent } as CSSProperties,
    sectionLabel: { ...caseStudySectionLabel, color: accent } as CSSProperties,
  }
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
