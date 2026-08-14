'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { caseStudyRadius, caseStudyTitle } from '../../../components/caseStudyTheme'
import {
  MetaCards,
  NextProjectFooter,
  SectionRail,
  TakeawayCards,
  kitReveal,
} from '../../../components/CaseStudyKit'

const sans = 'var(--font-instrument), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

const ACCENT = '#2563eb'

const FIGMA_EMBED =
  'https://embed.figma.com/slides/msGjfaqJcKL6XeAQLSfbva/Case-Study?node-id=481-5899&embed-host=share'

function HeaderSection() {
  return (
    <header style={{ padding: '110px 7vw 0', background: '#FBF8F3' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: caseStudyRadius,
            overflow: 'hidden',
            border: '1px solid rgba(22,19,14,0.12)',
            aspectRatio: '16 / 7',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/case-study/findy/stills/still-4.png"
            alt="A research session at a senior center, most of the room with a hand raised"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
          style={{
            fontFamily: instrument,
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '0.01em',
            color: '#8A8377',
            margin: '56px 0 20px',
          }}
        >
          Findy · UCI Project Teams · 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{
            ...caseStudyTitle,
            fontSize: 'clamp(30px, 3.6vw, 42px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.18,
            maxWidth: '820px',
          }}
        >
          An AI guide that lives inside iOS and helps seniors use their phones
          without feeling overwhelmed.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <MetaCards
            accent={ACCENT}
            items={[
              { label: 'Role', value: 'Project Lead' },
              { label: 'Timeline', value: '8 weeks, 2026' },
              { label: 'Team', value: '5 designers' },
              { label: 'Method', value: 'Field research, 2 senior centers' },
            ]}
          />
        </motion.div>
      </div>
    </header>
  )
}

export default function FindyPage() {
  return (
    <div style={{ background: '#FBF8F3', color: '#16130E', minHeight: '100vh' }}>
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
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        }}
      >
        <Link
          href="/"
          data-cursor-pill="Back"
          style={{
            fontFamily: sans,
            fontSize: '13px',
            color: '#8A8377',
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
              { label: 'Playground', href: '/playground' },
            ] as const
          ).map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-cursor-pill={label}
              style={{
                fontFamily: sans,
                fontSize: '13px',
                color: '#8A8377',
                textDecoration: 'none',
              }}
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
          { id: 'research', label: 'Research' },
          { id: 'deck', label: 'Deck' },
          { id: 'takeaways', label: 'Takeaways' },
        ]}
      />
      <HeaderSection />

      {/* TLDR */}
      <section id="tldr" style={{ padding: '13vh 7vw 6vh', scrollMarginTop: '60px' }}>
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: sans,
              fontSize: '18px',
              color: '#4A443B',
              lineHeight: 1.75,
              maxWidth: '720px',
            }}
          >
            <p>
              I led a team of 5 through UCI&apos;s Project Teams design sprint, trying to
              answer a question that bugged all of us: why do seniors still struggle with
              tech when there&apos;s more built to help them than ever? Our survey data
              said 73% of seniors rarely struggle. Then we sat with them at two senior
              centers and watched the opposite happen.
            </p>
            <p style={{ marginTop: '20px' }}>
              The real barrier isn&apos;t ability, it&apos;s overwhelm. And doing things
              for seniors is just as harmful as giving them too many options, because
              either way the learning stops. So we designed Findy, an AI guide that lives
              inside iOS, dims the noise, and spotlights the next step (without ever
              taking over).
            </p>
            <p style={{ marginTop: '20px' }}>
              The deck below walks through the research, the pivots, the character
              design, and how we landed on building inside iOS.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stills gallery */}
      <section id="research" style={{ padding: '4vh 5vw', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            {...kitReveal}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {[1, 7, 8].map((n) => (
              <motion.div
                key={n}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  borderRadius: caseStudyRadius,
                  overflow: 'hidden',
                  border: '1px solid rgba(22,19,14,0.12)',
                  boxShadow: '0 10px 30px rgba(37,99,235,0.08)',
                  background: 'rgba(255,255,255,0.65)',
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
              fontFamily: sans,
              fontSize: '13.5px',
              color: '#8A8377',
              textAlign: 'center',
              marginTop: '18px',
            }}
          >
            From the field research: sessions at two senior centers and in-home
            visits, where the real barrier showed itself.
          </motion.p>
        </div>
      </section>

      {/* THE DECK, Figma embed */}
      <section id="deck" style={{ padding: '6vh 5vw 14vh', scrollMarginTop: '60px' }}>
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
                  fontFamily: instrument,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 400,
                  color: '#16130E',
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
                fontFamily: sans,
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
              background: '#F5F0E8',
              borderRadius: caseStudyRadius,
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(37,99,235,0.12)',
              border: '1px solid rgba(22,19,14,0.12)',
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
              fontFamily: sans,
              fontSize: '14px',
              color: '#8A8377',
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            Use arrow keys or click inside the deck to advance through slides.
          </motion.p>
        </div>
      </section>

      {/* Acknowledgments + contact */}
      <section id="takeaways" style={{ padding: '8vh 7vw 18vh', scrollMarginTop: '60px' }}>
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
              fontFamily: sans,
              fontSize: '17px',
              color: '#4A443B',
              lineHeight: 1.75,
            }}
          >
            <p>
              Huge thanks to my teammates Vanessa Pham, Armin Mohammadi, Katrina Wang, and Apoorva Khandelwal, the designers who built this alongside me. And to the seniors, senior centers, and the staff at Adriana Elderly Care Homes who let us sit with them, learn from them, and test with them. Findy exists because they were willing to share their time.
            </p>
            <p style={{ marginTop: '24px', color: '#8A8377' }}>
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
                  title: 'Surveys hide what shame covers up',
                  body: '73% of seniors told us they rarely struggle with tech, and then we watched them struggle in person. Self-reported data protects people’s pride, but sitting next to them tells you the truth.',
                },
                {
                  title: 'Overwhelm is the barrier, not ability',
                  body: 'Doing things for seniors is just as harmful as giving them too many options, because either way the learning stops. Our design job was dimming noise, not adding help.',
                },
                {
                  title: 'Build where the user already lives',
                  body: 'A separate app would have been one more thing to learn, so living inside iOS was the only honest answer to our own research.',
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
