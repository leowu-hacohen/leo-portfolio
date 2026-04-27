'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState, type CSSProperties } from 'react'
import AboutPhotoCycle from '../../components/AboutPhotoCycle'

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/#work' },
  { label: 'Extras', href: '/extras' },
] as const

/** Exact filenames under public/aboutme/ (case-sensitive on deploy) */
const VERT_IMAGES = [
  '/aboutme/Ver1.JPG',
  '/aboutme/Ver2.jpeg',
  '/aboutme/Ver3.jpeg',
] as const

const HORIZ_IMAGES = [
  '/aboutme/Horz1.JPG',
  '/aboutme/Horz2.jpeg',
  '/aboutme/Horz3.JPG',
] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

/* TODO: confirm dates and titles */
const experience: { company: string; role: string; year: string }[] = [
  { company: '0studio', role: 'Product', year: '2026' },
  { company: 'Beats by Dre', role: 'Data Analytics Extern', year: '2026' },
  { company: 'CHAGEE', role: 'Product Marketing Intern', year: '2024-2025' },
]

const education: {
  school: string
  detail: string
  year: string
  minor: string
  /** Line below; starts with "Relevant coursework: …" */
  relevantCoursework: string
}[] = [
  {
    school: 'UC Irvine',
    detail: 'B.S. Business Information Management',
    year: 'Expected 2027',
    minor: 'Minor in Economics',
    relevantCoursework:
      'Relevant coursework: econometrics, intermediate micro, database & systems, product strategy & GTM, statistics for management',
  },
]

const skills: string[] = [
  'Product & GTM (research, scoping, launch)',
  'Data: SQL, dashboards, A/B readouts',
  'Design: Figma, systems thinking',
  'Writing for execs, users, and docs',
  'Tooling: Cursor, Notion, light automation',
]

/** Right column: two stacked images — middle column portrait height matches this block (ref layout). */
const HORIZ_SLOT_H = 300
const HORIZ_STACK_GAP = 16
const TALL_PORTRAIT_PX = HORIZ_SLOT_H * 2 + HORIZ_STACK_GAP

/** Slower, gentler cross-fades; horizontals use one shared tick so the two never show the same image */
const PHOTO_INTERVAL_MS = 8000
const PHOTO_FADE_SEC = 1.4

const imageCaptionBase = {
  fontFamily: jakarta,
  fontSize: '12px' as const,
  lineHeight: 1.65,
  color: '#9a9a9a',
  marginTop: '14px',
  fontStyle: 'italic' as const,
  maxWidth: '100%',
}

const aboutSideSectionTitle: CSSProperties = {
  fontFamily: jakarta,
  fontSize: '20px',
  fontWeight: 600,
  color: '#111',
  letterSpacing: '-0.02em',
  margin: '0 0 4px 0',
}

function ResumeRow({
  left,
  year,
  isLast = false,
}: {
  left: string
  year: string
  isLast?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '16px',
        padding: '12px 0',
        borderBottom: isLast ? 'none' : '0.5px solid #e8e8e8',
        fontFamily: jakarta,
        fontSize: '15px',
        color: '#111',
        lineHeight: 1.45,
      }}
    >
      <span style={{ fontWeight: 400 }}>{left}</span>
      <span
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: '#666',
          flexShrink: 0,
        }}
      >
        {year}
      </span>
    </div>
  )
}

export default function AboutPage() {
  const nHoriz = HORIZ_IMAGES.length
  const [hIndex, setHIndex] = useState(0)

  useEffect(() => {
    console.log('[About] vertical image paths:', [...VERT_IMAGES])
    console.log('[About] horizontal image paths:', [...HORIZ_IMAGES])
  }, [])

  useEffect(() => {
    if (nHoriz < 2) return
    const t = window.setInterval(
      () => setHIndex((i) => (i + 1) % nHoriz),
      PHOTO_INTERVAL_MS,
    )
    return () => window.clearInterval(t)
  }, [nHoriz])

  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: jakarta,
        color: '#111',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <motion.nav
        {...fadeUp(0)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          padding: '28px 40px 0',
          flexShrink: 0,
        }}
      >
        {navLinks.map(({ label, href }) => (
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
      </motion.nav>

      <div
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          minHeight: 0,
          padding: '0 24px 80px',
        }}
      >
        {/* Three columns: copy | tall portrait | two stacked (Emmi-style grid) */}
        <div
          className="about-page-grid"
          style={{ paddingTop: '8px' }}
        >
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' as const }}
          className="about-side-column"
          style={{
            minWidth: 0,
            boxSizing: 'border-box',
            padding: '60px 8px 60px 0',
            height: '100%',
            alignSelf: 'stretch',
            minHeight: 0,
          }}
        >
          <h1
            style={{
              fontFamily: noto,
              fontSize: '40px',
              fontWeight: 600,
              color: '#111',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: '0 0 24px 0',
            }}
          >
            Hi, I&apos;m Leo.
          </h1>

          <p
            style={{
              fontFamily: jakarta,
              fontSize: '16px',
              fontWeight: 400,
              color: '#4a4a4a',
              lineHeight: 1.75,
              margin: '0 0 22px 0',
            }}
          >
            I&apos;m a third-year Business Information Management student at UC
            Irvine, focused on product management. Over the past two years
            I&apos;ve worked across marketing, data, and product, at a tea brand
            scaling across the US, a data analytics externship at Beats by Dre,
            and a handful of hackathons where I learned to ship fast and figure
            things out under pressure.
          </p>

          <p
            style={{
              fontFamily: jakarta,
              fontSize: '16px',
              fontWeight: 400,
              color: '#4a4a4a',
              lineHeight: 1.75,
              margin: '0 0 22px 0',
            }}
          >
            I&apos;m drawn to the early stages of problems, when things
            aren&apos;t fully defined yet and the most important thing is asking
            the right question. I try to understand people before I try to solve
            anything.
          </p>

          <p
            style={{
              fontFamily: jakarta,
              fontSize: '16px',
              fontWeight: 400,
              color: '#4a4a4a',
              lineHeight: 1.75,
              margin: '0 0 32px 0',
            }}
          >
            Outside of work I&apos;m running toward a half marathon, shooting
            concerts, playing board games too seriously, rating every restaurant
            on Beli, and building things with Claude and Cursor.
          </p>

          <p
            style={{
              fontFamily: jakarta,
              fontSize: '15px',
              fontWeight: 400,
              color: '#4a4a4a',
              margin: '0 0 0 0',
              lineHeight: 1.6,
            }}
          >
            {/* TODO: set real LinkedIn URL */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#111', textDecoration: 'underline' }}
            >
              LinkedIn
            </a>
            <span style={{ color: '#ccc', margin: '0 10px' }}>·</span>
            {/* TODO: confirm email */}
            <a
              href="mailto:leowuhacohen@gmail.com"
              style={{ color: '#111', textDecoration: 'underline' }}
            >
              Email
            </a>
            <span style={{ color: '#ccc', margin: '0 10px' }}>·</span>
            {/* TODO: replace with your real E.164 number in href */}
            <a
              href="tel:+15555550100"
              style={{ color: '#111', textDecoration: 'underline' }}
            >
              Phone
            </a>
          </p>

          <div style={{ marginTop: '40px', marginBottom: '0' }}>
            <h2 style={aboutSideSectionTitle}>Experience</h2>
            <div>
              {experience.map((row, i) => (
                <ResumeRow
                  key={`${row.company}-${row.role}`}
                  left={`${row.company} / ${row.role}`}
                  year={row.year}
                  isLast={i === experience.length - 1}
                />
              ))}
            </div>
          </div>

        </motion.aside>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' as const, delay: 0.06 }}
          className="about-side-column"
          style={{
            minWidth: 0,
            boxSizing: 'border-box',
            padding: '60px 4px 60px 4px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
            height: '100%',
            alignSelf: 'stretch',
          }}
        >
          <AboutPhotoCycle
            images={VERT_IMAGES}
            heightPx={TALL_PORTRAIT_PX}
            intervalMs={PHOTO_INTERVAL_MS}
            fadeSec={PHOTO_FADE_SEC}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
          <p style={imageCaptionBase}>
            Vertical slice of life. Shuffles on a timer so one particular hair day
            can&apos;t monopolize the page.
          </p>
          <div style={{ width: '100%', marginTop: 'auto', paddingTop: '28px' }}>
            <h2 style={aboutSideSectionTitle}>Education</h2>
            <div>
              {education.map((row) => (
                <div key={`${row.school}-${row.detail}`}>
                  <ResumeRow
                    left={`${row.school} / ${row.detail}`}
                    year={row.year}
                    isLast
                  />
                  <p
                    style={{
                      fontFamily: jakarta,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#4a4a4a',
                      lineHeight: 1.55,
                      margin: '0 0 6px 0',
                      paddingTop: '4px',
                    }}
                  >
                    {row.minor}
                  </p>
                  <p
                    style={{
                      fontFamily: jakarta,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#4a4a4a',
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {row.relevantCoursework}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' as const, delay: 0.12 }}
          className="about-side-column"
          style={{
            minWidth: 0,
            boxSizing: 'border-box',
            padding: '60px 0 60px 4px',
            display: 'flex',
            flexDirection: 'column',
            gap: `${HORIZ_STACK_GAP}px`,
            width: '100%',
            minHeight: 0,
            height: '100%',
            alignSelf: 'stretch',
            alignItems: 'stretch',
          }}
        >
          <AboutPhotoCycle
            images={HORIZ_IMAGES}
            heightPx={HORIZ_SLOT_H}
            activeIndex={hIndex}
            fadeSec={PHOTO_FADE_SEC}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
          <AboutPhotoCycle
            images={HORIZ_IMAGES}
            heightPx={HORIZ_SLOT_H}
            activeIndex={(hIndex + 1) % nHoriz}
            fadeSec={PHOTO_FADE_SEC}
            sizes="(max-width: 900px) 100vw, 33vw"
          />
          <p style={imageCaptionBase}>
            Widescreen evidence. Cycles in sync-ish pairs because singling out one
            frame would be rude to the other two. Not to scale. No refunds. If
            they load slow, the pixels are just shy.
          </p>
          <div style={{ width: '100%', marginTop: 'auto', paddingTop: '28px' }}>
            <h2 style={aboutSideSectionTitle}>Skills</h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontFamily: jakarta,
                fontSize: '15px',
                color: '#111',
                lineHeight: 1.5,
              }}
            >
              {skills.map((skill, i) => (
                <li
                  key={skill}
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    borderBottom:
                      i < skills.length - 1 ? '0.5px solid #e8e8e8' : 'none',
                  }}
                >
                  <span
                    style={{
                      color: '#b0b0b0',
                      flexShrink: 0,
                      lineHeight: 1.45,
                    }}
                    aria-hidden
                  >
                    ·
                  </span>
                  <span style={{ lineHeight: 1.45 }}>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
        </div>
      </div>
    </div>
  )
}
