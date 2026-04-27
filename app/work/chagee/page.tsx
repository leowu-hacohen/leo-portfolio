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

export default function ChageePage() {
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
          Product Marketing · Case Study
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
          CHAGEE USA: First Market Launch
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
          Launching a brand from zero in a saturated US market, and turning
          opening day into an event people couldn&apos;t miss.
        </motion.p>

        {/* Problem */}
        <Section
          label="Problem"
          heading="A massive brand in Asia. A complete unknown in Orange County."
        >
          <p style={bodyStyle}>
            CHAGEE has Starbucks-level recognition across Asia. In the US, we
            were starting from zero. The boba market here is crowded and runs
            on word-of-mouth: people try a new shop because a friend posted
            about it or they walked past a line, not because they saw an ad.
            A standard launch playbook would mean an empty opening day, no
            momentum, and a flop before the brand had a chance.
          </p>
        </Section>

        {/* My Role */}
        <Section
          label="My Role"
          heading="Product Marketing Intern · 4 months"
        >
          <p style={{ ...bodyStyle, marginBottom: '14px' }}>
            Embedded with the Marketing Manager, Social Media Lead, the
            operations team, and an external creative agency. Owned creator
            strategy, soft-opening choreography, and cross-functional launch
            coordination across marketing, ops, and agency partners.
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
              'Mapped and managed 100+ local OC creator relationships end-to-end',
              'Built the soft-opening guest list, briefs, and on-site shot list',
              'Coordinated launch-weekend content cadence across creators and channels',
              'Synced with ops on capacity planning for opening-weekend traffic',
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
          heading="Three phases: build buzz, manufacture FOMO, sustain momentum."
        >
          <p style={{ ...bodyStyle, marginBottom: '28px' }}>
            We treated the launch like a product, not a campaign. Every
            touchpoint (DMs, preview events, packaging, store design) was
            optimized for shareability. If it wasn&apos;t Instagram-worthy, we
            redesigned it.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                phase: '01',
                title: 'Build buzz · 6 weeks pre-launch',
                copy:
                  'Identified 100+ local OC food and lifestyle creators. Sent personalized outreach, not mass DMs. Invited a curated set to exclusive preview tastings before the soft opening. Local relevance over follower count: a creator with 10K followers in Irvine outperforms 500K in New York.',
              },
              {
                phase: '02',
                title: 'Create FOMO · soft opening',
                copy:
                  'Creators-only soft opening with first access to the menu, store, and photo moments. Hundreds of posts and stories dropped that same weekend, all framing CHAGEE as the new place you needed to try. Social proof at scale before a single paying customer walked in.',
              },
              {
                phase: '03',
                title: 'Sustain momentum · 3-day grand opening',
                copy:
                  'Pop-up tea trucks across LA pulled foot traffic toward the store. An Emily Ratajkowski appearance created a "you had to be there" moment. Creator posts were scheduled to drop throughout the weekend so the feed never went quiet.',
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
          heading="One of the most talked-about boba openings in Orange County."
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
              { value: '8,000', label: 'IG followers before doors opened' },
              { value: '5,000+', label: 'Opening-weekend visitors' },
              { value: '2.5M+', label: 'Video views from creator content' },
              { value: '+28%', label: 'Brand awareness lift in target demo' },
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
            GTM isn&apos;t about the biggest budget. It&apos;s about reading
            the audience, picking the right channels, and creating moments
            worth talking about. In a crowded market, momentum is everything;
            you can&apos;t afford a slow start.
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
            href="/"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            ← Home
          </Link>
          <Link
            href="/nami"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            Next: Nami →
          </Link>
        </div>
      </div>
    </div>
  )
}
