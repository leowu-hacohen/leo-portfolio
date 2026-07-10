'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ClairOrbit3D from '../../../components/ClairOrbit3D'
import { caseStudyRadius } from '../../../components/caseStudyTheme'
import { NextProjectFooter, SectionRail } from '../../../components/CaseStudyKit'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

const ACCENT = '#5B7CFA'
const INK = '#0a0a0a'

// ─── Shared bits ──────────────────────────────────────────────────────────────

const eyebrowStyle: React.CSSProperties = {
  fontFamily: instrument,
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.01em',
  color: ACCENT,
  marginBottom: '20px',
}

const h2Style: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: 'clamp(30px, 4.4vw, 52px)',
  fontWeight: 600,
  color: INK,
  letterSpacing: '-0.02em',
  lineHeight: 1.08,
  margin: 0,
}

const bodyStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '17px',
  color: '#444',
  lineHeight: 1.75,
}

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...reveal} style={eyebrowStyle}>
      {children}
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -70])
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#F4F4F4',
      }}
    >
      <motion.div style={{ position: 'absolute', inset: 0, y: yCanvas }}>
        <ClairOrbit3D />
      </motion.div>

      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 7vw 10vh',
          y: yText,
          opacity,
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
          style={{
            fontFamily: instrument,
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.01em',
            color: '#666',
            marginBottom: '24px',
          }}
        >
          Clair, HackDavis 2026,{' '}
          <span style={{ color: ACCENT }}>
            Winner: Anthropic&apos;s &ldquo;Best Use of AI/ML&rdquo;
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            fontFamily: jakarta,
            fontSize: 'clamp(42px, 6.6vw, 92px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            margin: 0,
            maxWidth: '1100px',
            color: INK,
          }}
        >
          Every doctor walks in already knowing the patient&apos;s story.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.75 }}
          style={{
            fontFamily: jakarta,
            fontSize: '16px',
            color: '#444',
            lineHeight: 1.7,
            marginTop: '28px',
            maxWidth: '620px',
          }}
        >
          A clinical AI scribe that turns the messiest part of a doctor&apos;s day, the handoff, into a clean, structured, always-current record. Built in 24
          hours. Team of 3.
        </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: jakarta,
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#aaa',
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  )
}

// ─── Meta strip ───────────────────────────────────────────────────────────────

const META = [
  { label: 'Role', value: 'Product & Full-Stack' },
  { label: 'Timeline', value: '24 hours, May 2026' },
  { label: 'Team', value: '3 builders' },
  { label: 'Tools', value: 'Claude, Deepgram, Next.js, Flask, Supabase' },
  { label: 'Result', value: 'Anthropic Track Winner' },
] as const

function MetaStrip() {
  return (
    <section
      style={{
        borderTop: '1px solid #e8e8e8',
        borderBottom: '1px solid #e8e8e8',
        background: '#fafafa',
        padding: '0 7vw',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '36px 0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px 64px',
        }}
      >
        {META.map(({ label, value }) => (
          <motion.div
            key={label}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
          >
            <div style={{ fontFamily: instrument, fontSize: '12px', color: ACCENT, marginBottom: '6px' }}>
              {label}
            </div>
            <div style={{ fontFamily: jakarta, fontSize: '14px', color: INK, fontWeight: 500 }}>
              {value}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── Problem vignettes ────────────────────────────────────────────────────────

const PROBLEM_CARDS = [
  {
    stat: '4×',
    text: 'A man recovering from a fall retells the story of how it happened to four different providers in two days, reliving it every time.',
  },
  {
    stat: '1 note',
    text: 'A diabetic patient is prescribed an NSAID for back pain because the on-call doctor never saw the kidney note buried in yesterday’s chart.',
  },
  {
    stat: '0 records',
    text: 'A grandmother’s goal, “I just want to walk my dog again”, lives in one doctor’s memory. The next provider never hears it, and her plan drifts.',
  },
] as const

// ─── Feature vignettes (recreated UI) ────────────────────────────────────────

function VignetteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: '24px',
        background: '#ffffff',
        border: '1px solid #ececec',
        borderRadius: caseStudyRadius,
        padding: '18px',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

function TranscriptVignette() {
  const lines = [
    { speaker: 'Doctor', text: 'Any changes in the hip pain since Tuesday?', final: true },
    { speaker: 'Patient', text: 'Better in the mornings, but it still catches when I stand up.', final: true },
    { speaker: 'Doctor', text: 'okay let’s hold the current dose and…', final: false },
  ]
  return (
    <VignetteFrame>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <motion.span
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#e5484d', display: 'inline-block' }}
        />
        <span style={{ fontFamily: jakarta, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>
          Recording: nova-3-medical, diarized
        </span>
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.25 } } }}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {lines.map((l, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 8 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
            style={{
              alignSelf: l.speaker === 'Doctor' ? 'flex-start' : 'flex-end',
              background: l.final ? (l.speaker === 'Doctor' ? '#EEF2FF' : '#f4f4f4') : 'transparent',
              color: l.final ? '#333' : '#aaa',
              fontStyle: l.final ? 'normal' : 'italic',
              fontFamily: jakarta,
              fontSize: '13px',
              lineHeight: 1.55,
              padding: l.final ? '8px 12px' : '2px 12px',
              borderRadius: '10px',
              maxWidth: '85%',
            }}
          >
            {l.final && (
              <span style={{ fontWeight: 600, color: l.speaker === 'Doctor' ? ACCENT : '#777', marginRight: 6 }}>
                {l.speaker}
              </span>
            )}
            {l.text}
          </motion.div>
        ))}
      </motion.div>
    </VignetteFrame>
  )
}

function DiffVignette() {
  return (
    <VignetteFrame>
      <div style={{ fontFamily: instrument, fontSize: '11px', letterSpacing: '0.02em', color: ACCENT, marginBottom: '10px' }}>
        WHAT&apos;S CHANGED SINCE YOU LAST SAW THIS PATIENT
      </div>
      <p style={{ fontFamily: jakarta, fontSize: '13.5px', color: '#333', lineHeight: 1.65, margin: 0 }}>
        Since your visit on May 20, Dr.&nbsp;One documented improving orthostatic
        hypotension and adjusted acetaminophen to PRN.{' '}
        <span style={{ background: '#EEF2FF', padding: '1px 4px', borderRadius: '3px' }}>
          New lab flag: A1C 7.8&nbsp;↑
        </span>{' '}
       , a metformin discussion is queued in the plan. Mobility goal unchanged:
        walking unassisted by discharge.
      </p>
    </VignetteFrame>
  )
}

function BentoVignette() {
  const tiles = [
    { label: 'Synopsis', w: '100%' },
    { label: 'Subjective', w: '48%' },
    { label: 'Objective: vitals + labs', w: '48%' },
    { label: 'Assessment', w: '48%' },
    { label: 'Plan', w: '48%' },
  ]
  return (
    <VignetteFrame>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
      >
        {tiles.map((t) => (
          <motion.div
            key={t.label}
            variants={{
              hidden: { opacity: 0, scale: 0.96 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            }}
            style={{
              width: t.w,
              flexGrow: 1,
              background: '#fafafa',
              border: '1px solid #efefef',
              borderRadius: '6px',
              padding: '10px 12px',
            }}
          >
            <div style={{ fontFamily: jakarta, fontSize: '11px', fontWeight: 600, color: '#555', marginBottom: '6px' }}>
              {t.label}
            </div>
            <div style={{ height: 5, width: '82%', background: '#ececec', borderRadius: 3, marginBottom: 4 }} />
            <div style={{ height: 5, width: '58%', background: '#f1f1f1', borderRadius: 3 }} />
          </motion.div>
        ))}
      </motion.div>
    </VignetteFrame>
  )
}

function PlanChipsVignette() {
  const chips = [
    { label: 'URGENT', bg: '#FDECEC', color: '#C92A2A' },
    { label: 'Follow-up', bg: '#FFF4E0', color: '#B7791F' },
    { label: 'Tests / Labs', bg: '#EEF2FF', color: '#4C6EF5' },
    { label: 'Medication', bg: '#F3EBFF', color: '#7048E8' },
    { label: 'Monitoring', bg: '#E3FAFC', color: '#0B7285' },
    { label: 'Lifestyle', bg: '#EBFBEE', color: '#2B8A3E' },
  ]
  return (
    <VignetteFrame>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
      >
        {chips.map((c) => (
          <motion.span
            key={c.label}
            variants={{
              hidden: { opacity: 0, y: 6 },
              show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
            style={{
              fontFamily: jakarta,
              fontSize: '12px',
              fontWeight: 600,
              background: c.bg,
              color: c.color,
              padding: '6px 12px',
              borderRadius: '999px',
            }}
          >
            {c.label}
          </motion.span>
        ))}
      </motion.div>
    </VignetteFrame>
  )
}

function ChatVignette() {
  return (
    <VignetteFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            alignSelf: 'flex-end',
            fontFamily: jakarta,
            fontSize: '13px',
            background: INK,
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '10px',
            maxWidth: '85%',
          }}
        >
          Any pending consults before discharge?
        </div>
        <div
          style={{
            alignSelf: 'flex-start',
            fontFamily: jakarta,
            fontSize: '13px',
            background: '#f4f4f4',
            color: '#333',
            padding: '8px 12px',
            borderRadius: '10px',
            maxWidth: '90%',
            lineHeight: 1.55,
          }}
        >
          PT evaluation scheduled; nephrology consult still pending from the May 20
          visit, flagged in Plan as Tests/Labs.
        </div>
      </div>
    </VignetteFrame>
  )
}

function LedgerVignette() {
  const rows = [
    { who: 'Dr. One', what: 'edited Current Medications', when: '14:32' },
    { who: 'Clair', what: 'updated state from Visit #6 transcript', when: '14:05' },
    { who: 'Dr. Two', what: 'edited Long-term Goals', when: 'Yesterday' },
  ]
  return (
    <VignetteFrame>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '8px 0',
              borderBottom: i < rows.length - 1 ? '1px solid #f1f1f1' : 'none',
              fontFamily: jakarta,
              fontSize: '12.5px',
              color: '#555',
            }}
          >
            <span>
              <span style={{ fontWeight: 600, color: INK }}>{r.who}</span> {r.what}
            </span>
            <span style={{ color: '#aaa', flexShrink: 0 }}>{r.when}</span>
          </div>
        ))}
      </div>
    </VignetteFrame>
  )
}

const FEATURES = [
  {
    n: '01',
    title: 'Transcription that stays out of the way',
    body: 'Every visit is recorded and transcribed live with speaker diarization (Deepgram nova-3-medical), so Clair sits inside the existing exam-room workflow instead of interrupting it. Spacebar pauses. Done finalizes.',
    vignette: <TranscriptVignette />,
  },
  {
    n: '02',
    title: 'Change snapshots, per doctor',
    body: 'Each doctor carries their own snapshot of what they last knew. When they return, Clair writes a 2–4 sentence narrative of exactly what changed since their last visit, the handoff, automated.',
    vignette: <DiffVignette />,
  },
  {
    n: '03',
    title: 'A SOAP record you can scan in seconds',
    body: 'A bento patient page surfaces the whole picture at a glance: Subjective, Objective (live-updating vitals and labs), Assessment, and Plan, the hierarchy a physician told us doctors actually scan at shift change.',
    vignette: <BentoVignette />,
  },
  {
    n: '04',
    title: 'A plan that carries context forward',
    body: 'Color-coded plan items capture what to cover next visit and track interventions toward long-term goals, so “she wants to walk her dog again” survives every provider change.',
    vignette: <PlanChipsVignette />,
  },
  {
    n: '05',
    title: 'Ask the record anything',
    body: 'A per-patient chatbot grounded in every prior visit state and uploaded document, history, family context, pending tests, answers clarifying questions without a chart dig.',
    vignette: <ChatVignette />,
  },
  {
    n: '06',
    title: 'Clinicians stay in control',
    body: 'Every field is manually editable, with an append-only audit ledger of who changed what and when. The LLM proposes; the doctor owns the record.',
    vignette: <LedgerVignette />,
  },
] as const

// ─── Architecture ─────────────────────────────────────────────────────────────

const ARCH_NODES = [
  { title: 'Browser', sub: 'MediaRecorder, webm/opus' },
  { title: 'Deepgram', sub: 'nova-3-medical, diarized WS' },
  { title: 'Flask', sub: 'REST, retry wrapper' },
  { title: 'Claude', sub: 'sonnet-4-6, tool use' },
  { title: 'Supabase', sub: 'Postgres, 9 tables' },
] as const

// ─── Takeaways ────────────────────────────────────────────────────────────────

const TAKEAWAYS = [
  {
    n: '01',
    title: 'Talk to the domain expert before you build.',
    body: 'A consultation with a Harvard physician reframed the entire project, from “transcribe visits” to “build the clearing house handoffs never had.” It produced the SOAP bento, the one-line synopsis, the long-term-goals field, and the confidence to cut allergies from v1. Field choice mattered as much as the LLM.',
  },
  {
    n: '02',
    title: 'Schema-enforced tool use beats free-form JSON.',
    body: 'One Claude tool-use call with a strict input_schema extracts the full SOAP state, carrying unchanged fields forward and refusing to invent clinical facts. It was dramatically more reliable than asking for JSON and hoping.',
  },
  {
    n: '03',
    title: 'Real-time transcription is a UX gift that leaks complexity.',
    body: 'Live diarized speech feels magical, but interim-vs-final results, speaker numbering, and MediaRecorder edge cases all have to be designed around. We shipped a tap-to-swap speaker fix instead of chasing voice biometrics.',
  },
  {
    n: '04',
    title: 'Scoping is a skill. Cut early, cut often.',
    body: 'Voice enrollment, per-field diff cards, real time-series vitals, every feature we cut bought time for the loop that won: conversation in, structured record out, handoff narrative on return.',
  },
] as const

// ─── Metrics ──────────────────────────────────────────────────────────────────

const METRICS = [
  { value: '1st', label: 'Anthropic “Best Use of AI/ML”, HackDavis 2026' },
  { value: '24h', label: 'From empty repo to working end-to-end demo' },
  { value: '9', label: 'Postgres tables behind the source of truth' },
  { value: '2', label: 'LLM calls per visit: extract, then narrate' },
  { value: '100%', label: 'Key clinical facts captured in demo runs' },
] as const

// ─── References ───────────────────────────────────────────────────────────────

const REFERENCES = [
  {
    title: 'SOAP Notes: StatPearls, NCBI Bookshelf',
    sub: 'The clinical documentation framework behind the patient-state schema and bento hierarchy.',
    href: 'https://www.ncbi.nlm.nih.gov/books/NBK482263/',
  },
  {
    title: 'Deepgram nova-3-medical',
    sub: 'Streaming medical speech-to-text with diarization, used directly from the browser.',
    href: 'https://developers.deepgram.com/docs/models-languages-overview',
  },
  {
    title: 'Anthropic: Tool use documentation',
    sub: 'Schema-enforced structured extraction with Claude (claude-sonnet-4-6).',
    href: 'https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview',
  },
  {
    title: 'Clair on GitHub',
    sub: 'Full source: Next.js client, Flask server, schema, and prompts.',
    href: 'https://github.com/justinsiek/HackDavis2026',
  },
] as const

// ─── Page ─────────────────────────────────────────────────────────────────────

function ScreenshotShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.96, 1])
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <div ref={ref}>
      <motion.div
        style={{
          scale,
          y,
          borderRadius: caseStudyRadius,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 50px 140px rgba(91,124,250,0.18)',
          background: '#fff',
        }}
      >
        <Image
          src="/case-study/clair/demo-screenshot.png"
          alt="Clair patient page, SOAP bento record with change narrative, vitals, labs, and plan"
          width={1888}
          height={1101}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </motion.div>
      <motion.p
        {...reveal}
        style={{
          fontFamily: jakarta,
          fontSize: '13.5px',
          color: '#888',
          textAlign: 'center',
          marginTop: '18px',
        }}
      >
        The patient page: synopsis up top, &ldquo;what&apos;s changed since you last saw
        this patient&rdquo; on the right, SOAP bento below, built to be scanned in ten
        seconds.
      </motion.p>
    </div>
  )
}

export default function ClairPage() {
  return (
    <div style={{ background: '#F4F4F4', color: INK, minHeight: '100vh' }}>
      {/* Nav */}
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
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
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

      <SectionRail
        accent={ACCENT}
        sections={[
          { id: 'tldr', label: 'TLDR' },
          { id: 'problem', label: 'Problem' },
          { id: 'product', label: 'Product' },
          { id: 'build', label: 'Build' },
          { id: 'challenges', label: 'Challenges' },
          { id: 'takeaways', label: 'Takeaways' },
          { id: 'results', label: 'Results' },
          { id: 'references', label: 'References' },
        ]}
      />
      <HeroSection />
      <MetaStrip />

      {/* TLDR */}
      <section id="tldr" style={{ padding: '14vh 7vw 6vh', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>TLDR</Eyebrow>
          <motion.h2 {...reveal} style={h2Style}>
            24 hours. One question: what did the last doctor know that you don&apos;t?
          </motion.h2>
          <motion.div {...reveal} style={{ ...bodyStyle, fontSize: '18px', marginTop: '32px' }}>
            <p style={{ margin: 0 }}>
              Patient handoff in hospitals is informal and unstandardized, and patients
              pay the price, repeated questions, missed notes, long-term goals that
              quietly fall out of the plan. At HackDavis 2026 our team of three built
              Clair: every visit is transcribed live, Claude extracts a structured
              SOAP record from the conversation, and each returning doctor gets a
              short narrative of exactly what changed since they last saw the patient.
            </p>
            <p style={{ margin: '20px 0 0' }}>
              It won Anthropic&apos;s &ldquo;Best Use of AI/ML&rdquo; track. This page
              is the story of what we built, the two problems that nearly broke us,
              and what I&apos;d carry into the next product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" style={{ padding: '10vh 7vw', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>The Problem</Eyebrow>
          <motion.h2 {...reveal} style={{ ...h2Style, maxWidth: '820px' }}>
            The patient carries the record, because nobody else does.
          </motion.h2>
          <motion.p {...reveal} style={{ ...bodyStyle, maxWidth: '720px', marginTop: '28px' }}>
            Between shift changes and specialty consults, each doctor walks in with a
            partial picture. The chart technically has everything, but nobody has
            ten minutes to reconstruct a story from forty pages of notes.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
              marginTop: '48px',
            }}
          >
            {PROBLEM_CARDS.map((c) => (
              <motion.div
                key={c.stat}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
                style={{
                  background: '#fff',
                  borderRadius: caseStudyRadius,
                  border: '1px solid #ececec',
                  padding: '28px',
                }}
              >
                <div style={{ fontFamily: jakarta, fontSize: '34px', fontWeight: 700, color: ACCENT, lineHeight: 1 }}>
                  {c.stat}
                </div>
                <p style={{ ...bodyStyle, fontSize: '15px', marginTop: '14px', marginBottom: 0 }}>{c.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote
            {...reveal}
            style={{
              margin: '72px auto 0',
              maxWidth: '820px',
              padding: '0 0 0 28px',
              borderLeft: `3px solid ${ACCENT}`,
            }}
          >
            <p
              style={{
                fontFamily: instrument,
                fontSize: 'clamp(22px, 3vw, 32px)',
                lineHeight: 1.35,
                color: INK,
                margin: 0,
              }}
            >
              &ldquo;You&apos;re creating a clearing house where all that information is
              in one place, instead of clicking neurology, click nutrition,
              click&hellip;&rdquo;
            </p>
            <footer style={{ fontFamily: jakarta, fontSize: '14px', color: '#888', marginTop: '16px' }}>
              Harvard physician who advised the project, reframing what handoffs
              actually lack
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* PRODUCT, screenshot */}
      <section id="product" style={{ padding: '10vh 5vw 4vh', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto 56px', textAlign: 'center' }}>
            <Eyebrow>The Product</Eyebrow>
            <motion.h2 {...reveal} style={h2Style}>
              A record that updates itself while the doctor just&hellip; talks.
            </motion.h2>
          </div>
          <ScreenshotShowcase />
        </div>
      </section>

      {/* PRODUCT, features */}
      <section style={{ padding: '8vh 7vw' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '20px',
            }}
          >
            {FEATURES.map((f) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: '#fff',
                  borderRadius: caseStudyRadius,
                  border: '1px solid #ececec',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontFamily: instrument, fontSize: '13px', color: ACCENT, marginBottom: '14px' }}>
                  {f.n}
                </div>
                <h3
                  style={{
                    fontFamily: jakarta,
                    fontSize: '20px',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: INK,
                    margin: '0 0 12px',
                    lineHeight: 1.25,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ ...bodyStyle, fontSize: '14.5px', margin: 0, flexGrow: 1 }}>{f.body}</p>
                {f.vignette}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="build" style={{ padding: '10vh 7vw', background: '#ffffff', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>How It&apos;s Built</Eyebrow>
          <motion.h2 {...reveal} style={{ ...h2Style, maxWidth: '760px' }}>
            The browser talks to Deepgram. Flask talks to Claude. Nothing blocks the
            conversation.
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: '10px',
              marginTop: '56px',
              flexWrap: 'wrap',
            }}
          >
            {ARCH_NODES.map((node, i) => (
              <motion.div
                key={node.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 150px' }}
              >
                <div
                  style={{
                    flex: 1,
                    background: '#fafafa',
                    border: '1px solid #ececec',
                    borderRadius: caseStudyRadius,
                    padding: '20px 16px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: jakarta, fontSize: '15px', fontWeight: 600, color: INK }}>
                    {node.title}
                  </div>
                  <div style={{ fontFamily: jakarta, fontSize: '12px', color: '#999', marginTop: '6px' }}>
                    {node.sub}
                  </div>
                </div>
                {i < ARCH_NODES.length - 1 && (
                  <span style={{ color: ACCENT, fontSize: '18px', flexShrink: 0 }}>→</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
              marginTop: '40px',
            }}
          >
            <motion.div
              {...reveal}
              style={{
                background: '#fafafa',
                border: '1px solid #ececec',
                borderRadius: caseStudyRadius,
                padding: '28px',
              }}
            >
              <div style={{ fontFamily: instrument, fontSize: '12px', color: ACCENT, marginBottom: '10px' }}>
                LLM CALL 1: EXTRACT
              </div>
              <p style={{ ...bodyStyle, fontSize: '15px', margin: 0 }}>
                One tool-use call with a strict <code style={{ fontSize: '13px', background: '#f0f0f0', padding: '1px 5px', borderRadius: '3px' }}>input_schema</code>{' '}
                takes the current state plus the new transcript and returns the full
                updated SOAP record, carrying unchanged fields forward, refusing to
                invent clinical facts.
              </p>
            </motion.div>
            <motion.div
              {...reveal}
              style={{
                background: '#fafafa',
                border: '1px solid #ececec',
                borderRadius: caseStudyRadius,
                padding: '28px',
              }}
            >
              <div style={{ fontFamily: instrument, fontSize: '12px', color: ACCENT, marginBottom: '10px' }}>
                LLM CALL 2: NARRATE
              </div>
              <p style={{ ...bodyStyle, fontSize: '15px', margin: 0 }}>
                Given a doctor&apos;s personal snapshot and the current state, Claude
                writes the 2–4 sentence &ldquo;what changed&rdquo; handoff, and
                short-circuits entirely when nothing has changed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="challenges" style={{ padding: '12vh 7vw', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>What Almost Broke Us</Eyebrow>
          <motion.h2 {...reveal} style={{ ...h2Style, maxWidth: '760px' }}>
            Two problems ate half the clock.
          </motion.h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              marginTop: '52px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 110, damping: 20 }}
              style={{
                background: '#fff',
                border: '1px solid #ececec',
                borderRadius: caseStudyRadius,
                padding: '36px 32px',
              }}
            >
              <div style={{ fontFamily: instrument, fontSize: '12px', color: ACCENT, marginBottom: '12px' }}>
                CHALLENGE: WHO IS SPEAKING?
              </div>
              <h3 style={{ fontFamily: jakarta, fontSize: '22px', fontWeight: 600, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                Voice biometrics fell apart. The fallback won.
              </h3>
              <p style={{ ...bodyStyle, fontSize: '15px', margin: 0 }}>
                We first tried speaker enrollment so the system could attribute turns
                to a named clinician automatically. Enrollment audio was short and
                noisy, and diarization couldn&apos;t hold identities consistently.
                After burning real hours, we fell back to transcript-level
                diarization, first speaker becomes &ldquo;Doctor,&rdquo; tap-to-swap
                if the heuristic is wrong, and let the LLM handle attribution
                downstream. In practice, it identified key information every time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 26 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 110, damping: 20 }}
              style={{
                background: '#fff',
                border: '1px solid #ececec',
                borderRadius: caseStudyRadius,
                padding: '36px 32px',
              }}
            >
              <div style={{ fontFamily: instrument, fontSize: '12px', color: ACCENT, marginBottom: '12px' }}>
                CHALLENGE: WHAT DESERVES THE FIRST TEN SECONDS?
              </div>
              <h3 style={{ fontFamily: jakarta, fontSize: '22px', fontWeight: 600, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                The hardest design problem wasn&apos;t the AI.
              </h3>
              <p style={{ ...bodyStyle, fontSize: '15px', margin: 0 }}>
                Deriving the schema from published clinical datasets produced
                something comprehensive but unprioritized. The physician consult
                fixed it: doctors scan synopsis first, then active problems and
                meds, then plan, vitals available but not dominant. That
                conversation produced the SOAP bento, the one-sentence synopsis, the
                dedicated long-term-goals field, and the cut of allergies from v1.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TAKEAWAYS */}
      <section id="takeaways" style={{ padding: '10vh 7vw', background: INK, color: '#fff', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div {...reveal} style={{ ...eyebrowStyle, color: '#9DB1FC' }}>
            Takeaways
          </motion.div>
          <motion.h2 {...reveal} style={{ ...h2Style, color: '#fff' }}>
            What I&apos;m carrying into the next build.
          </motion.h2>

          <div style={{ marginTop: '64px' }}>
            {TAKEAWAYS.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  gap: 'clamp(20px, 4vw, 56px)',
                  padding: '44px 0',
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  borderBottom: i === TAKEAWAYS.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontFamily: instrument,
                    fontSize: 'clamp(36px, 5vw, 56px)',
                    color: '#5B7CFA',
                    lineHeight: 1,
                    flexShrink: 0,
                    width: '90px',
                  }}
                >
                  {t.n}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: jakarta,
                      fontSize: 'clamp(20px, 2.6vw, 28px)',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      margin: '0 0 12px',
                      color: '#fff',
                    }}
                  >
                    {t.title}
                  </h3>
                  <p style={{ ...bodyStyle, color: 'rgba(255,255,255,0.66)', fontSize: '15.5px', margin: 0, maxWidth: '680px' }}>
                    {t.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" style={{ padding: '12vh 7vw 6vh', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>Results</Eyebrow>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              marginTop: '12px',
            }}
          >
            {METRICS.map((m) => (
              <motion.div
                key={m.label}
                variants={{
                  hidden: { opacity: 0, scale: 0.94 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
                style={{
                  background: '#fff',
                  border: '1px solid #ececec',
                  borderRadius: caseStudyRadius,
                  padding: '28px 24px',
                }}
              >
                <div style={{ fontFamily: jakarta, fontSize: '38px', fontWeight: 700, color: INK, lineHeight: 1 }}>
                  {m.value}
                </div>
                <div style={{ fontFamily: jakarta, fontSize: '13px', color: '#888', marginTop: '10px', lineHeight: 1.5 }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* REFERENCES */}
      <section id="references" style={{ padding: '8vh 7vw', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>References</Eyebrow>
          <div style={{ marginTop: '8px' }}>
            {REFERENCES.map((r, i) => (
              <motion.a
                key={r.href}
                {...reveal}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-pill="Open"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '24px',
                  padding: '22px 0',
                  borderBottom: '1px solid #e4e4e4',
                  borderTop: i === 0 ? '1px solid #e4e4e4' : 'none',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <div style={{ fontFamily: jakarta, fontSize: '16px', fontWeight: 600, color: INK }}>
                    {r.title}
                  </div>
                  <div style={{ fontFamily: jakarta, fontSize: '13.5px', color: '#888', marginTop: '4px' }}>
                    {r.sub}
                  </div>
                </div>
                <span style={{ color: ACCENT, fontSize: '15px', flexShrink: 0 }}>↗</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ACKNOWLEDGMENTS + FOOTER */}
      <section style={{ padding: '8vh 7vw 6vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Eyebrow>Acknowledgments</Eyebrow>
          <motion.div {...reveal} style={{ ...bodyStyle, fontSize: '17px' }}>
            <p style={{ margin: 0 }}>
              Built with Justin Siek and Sanskar Mishra over one very long day at UC
              Davis. And thank you to the physician who gave us an hour that changed
              the whole product, the best design review we&apos;ve ever had.
            </p>
            <p style={{ marginTop: '24px', color: '#666' }}>
              Reach out at{' '}
              <a href="mailto:leowuhacohen@gmail.com" style={{ color: ACCENT, textDecoration: 'none' }}>
                leowuhacohen@gmail.com
              </a>{' '}
              for the full story.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ padding: '0 7vw 72px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <NextProjectFooter
            accent={ACCENT}
            prev={{ label: 'Findy', href: '/work/findy' }}
            next={{
              label: 'CHAGEE USA',
              href: '/work/chagee',
              descriptor: 'Launching a brand from zero and making opening day unmissable.',
            }}
          />
        </div>
      </div>
    </div>
  )
}
