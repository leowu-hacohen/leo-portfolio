'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { caseStudyRadius } from '../../../components/caseStudyTheme'
import {
  MetaCards,
  NextProjectFooter,
  TakeawayCards,
  kitReveal,
} from '../../../components/CaseStudyKit'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

const ACCENT = '#2563eb'

const FIGMA_EMBED =
  'https://embed.figma.com/slides/msGjfaqJcKL6XeAQLSfbva/Case-Study?node-id=481-5899&embed-host=share'

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 7vw 10vh',
          color: '#0a0a0a',
          y: yText,
          opacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 }}
          style={{
            fontFamily: instrument,
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.01em',
            color: '#666',
            marginBottom: '24px',
          }}
        >
          Findy, UCI Project Teams, 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            fontFamily: jakarta,
            fontSize: 'clamp(44px, 7vw, 96px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            margin: 0,
            maxWidth: '1100px',
            color: '#0a0a0a',
          }}
        >
          An AI guide that lives inside iOS and helps seniors use their phones without feeling overwhelmed.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.75 }}
          style={{
            fontFamily: jakarta,
            fontSize: '16px',
            fontWeight: 400,
            color: '#444',
            lineHeight: 1.7,
            marginTop: '28px',
            maxWidth: '620px',
          }}
        >
          Project Lead, UCI Project Teams Design Sprint (8 weeks), Team of 5, 2026
        </motion.p>
      </motion.div>
    </section>
  )
}

export default function FindyPage() {
  return (
    <div style={{ background: '#F4F4F4', color: '#0a0a0a', minHeight: '100vh' }}>
      {/* Top nav */}
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
          style={{
            fontFamily: jakarta,
            fontSize: '13px',
            color: '#666',
            textDecoration: 'none',
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
              { label: 'Playground', href: '/playground' },
            ] as const
          ).map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-cursor-pill={label}
              style={{
                fontFamily: jakarta,
                fontSize: '13px',
                color: '#888',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <HeroSection />

      {/* TLDR */}
      <section style={{ padding: '14vh 7vw 6vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: instrument,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: ACCENT,
              marginBottom: '24px',
            }}
          >
            TLDR
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: jakarta,
              fontSize: 'clamp(30px, 4.4vw, 52px)',
              fontWeight: 600,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Eight weeks. Two senior centers. One question that ran the whole thing.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: jakarta,
              fontSize: '18px',
              color: '#444',
              lineHeight: 1.75,
              marginTop: '32px',
            }}
          >
            <p>
              I led a five-person team through UCI&apos;s Project Teams design sprint, asking why seniors still struggle with tech when there&apos;s more built to help them than ever. The surveys lied. The data said 73% of seniors rarely struggle. Sitting with them in person said the opposite.
            </p>
            <p style={{ marginTop: '20px' }}>
              The real barrier isn&apos;t ability, it&apos;s overwhelm. And doing things for seniors is just as harmful as giving them too many options, because either way the learning stops. So we designed Findy: an AI guide that lives inside iOS, dims the noise, spotlights the next step, and never takes over.
            </p>
            <p style={{ marginTop: '20px' }}>
              The deck below walks through the research, the pivots, the character design, and how we landed on building inside iOS as the only honest answer.
            </p>
          </motion.div>

          <MetaCards
            accent={ACCENT}
            items={[
              { label: 'Role', value: 'Project Lead' },
              { label: 'Timeline', value: '8 weeks, 2026' },
              { label: 'Team', value: '5 designers' },
              { label: 'Method', value: 'Field research, 2 senior centers' },
            ]}
          />
        </div>
      </section>

      {/* Stills gallery */}
      <section style={{ padding: '4vh 5vw' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            {...kitReveal}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <motion.div
                key={n}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  borderRadius: caseStudyRadius,
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 10px 30px rgba(37,99,235,0.08)',
                  background: '#fff',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/case-study/findy/stills/still-${n}.png`}
                  alt={`Findy still ${n}`}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            {...kitReveal}
            style={{
              fontFamily: jakarta,
              fontSize: '13.5px',
              color: '#888',
              textAlign: 'center',
              marginTop: '18px',
            }}
          >
            Stills from the final concept: Findy dims the noise, spotlights the next
            step, and never takes over.
          </motion.p>
        </div>
      </section>

      {/* THE DECK, Figma embed */}
      <section style={{ padding: '6vh 5vw 14vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '24px',
              marginBottom: '28px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: instrument,
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: ACCENT,
                  marginBottom: '12px',
                }}
              >
                The Deck
              </div>
              <div
                style={{
                  fontFamily: jakarta,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 600,
                  color: '#0a0a0a',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15,
                }}
              >
                Check it out.
              </div>
            </div>
            <a
              href="https://www.figma.com/slides/msGjfaqJcKL6XeAQLSfbva/Case-Study?node-id=481-5899"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-pill="Open in Figma"
              style={{
                fontFamily: jakarta,
                fontSize: '14px',
                color: ACCENT,
                textDecoration: 'none',
                borderBottom: `1px solid ${ACCENT}`,
                paddingBottom: '2px',
              }}
            >
              Open in Figma ↗
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              background: '#ffffff',
              borderRadius: caseStudyRadius,
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(37,99,235,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <iframe
              src={FIGMA_EMBED}
              title="Findy case study deck"
              loading="lazy"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#666',
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            Use arrow keys or click inside the deck to advance through slides.
          </motion.p>
        </div>
      </section>

      {/* Acknowledgments + contact */}
      <section style={{ padding: '8vh 7vw 18vh' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: instrument,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              color: ACCENT,
              marginBottom: '24px',
            }}
          >
            Acknowledgments
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: jakarta,
              fontSize: '17px',
              color: '#444',
              lineHeight: 1.75,
            }}
          >
            <p>
              Huge thanks to my teammates Vanessa Pham, Armin Mohammadi, Katrina Wang, and Apoorva Khandelwal, the designers who built this alongside me. And to the seniors, senior centers, and the staff at Adriana Elderly Care Homes who let us sit with them, learn from them, and test with them. Findy exists because they were willing to share their time.
            </p>
            <p style={{ marginTop: '24px', color: '#666' }}>
              Reach out at{' '}
              <a
                href="mailto:leowuhacohen@gmail.com"
                style={{ color: ACCENT, textDecoration: 'none' }}
              >
                leowuhacohen@gmail.com
              </a>{' '}
              for the full story.
            </p>
          </motion.div>

          <div style={{ marginTop: '80px' }}>
            <TakeawayCards
              accent={ACCENT}
              items={[
                {
                  title: 'The surveys lied. Sitting with people didn’t.',
                  body: '73% of seniors said they rarely struggle with tech. Watching them in person said the opposite. Self-reported data hides shame; field research doesn’t.',
                },
                {
                  title: 'Overwhelm is the barrier, not ability.',
                  body: 'Doing things for seniors is as harmful as giving them too many options, either way the learning stops. The design job was dimming noise, not adding help.',
                },
                {
                  title: 'Build where the user already lives.',
                  body: 'A separate app would be one more thing to learn. Living inside iOS was the only honest answer to our own research.',
                },
              ]}
            />
          </div>

          <NextProjectFooter
            accent={ACCENT}
            prev={{ label: 'BCEC Brand Strategy', href: '/work/bcec' }}
            next={{
              label: 'Clair',
              href: '/work/clair',
              descriptor: 'A clinical AI scribe that won Anthropic’s track at HackDavis 2026.',
            }}
          />
        </div>
      </section>
    </div>
  )
}
