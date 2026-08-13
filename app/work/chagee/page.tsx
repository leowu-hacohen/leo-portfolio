'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CASE_STUDY_LABEL_COLORS,
  caseStudyBody,
  caseStudyBulletChar,
  caseStudyBulletList,
  caseStudyJakarta,
  caseStudyLabelStyles,
  caseStudyRadius,
  caseStudySectionBlock,
  caseStudySectionHeading,
  caseStudyTitle,
} from '../../../components/caseStudyTheme'
import {
  MetaCards,
  NextProjectFooter,
  SectionRail,
  TakeawayCards,
  VisualPanel,
} from '../../../components/CaseStudyKit'

const jakarta = caseStudyJakarta
const ACCENT = CASE_STUDY_LABEL_COLORS.chagee
const L = caseStudyLabelStyles(ACCENT)

const RAIL_SECTIONS = [
  { id: 'tldr', label: 'TLDR' },
  { id: 'problem', label: 'Problem' },
  { id: 'role', label: 'My Role' },
  { id: 'process', label: 'Process' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'takeaways', label: 'Takeaways' },
]

/** Hero line: same string as the H1 (mirrors Lumina-style hero where label matches headline). */
const CHAGEE_HERO_TITLE = 'CHAGEE USA: First Market Launch'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

const Section = ({
  id,
  label,
  heading,
  children,
}: {
  id?: string
  label: string
  heading: string
  children: React.ReactNode
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
    style={{ ...caseStudySectionBlock, scrollMarginTop: '80px' }}
  >
    <div style={L.sectionLabel}>{label}</div>
    <h2 style={caseStudySectionHeading}>{heading}</h2>
    {children}
  </motion.section>
)

export default function ChageePage() {
  return (
    <div
      style={{
        background: '#F4F4F4',
        minHeight: '100vh',
        fontFamily: jakarta,
        color: '#111',
      }}
    >
      <SectionRail sections={RAIL_SECTIONS} accent={ACCENT} />

      {/* Top nav (fixed, frosted) */}
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

      {/* Header: image panel, kicker, one-sentence title, meta */}
      <header style={{ padding: '110px 7vw 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              aspectRatio: '16 / 7',
              background: '#f4efe8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              boxSizing: 'border-box',
              borderRadius: caseStudyRadius,
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/work-cards/chageenew.png"
              alt="CHAGEE"
              width={1080}
              height={1350}
              priority
              style={{
                height: '100%',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </motion.div>

          <motion.div {...fadeUp(0.25)} style={{ ...L.eyebrow, margin: '56px 0 20px' }}>
            {CHAGEE_HERO_TITLE}
          </motion.div>
          <motion.h1
            {...fadeUp(0.35)}
            style={{
              ...caseStudyTitle,
              fontSize: 'clamp(30px, 3.6vw, 42px)',
              fontWeight: 600,
              lineHeight: 1.18,
              maxWidth: '820px',
            }}
          >
            Launching a brand from zero in a saturated US market, and turning
            opening day into an event people couldn&apos;t miss.
          </motion.h1>

          <MetaCards
            accent={ACCENT}
            items={[
              { label: 'Role', value: 'Product Marketing Intern' },
              { label: 'Timeline', value: '4 months' },
              { label: 'Team', value: 'Marketing, Ops, Creative agency' },
              { label: 'Scope', value: 'Creator strategy, Launch GTM' },
            ]}
          />
        </div>
      </header>

      {/* TLDR */}
      <section id="tldr" style={{ padding: '13vh 7vw 0', scrollMarginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div {...fadeUp(0)} style={L.eyebrow}>
            TLDR
          </motion.div>
          <motion.div
            {...fadeUp(0.1)}
            style={{
              fontFamily: jakarta,
              fontSize: '18px',
              color: '#444',
              lineHeight: 1.75,
              maxWidth: '720px',
            }}
          >
            <p style={{ margin: 0 }}>
              CHAGEE has Starbucks-level recognition across Asia, and none of it
              followed us to Orange County. I spent 4 months as the product
              marketing intern helping launch the first US store, in a boba market
              that runs on word-of-mouth, where a slow opening weekend can sink a
              brand before it starts.
            </p>
            <p style={{ margin: '20px 0 0' }}>
              We treated the launch like a product. I mapped and managed 100+
              local OC creators, helped choreograph a creators-only soft opening,
              and synced the grand-opening content cadence so the feed never went
              quiet. By the time doors opened, 8,000 people already followed the
              Instagram, 5,000+ came through opening weekend, and creator content
              pulled 2.5M+ views.
            </p>
            <p style={{ margin: '20px 0 0' }}>
              The sections below walk through the problem, my role, and the
              three-phase playbook.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ padding: '6vh 7vw 120px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Problem */}
        <Section
          id="problem"
          label="Problem"
          heading="A massive brand in Asia, and a complete unknown in Orange County."
        >
          <p style={caseStudyBody}>
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
          id="role"
          label="My Role"
          heading="Product Marketing Intern, 4 months"
        >
          <p style={{ ...caseStudyBody, marginBottom: '14px' }}>
            Embedded with the Marketing Manager, Social Media Lead, the
            operations team, and an external creative agency. Owned creator
            strategy, soft-opening choreography, and cross-functional launch
            coordination across marketing, ops, and agency partners.
          </p>
          <ul style={caseStudyBulletList}>
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
                  gap: '8px',
                  alignItems: 'flex-start',
                  marginBottom: i < arr.length - 1 ? '8px' : 0,
                }}
              >
                <span style={caseStudyBulletChar}>·</span>
                <span style={caseStudyBody}>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Process */}
        <Section
          id="process"
          label="Process"
          heading="Three phases: build buzz, manufacture FOMO, sustain momentum."
        >
          <p style={{ ...caseStudyBody, marginBottom: '28px' }}>
            We treated the launch like a product, not a campaign. Every
            touchpoint (DMs, preview events, packaging, store design) was
            optimized for shareability. If it wasn&apos;t Instagram-worthy, we
            redesigned it.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                phase: '01',
                title: 'Build buzz: 6 weeks pre-launch',
                copy:
                  'Identified 100+ local OC food and lifestyle creators. Sent personalized outreach, not mass DMs. Invited a curated set to exclusive preview tastings before the soft opening. Local relevance over follower count: a creator with 10K followers in Irvine outperforms 500K in New York.',
              },
              {
                phase: '02',
                title: 'Create FOMO: soft opening',
                copy:
                  'Creators-only soft opening with first access to the menu, store, and photo moments. Hundreds of posts and stories dropped that same weekend, all framing CHAGEE as the new place you needed to try. Social proof at scale before a single paying customer walked in.',
              },
              {
                phase: '03',
                title: 'Sustain momentum: 3-day grand opening',
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
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#111',
                      marginBottom: '6px',
                    }}
                  >
                    {title}
                  </div>
                  <p style={caseStudyBody}>{copy}</p>
                </div>
              </div>
            ))}
          </div>

          <VisualPanel
            caption={
              <>
                Launch choreography:{' '}
                <strong style={{ color: '#444' }}>the feed never went quiet</strong>{' '}
                from first DM to grand-opening weekend.
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { span: '6 weeks out', label: 'Creator outreach & tastings', width: '100%', tone: `${ACCENT}22` },
                { span: 'Soft opening', label: 'Creators-only: hundreds of posts drop', width: '72%', tone: `${ACCENT}55` },
                { span: 'Grand opening', label: 'Tea trucks, EmRata, 3-day cadence', width: '60%', tone: ACCENT },
              ].map(({ span, label, width, tone }) => (
                <div key={span} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      fontFamily: jakarta,
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#888',
                      width: '110px',
                      flexShrink: 0,
                      textAlign: 'right',
                    }}
                  >
                    {span}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        width,
                        background: tone,
                        borderRadius: '999px',
                        padding: '9px 16px',
                        fontFamily: jakarta,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: tone === ACCENT ? '#fff' : '#7a1d18',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </VisualPanel>

          <VisualPanel
            caption={
              <>
                Social proof at scale:{' '}
                <strong style={{ color: '#444' }}>
                  a curated local creator beats a national mega-account
                </strong>{' '}
                for a neighborhood launch.
              </>
            }
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              {[
                { handle: '@oc.eats', meta: '12K, Irvine', note: 'Preview tasting reel', hot: true },
                { handle: '@bobadiaries', meta: '28K, Tustin', note: 'Soft-opening story set', hot: true },
                { handle: '@bigfoodpage', meta: '500K, NYC', note: 'Skipped, zero local pull', hot: false },
              ].map(({ handle, meta, note, hot }) => (
                <div
                  key={handle}
                  style={{
                    border: hot ? `1px solid ${ACCENT}` : '1px dashed #d8d8d8',
                    background: hot ? `${ACCENT}0a` : 'transparent',
                    borderRadius: caseStudyRadius,
                    padding: '18px',
                    opacity: hot ? 1 : 0.7,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        background: hot ? ACCENT : '#ddd',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontFamily: jakarta, fontSize: '14px', fontWeight: 700, color: hot ? '#111' : '#999' }}>
                        {handle}
                      </div>
                      <div style={{ fontFamily: jakarta, fontSize: '11.5px', color: '#aaa' }}>{meta}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: jakarta, fontSize: '13px', color: hot ? '#555' : '#b0b0b0' }}>
                    {note}
                  </div>
                </div>
              ))}
            </div>
          </VisualPanel>
        </Section>

        {/* Outcome */}
        <Section
          id="outcome"
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
                  borderRadius: caseStudyRadius,
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
          <p style={caseStudyBody}>
            GTM isn&apos;t about the biggest budget. It&apos;s about reading
            the audience, picking the right channels, and creating moments
            worth talking about. In a crowded market, momentum is everything;
            you can&apos;t afford a slow start.
          </p>
        </Section>

        {/* Takeaways */}
        <Section id="takeaways" label="Reflection" heading="What I took away">
          <TakeawayCards
            accent={ACCENT}
            title=""
            items={[
              {
                title: 'Local relevance beats follower count.',
                body: 'A 10K-follower creator in Irvine outperforms 500K in New York for a neighborhood launch. Curation was the strategy, not reach.',
              },
              {
                title: 'Treat the launch like a product.',
                body: 'Every touchpoint, DMs, packaging, the store itself, was designed for shareability. If it wasn’t Instagram-worthy, we redesigned it.',
              },
              {
                title: 'Momentum has to be choreographed.',
                body: 'Posts were scheduled so the feed never went quiet across the weekend. FOMO isn’t luck; it’s a content calendar.',
              },
            ]}
          />
        </Section>

        <NextProjectFooter
          accent={ACCENT}
          prev={{ label: 'Clair', href: '/work/clair' }}
          next={{
            label: 'In-N-Out Location Predictor',
            href: '/work/in-n-out',
            descriptor: 'Reverse-engineering site selection with a LambdaRank model, in 36 hours.',
          }}
        />
        </div>
      </div>
    </div>
  )
}
