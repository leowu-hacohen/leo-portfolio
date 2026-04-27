'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'
const noto = 'var(--font-noto), serif'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

const sectionLabelStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '11px',
  fontWeight: 500,
  color: '#999',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  marginBottom: '14px',
}

const headingStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '24px',
  fontWeight: 600,
  color: '#111',
  letterSpacing: '-0.01em',
  margin: '0 0 16px',
  lineHeight: 1.25,
}

const bodyStyle: React.CSSProperties = {
  fontFamily: jakarta,
  fontSize: '15px',
  color: '#666',
  lineHeight: 1.8,
  margin: 0,
  maxWidth: '680px',
}

const sectionWrap: React.CSSProperties = {
  marginTop: '64px',
}

const Section = ({
  label,
  heading,
  children,
}: {
  label: string
  heading: string
  children: React.ReactNode
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
    style={sectionWrap}
  >
    <div style={sectionLabelStyle}>{label}</div>
    <h2 style={headingStyle}>{heading}</h2>
    {children}
  </motion.section>
)

export default function BcecPage() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: jakarta,
        color: '#111',
      }}
    >
      <div
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 40px 120px',
        }}
      >
        {/* Top nav */}
        <motion.nav
          {...fadeUp(0)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '28px',
            paddingBottom: '64px',
          }}
        >
          <Link
            href="/"
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
                { label: 'About',  href: '/about' },
                { label: 'Work',   href: '/#work' },
                { label: 'Extras', href: '/extras' },
              ] as const
            ).map(({ label, href }) => (
              <Link
                key={label}
                href={href}
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

        {/* Eyebrow */}
        <motion.div
          {...fadeUp(0.05)}
          style={{
            fontFamily: jakarta,
            fontSize: '12px',
            fontWeight: 500,
            color: '#999',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Brand Strategy · Case Study
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeUp(0.1)}
          style={{
            fontFamily: jakarta,
            fontSize: '44px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Business Careers in Entertainment Club: Brand Strategy
        </motion.h1>

        {/* One-line description */}
        <motion.p
          {...fadeUp(0.15)}
          style={{
            fontFamily: noto,
            fontStyle: 'italic',
            fontSize: '17px',
            color: '#888',
            margin: '14px 0 0',
            lineHeight: 1.5,
            maxWidth: '640px',
          }}
        >
          Repositioning a niche club from &ldquo;industry insiders only&rdquo;
          into a business-skills hub for students who didn&apos;t know
          entertainment was an option.
        </motion.p>

        {/* Problem */}
        <Section
          label="Problem"
          heading="Seen as the club for people who already knew they wanted in."
        >
          <p style={{ ...bodyStyle, marginBottom: '14px' }}>
            BCEC was read as a club for students who already knew they wanted
            to work at Disney or Warner Bros. The reality: most business
            students don&apos;t know that Netflix has product managers,
            Spotify hires finance analysts, or gaming companies need data
            scientists. Entertainment is one of the largest industries in the
            world, but it reads as &ldquo;creative roles only&rdquo; to most
            students.
          </p>
          <p style={bodyStyle}>
            Every student who dismissed us as &ldquo;not for me&rdquo; was a
            member we never recruited. The positioning was leaving real
            opportunity on the table.
          </p>
        </Section>

        {/* My Role */}
        <Section
          label="My Role"
          heading="VP of Marketing · March 2025 – Present (1 year)"
        >
          <p style={{ ...bodyStyle, marginBottom: '14px' }}>
            Led the marketing committee in coordination with the executive
            board, event coordinators, and industry partners. Owned the
            positioning shift, the workshop curriculum direction, and content
            and messaging across channels.
          </p>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              maxWidth: '680px',
            }}
          >
            {[
              'Drove the brand repositioning from "entertainment networking" to "business careers at companies you use every day"',
              'Designed and led 5+ marketing workshops on branding, social strategy, and content',
              'Organized 3+ speaker panels featuring PMs, analysts, and coordinators, not just executives',
              'Built and managed a functioning marketing committee inside the broader exec structure',
            ].map((item, i, arr) => (
              <li
                key={item}
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start',
                  marginBottom: i < arr.length - 1 ? '8px' : 0,
                }}
              >
                <span
                  style={{
                    marginTop: '9px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#111',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: jakarta,
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Process */}
        <Section
          label="Process"
          heading="Reposition the brand, teach over gatekeep, lower the barrier."
        >
          <p style={{ ...bodyStyle, marginBottom: '28px' }}>
            We led with roles instead of industry glamour, made workshops
            tactical instead of aspirational, and treated entertainment as
            the case-study lens, not the endpoint.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                phase: '01',
                title: 'Reposition · roles over industry glamour',
                copy:
                  'Stopped leading with "entertainment industry networking" and started leading with "business careers at companies you use every day." Named specific roles: product management at Spotify, marketing at Netflix, strategy at Epic Games. Students who had dismissed us as "not for me" started seeing themselves in the industry when we named the actual jobs.',
              },
              {
                phase: '02',
                title: 'Education over gatekeeping',
                copy:
                  'Made workshops practical, not aspirational. 5+ marketing workshops on branding, social strategy, and content creation, not abstract theory. 3+ speaker panels featuring PMs, analysts, and coordinators alongside executives. Broke down real campaigns: how shows get marketed, how music launches happen. People showed up because they learned something immediately useful.',
              },
              {
                phase: '03',
                title: 'Lower the barrier to entry',
                copy:
                  '10+ collaborative training sessions and brainstorms, discussion-based, not lecture-based. Framed prompts as "how would you market this show?" instead of "this is how professionals do it." Taught frameworks transferable to any industry. Attendance grew. Members came back. The club stopped feeling like a resume line and started feeling like a learning community.',
              },
            ].map(({ phase, title, copy }) => (
              <div
                key={phase}
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#111',
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    width: '32px',
                    paddingTop: '2px',
                  }}
                >
                  {phase}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: jakarta,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#111',
                      marginBottom: '6px',
                    }}
                  >
                    {title}
                  </div>
                  <p
                    style={{
                      ...bodyStyle,
                      maxWidth: '620px',
                    }}
                  >
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Outcome */}
        <Section
          label="Outcome"
          heading="A business-skills hub that happens to focus on entertainment."
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '8px',
              marginBottom: '24px',
            }}
          >
            {[
              { value: '200+', label: 'Members engaged across workshops & events' },
              { value: '5+', label: 'Marketing workshops delivered' },
              { value: '3+', label: 'Speaker panels organized' },
              { value: '10+', label: 'Collaborative training sessions run' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#111',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '13px',
                    color: '#888',
                    marginTop: '8px',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p style={bodyStyle}>
            Brand positioning isn&apos;t just about what you say. It&apos;s
            about who feels welcome when they hear it. Lowering the barrier
            to entry didn&apos;t dilute the brand; it expanded the impact.
            Entertainment is just business applied to content people love.
            Once students understood that, everything clicked.
          </p>
        </Section>

        {/* Footer nav */}
        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            paddingTop: '48px',
            marginTop: '96px',
            display: 'flex',
            justifyContent: 'center',
            gap: '64px',
          }}
        >
          <Link
            href="/work/in-n-out"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            ← In-N-Out
          </Link>
          <Link
            href="/work/chagee"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            Next: Chagee →
          </Link>
        </div>
      </div>
    </div>
  )
}
