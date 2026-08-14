'use client'

/*
  v2 landing — text-forward redesign built off the portfolio-research
  patterns: credentials as a plain proof line (official titles, verbs not
  numbers), work as an editorial index instead of cards, no floating
  icons. The only creature on the page is PixelLeo, walking the floor.

  Type: Instrument Serif for display, Instrument Sans for everything else.
  Palette: cream paper + ink, with the three brand colors appearing only
  in the proof line, and one accent per work row on hover.
*/

import Link from 'next/link'
import { motion } from 'framer-motion'

const serif = 'var(--font-instrument-serif), Georgia, serif'
const sans = 'var(--font-instrument), sans-serif'

const INK = '#16130E'
const PAPER = '#FBF8F3'
const MUTED = '#8A8377'
const LINE = 'rgba(22, 19, 14, 0.12)'

const GOOGLE_LETTERS: Array<[string, string]> = [
  ['G', '#4285F4'],
  ['o', '#EA4335'],
  ['o', '#FBBC05'],
  ['g', '#4285F4'],
  ['l', '#34A853'],
  ['e', '#EA4335'],
]

const WORK: Array<{
  n: string
  title: string
  meta: string
  blurb: string
  href: string
  accent: string
  external?: boolean
}> = [
  {
    n: '01',
    title: 'iHeartMedia',
    meta: 'pm intern · summer 2026',
    blurb: "building product inside america's largest audio company.",
    href: '/work/iheart',
    accent: '#C6002B',
  },
  {
    n: '02',
    title: 'Findy',
    meta: 'uci project teams',
    blurb: 'an AI guide that helps seniors use their phones without overwhelm.',
    href: '/work/findy',
    accent: '#2F6BFF',
  },
  {
    n: '03',
    title: 'Clair',
    meta: 'hackdavis · anthropic track winner',
    blurb: "a clinical AI scribe for the messiest part of a doctor's day.",
    href: '/work/clair',
    accent: '#D97757',
  },
  {
    n: '04',
    title: 'Nami',
    meta: 'fullyhacks 2026 · winner',
    blurb: 'an AI college counselor, built in 24 hours.',
    href: 'https://nami.mykm.dev/',
    accent: '#3A6A4F',
    external: true,
  },
  {
    n: '05',
    title: 'CHAGEE',
    meta: 'product marketing intern',
    blurb: 'launch strategy for a premium tea brand entering the US.',
    href: '/work/chagee',
    accent: '#C9A227',
  },
  {
    n: '06',
    title: 'AI @ UCI',
    meta: 'operations lead',
    blurb: 'the club site, redesigned.',
    href: 'https://ai-uci.vercel.app/',
    accent: '#7A4A8A',
    external: true,
  },
]

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function HomeV2() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh', color: INK }}>
      {/* nav */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          padding: '26px 6vw 0',
          fontFamily: sans,
          fontSize: '14px',
        }}
      >
        <Link href="/" style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '20px', color: INK, textDecoration: 'none' }}>
          leo
        </Link>
        <div style={{ display: 'flex', gap: '26px' }}>
          {[
            ['about', '/about'],
            ['work', '#work'],
            ['playground', '/playground'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              style={{ color: MUTED, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = INK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* hero */}
      <motion.header
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
        style={{ padding: '13vh 6vw 9vh', maxWidth: '1100px' }}
      >
        <motion.p
          variants={rise}
          style={{ fontFamily: sans, fontSize: '15px', color: MUTED, margin: '0 0 18px' }}
        >
          i&apos;m
        </motion.p>
        <motion.h1
          variants={rise}
          style={{
            fontFamily: serif,
            fontWeight: 400,
            fontSize: 'clamp(56px, 9.5vw, 118px)',
            lineHeight: 0.98,
            letterSpacing: '-0.015em',
            margin: '0 0 30px',
          }}
        >
          Leo Wu&#8209;Hacohen
        </motion.h1>
        <motion.p
          variants={rise}
          style={{
            fontFamily: sans,
            fontSize: 'clamp(17px, 2vw, 21px)',
            lineHeight: 1.5,
            maxWidth: '560px',
            margin: '0 0 26px',
            color: INK,
          }}
        >
          a PM who asks the right questions to use the right tools to build
          the right things at the right time.
        </motion.p>
        <motion.p
          variants={rise}
          style={{
            fontFamily: sans,
            fontSize: '15.5px',
            fontWeight: 500,
            color: MUTED,
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: '7px',
            rowGap: '4px',
          }}
        >
          <span>ambassador @</span>
          <Link href="/work/google" style={{ textDecoration: 'none', fontWeight: 600 }}>
            {GOOGLE_LETTERS.map(([ch, c], i) => (
              <span key={i} style={{ color: c }}>
                {ch}
              </span>
            ))}
          </Link>
          <span>· prev pm @</span>
          <Link href="/work/iheart" style={{ color: '#C6002B', textDecoration: 'none', fontWeight: 600 }}>
            iHeartMedia
          </Link>
          <span>·</span>
          <Link href="/work/clair" style={{ color: '#D97757', textDecoration: 'none', fontWeight: 600 }}>
            Anthropic
          </Link>
          <span>hackathon winner</span>
        </motion.p>
      </motion.header>

      {/* work index */}
      <section id="work" style={{ padding: '0 6vw 16vh', maxWidth: '1100px' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: sans,
            fontSize: '12.5px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            margin: '0 0 6px',
          }}
        >
          the work
        </motion.p>
        {WORK.map((w, i) => (
          <WorkRow key={w.n} w={w} i={i} />
        ))}
      </section>

      {/* footer */}
      <footer
        style={{
          borderTop: `1px solid ${LINE}`,
          padding: '34px 6vw 110px',
          fontFamily: serif,
          fontStyle: 'italic',
          fontSize: '17px',
          color: MUTED,
          display: 'flex',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <span>why else build, if not for something kind of useless but fun.</span>
        <span style={{ fontFamily: sans, fontStyle: 'normal', fontSize: '13.5px' }}>
          <a href="https://www.linkedin.com/in/leowuhacohen" style={{ color: MUTED }}>
            linkedin
          </a>
          {'  ·  '}
          <a href="mailto:lwuhacoh@uci.edu" style={{ color: MUTED }}>
            email
          </a>
        </span>
      </footer>

    </div>
  )
}

function WorkRow({ w, i }: { w: (typeof WORK)[number]; i: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: i * 0.04, ease: 'easeOut' }}
      whileHover="hover"
      style={{
        display: 'grid',
        gridTemplateColumns: '52px 1fr auto',
        alignItems: 'baseline',
        gap: '18px',
        padding: '26px 0',
        borderTop: `1px solid ${LINE}`,
        cursor: 'pointer',
      }}
    >
      <span style={{ fontFamily: sans, fontSize: '13px', color: MUTED }}>{w.n}</span>
      <span>
        <motion.span
          variants={{ hover: { x: 10, color: w.accent } }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            display: 'inline-block',
            fontFamily: serif,
            fontSize: 'clamp(30px, 4.2vw, 46px)',
            lineHeight: 1.1,
            color: INK,
          }}
        >
          {w.title}
        </motion.span>
        <span
          style={{
            display: 'block',
            fontFamily: sans,
            fontSize: '15px',
            color: MUTED,
            marginTop: '6px',
            maxWidth: '520px',
            lineHeight: 1.45,
          }}
        >
          {w.blurb}
        </span>
      </span>
      <span
        style={{
          fontFamily: sans,
          fontSize: '13px',
          color: MUTED,
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}
      >
        {w.meta}
        <motion.span
          variants={{ hover: { opacity: 1, x: 0 } }}
          initial={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.22 }}
          style={{ display: 'inline-block', marginLeft: '8px', color: w.accent }}
        >
          →
        </motion.span>
      </span>
    </motion.div>
  )

  return w.external ? (
    <a href={w.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      {inner}
    </a>
  ) : (
    <Link href={w.href} style={{ textDecoration: 'none' }}>
      {inner}
    </Link>
  )
}
