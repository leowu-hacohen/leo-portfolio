'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument), Helvetica Neue, Helvetica, Arial, sans-serif'

const ACCENT = '#2563eb'

// ─── reusable scroll-reveal beat ─────────────────────────────────────────────
function Beat({
  label,
  heading,
  body,
  media,
  align = 'left',
  wide = false,
}: {
  label: string
  heading: string
  body?: React.ReactNode
  media?: React.ReactNode
  align?: 'left' | 'center'
  wide?: boolean
}) {
  return (
    <section
      style={{
        padding: '14vh 7vw',
        maxWidth: wide ? '1400px' : '1100px',
        margin: '0 auto',
        textAlign: align,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: instrument,
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: ACCENT,
          marginBottom: '24px',
        }}
      >
        {label}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        style={{
          fontFamily: jakarta,
          fontSize: 'clamp(34px, 5vw, 64px)',
          fontWeight: 600,
          color: '#0a0a0a',
          letterSpacing: '-0.02em',
          lineHeight: 1.08,
          margin: 0,
          maxWidth: align === 'center' ? '900px' : '880px',
          marginLeft: align === 'center' ? 'auto' : 0,
          marginRight: align === 'center' ? 'auto' : 0,
        }}
      >
        {heading}
      </motion.h2>
      {body && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          style={{
            fontFamily: jakarta,
            fontSize: '18px',
            fontWeight: 400,
            color: '#444',
            lineHeight: 1.7,
            marginTop: '28px',
            maxWidth: align === 'center' ? '720px' : '720px',
            marginLeft: align === 'center' ? 'auto' : 0,
            marginRight: align === 'center' ? 'auto' : 0,
          }}
        >
          {body}
        </motion.div>
      )}
      {media && (
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{ marginTop: '56px' }}
        >
          {media}
        </motion.div>
      )}
    </section>
  )
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
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
          color: '#fff',
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
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '24px',
          }}
        >
          Findy · UCI Project Teams · 2026
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            fontFamily: jakarta,
            fontSize: 'clamp(44px, 7vw, 96px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            margin: 0,
            maxWidth: '1100px',
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
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.7,
            marginTop: '28px',
            maxWidth: '620px',
          }}
        >
          Project Lead, UCI Project Teams Design Sprint (8 weeks) · 1st Place · Team of 5 · 2026
        </motion.p>
      </motion.div>
    </section>
  )
}

function MediaImg({
  src,
  alt,
  height = '70vh',
  fit = 'contain',
  bg = '#f5f7fb',
}: {
  src: string
  alt: string
  height?: string
  fit?: 'contain' | 'cover'
  bg?: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height,
        background: bg,
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: fit,
        }}
      />
    </div>
  )
}

function MediaVideo({
  src,
  height = '80vh',
}: {
  src: string
  height?: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height,
        background: '#000',
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

function StickyVideoBlock({
  src,
  caption,
}: {
  src: string
  caption: string
}) {
  return (
    <section
      style={{
        position: 'relative',
        background: '#0a0a0a',
        padding: '14vh 7vw',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            background: '#000',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(37,99,235,0.18)',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
        <p
          style={{
            fontFamily: jakarta,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          {caption}
        </p>
      </motion.div>
    </section>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────
export default function FindyPage() {
  return (
    <div style={{ background: '#ffffff', color: '#0a0a0a', minHeight: '100vh' }}>
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

      {/* THE MISSION */}
      <Beat
        label="The Mission"
        heading="Help seniors feel capable with technology, not lost in it."
        body={
          <p>
            Technology keeps getting more powerful and more deeply woven into daily life, and seniors are increasingly left to navigate it alone. We wanted to close that gap without stripping away their independence.
          </p>
        }
        media={
          <MediaImg src="/case-study/findy/stills/still-8.png" alt="Volunteer tech support flyer" height="64vh" />
        }
      />

      {/* WHERE IT STARTED */}
      <Beat
        label="Where It Started"
        heading="A question I'd been sitting with for years."
        body={
          <>
            <p>
              Before this was a project, it was a Sunday volunteer shift. In high school I ran tech support at a senior center, and I watched capable, sharp people get defeated by their own phones.
            </p>
            <p style={{ marginTop: '18px' }}>
              So when the sprint started, I already had the question: why do seniors still struggle with technology, when there&apos;s more built to help them than ever?
            </p>
          </>
        }
      />

      {/* THE LANDSCAPE */}
      <Beat
        label="The Landscape"
        heading="Everything was either powerful or simple, never both."
        body={
          <p>
            We mapped what seniors already have, Siri, iOS accessibility, senior modes, ChatGPT, against two axes: capability and ease of use. Everything sat in a corner. Powerful but hard, or easy but limited. Nothing lived in the middle, where seniors actually need it.
          </p>
        }
        media={<MediaImg src="/case-study/findy/stills/still-1.png" alt="Competitive analysis matrix" height="62vh" />}
      />

      {/* THE FIRST SIGNAL */}
      <Beat
        label="The First Signal"
        heading="The data lied to us, and that told us something."
        body={
          <p>
            We ran surveys. 73% of seniors said they rarely struggle with technology at all, which didn&apos;t match anything we&apos;d seen with our own eyes. The data wasn&apos;t wrong, it was underreported. Seniors don&apos;t admit struggle to a form. So we stopped trusting the surveys and went to find the truth in person.
          </p>
        }
        media={<MediaImg src="/case-study/findy/stills/still-7.png" alt="Survey results" height="58vh" />}
      />

      {/* THE RESEARCH — sticky cinematic video */}
      <Beat
        label="The Research"
        heading="We showed up in person, because seniors engage with people, not forms."
        body={
          <p>
            Two senior centers. Eight interviews. One Socratic seminar. Sitting at the table with people instead of behind a survey link. That single decision reshaped the entire project, because it&apos;s where the real insight finally surfaced.
          </p>
        }
      />
      <StickyVideoBlock
        src="/case-study/findy/videos/slide9.mp4"
        caption="In-person research at two senior centers, eight interviews, one Socratic seminar."
      />

      {/* THE KEY INSIGHT */}
      <Beat
        label="The Key Insight"
        heading="The barrier isn't ability. It's overwhelm."
        body={
          <p>
            Underneath every difference between seniors, the cultures, the routines, the wildly different comfort with tech, the one shared thread was overwhelm. The fear of tapping the wrong thing. Forgetting where they were. Giving up. It was never about capability.
          </p>
        }
      />

      {/* Trio of research videos, stacked */}
      <section
        style={{
          padding: '6vh 7vw 14vh',
          background: '#0a0a0a',
        }}
      >
        <div
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            display: 'grid',
            gap: '24px',
          }}
        >
          {[
            { src: '/case-study/findy/videos/slide11.mp4', cap: 'No one-size-fits-all.' },
            { src: '/case-study/findy/videos/slide12-1.mp4', cap: 'The barrier is overwhelm.' },
            { src: '/case-study/findy/videos/slide13.mp4', cap: 'People, not platforms.' },
          ].map((v, i) => (
            <motion.div
              key={v.src}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <MediaVideo src={v.src} height="60vh" />
              <p
                style={{
                  fontFamily: jakarta,
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.55)',
                  marginTop: '14px',
                  textAlign: 'center',
                }}
              >
                {v.cap}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE NUANCE */}
      <Beat
        label="The Nuance"
        heading="Doing everything for them is just as harmful as giving them too much."
        body={
          <p>
            This is the part I&apos;m proudest of catching. We assumed the fix was software that does things for seniors. It isn&apos;t. Taking over leaves them just as lost as too many options does, because either way they still don&apos;t understand what happened. An expert psychologist we consulted confirmed it: when support takes over, learning stops.
          </p>
        }
        media={<MediaImg src="/case-study/findy/stills/still-6.png" alt="Expert insight" height="58vh" />}
      />

      {/* THE GUIDING QUESTION — big quote moment */}
      <section style={{ padding: '20vh 7vw', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: instrument,
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ACCENT,
            marginBottom: '32px',
          }}
        >
          The Guiding Question
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            fontFamily: jakarta,
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 500,
            color: '#0a0a0a',
            letterSpacing: '-0.02em',
            lineHeight: 1.18,
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          How might we decrease overwhelm while empowering seniors to do the things they want, so technology becomes a tool, not a barrier?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            fontFamily: jakarta,
            fontSize: '16px',
            color: '#666',
            marginTop: '36px',
          }}
        >
          Every decision after this got measured against that sentence.
        </motion.p>
      </section>

      {/* THE DECISION */}
      <Beat
        label="The Decision"
        heading="Building inside iOS wasn't an aesthetic choice. It was the only honest one."
        body={
          <p>
            The solution had to live alongside seniors, show up the moment they needed it, guide instead of take over, and feel like something they already trusted. After everything we&apos;d learned, iOS was the only place that satisfied all four. Not because it was cute, because it was the one solution that didn&apos;t compromise the vision.
          </p>
        }
        media={<MediaImg src="/case-study/findy/stills/still-5.png" alt="Why iOS" height="60vh" />}
      />

      {/* THE CHARACTER — Lumi → Findy reveal */}
      <Beat
        label="The Character"
        heading="Trust comes from familiarity, not novelty."
        body={
          <p>
            We started with Lumi, a cute flower mascot, and dropped it, because it was decoration, not meaning. We landed on Findy, shaped after the Mac&apos;s Finder, the one icon every senior has seen for decades. He reads as a friendly tech-support helper, not another app to figure out. He also echoes Apple&apos;s own accessibility icon, a little figure with arms open.
          </p>
        }
        media={
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '32px',
              alignItems: 'center',
              background: '#eaf2ff',
              borderRadius: '24px',
              padding: '60px 40px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/case-study/findy/finder-button.png"
                alt="Finder-inspired button"
                style={{ maxWidth: '80%', height: 'auto' }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/case-study/findy/lil-finder-guy.png"
                alt="Findy character"
                style={{ maxWidth: '90%', height: 'auto' }}
              />
            </motion.div>
          </div>
        }
      />

      {/* THE PRODUCT */}
      <section style={{ padding: '14vh 7vw' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: instrument,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: '24px',
            }}
          >
            The Product
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: jakarta,
              fontSize: 'clamp(34px, 5vw, 64px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Findy guides, never takes over.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: jakarta,
              fontSize: '18px',
              color: '#444',
              lineHeight: 1.7,
              marginTop: '28px',
              maxWidth: '720px',
            }}
          >
            Three core features, each built straight from the research.
          </motion.p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '64px',
            }}
          >
            {[
              {
                t: 'Personalized onboarding',
                d: 'There&apos;s no one-size-fits-all. Findy asks how each senior prefers to interact, talking or typing, and tailors vision, hearing, and touch from the first screen.',
              },
              {
                t: 'Spotlight and dim',
                d: 'Darkens everything except the next step, killing the visual clutter that causes overwhelm.',
              },
              {
                t: 'A persistent help button',
                d: 'Always one tap away, so a senior is never stranded and always in control.',
              },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: '#f5f7fb',
                  borderRadius: '20px',
                  padding: '32px',
                }}
              >
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#0a0a0a',
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {f.t}
                </div>
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '15px',
                    color: '#555',
                    lineHeight: 1.65,
                  }}
                  dangerouslySetInnerHTML={{ __html: f.d }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ITERATIONS */}
      <Beat
        label="The Iterations"
        heading="We tested with real seniors and changed what didn't work."
        body={
          <p>
            At an elderly care home in Mission Viejo, usability testing exposed buttons that were too small, missing exits, and confusing overlays. We enlarged controls, added clear close buttons, and cut meaningless interactions. The method had to fit the user, not the other way around.
          </p>
        }
        media={
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
            }}
          >
            <MediaImg src="/case-study/findy/stills/still-2.png" alt="Before iteration" height="50vh" />
            <MediaImg src="/case-study/findy/stills/still-3.png" alt="After iteration" height="50vh" />
            <MediaImg src="/case-study/findy/stills/still-4.png" alt="Iteration detail" height="50vh" />
            <MediaVideo src="/case-study/findy/videos/slide12-2.mp4" height="50vh" />
          </div>
        }
      />

      {/* THE VISION */}
      <Beat
        label="The Vision"
        heading="This is the age where we can finally design for the end state."
        body={
          <p>
            Findy points at a future where Siri, accessibility, Finder, and the whole ecosystem stop being separate tools and start working as one, around the person using them. The goal was never just an app. It was a glimpse of what software looks like when AI is used to connect things, not add more of them.
          </p>
        }
        align="center"
      />

      {/* KEY LEARNINGS */}
      <section style={{ padding: '14vh 7vw', background: '#fafafa' }}>
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
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: '24px',
            }}
          >
            Key Learnings
          </motion.div>
          <div style={{ display: 'grid', gap: '40px', marginTop: '40px' }}>
            {[
              {
                h: 'The fastest way to the truth is to leave the building.',
                d: 'Our best insight came from sitting with people, not analyzing data.',
              },
              {
                h: 'A great question beats a great solution.',
                d: 'The right question carried every decision for eight weeks.',
              },
              {
                h: 'Conviction means saying no.',
                d: 'Choosing iOS meant rejecting the easier, more conventional path, and not flinching.',
              },
            ].map((l, i) => (
              <motion.div
                key={l.h}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: 'clamp(24px, 3vw, 34px)',
                    fontWeight: 600,
                    color: '#0a0a0a',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.2,
                    marginBottom: '12px',
                  }}
                >
                  {l.h}
                </div>
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '17px',
                    color: '#555',
                    lineHeight: 1.65,
                  }}
                >
                  {l.d}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACKNOWLEDGMENTS */}
      <section style={{ padding: '14vh 7vw 18vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: instrument,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: '24px',
            }}
          >
            Acknowledgments
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: jakarta,
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            This was a team effort, and the work reflects everyone who poured into it.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: jakarta,
              fontSize: '17px',
              color: '#444',
              lineHeight: 1.75,
              marginTop: '32px',
            }}
          >
            <p>
              Huge thanks to my teammates Vanessa Pham, Armin Mohammadi, Katrina Wang, and Apoorva Khandelwal, the designers who built this alongside me. The best ideas came from us building on each other.
            </p>
            <p style={{ marginTop: '20px' }}>
              And thank you to the seniors, senior centers, and the staff at Adriana Elderly Care Homes who let us sit with them, learn from them, and test with them. Findy exists because they were willing to share their time.
            </p>
            <p style={{ marginTop: '32px', color: '#666' }}>
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
        </div>
      </section>
    </div>
  )
}
