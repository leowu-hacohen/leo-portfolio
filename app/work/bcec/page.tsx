'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CASE_STUDY_LABEL_COLORS,
  caseStudyBody,
  caseStudyBulletChar,
  caseStudyBulletList,
  caseStudyContentMaxWidth,
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
const ACCENT = CASE_STUDY_LABEL_COLORS.bcec
const L = caseStudyLabelStyles(ACCENT)

const RAIL_SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'role', label: 'My Role' },
  { id: 'process', label: 'Process' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'takeaways', label: 'Takeaways' },
]

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

export default function BcecPage() {
  return (
    <div
      style={{
        background: '#FBF8F3',
        minHeight: '100vh',
        fontFamily: jakarta,
        color: '#16130E',
      }}
    >
      <SectionRail sections={RAIL_SECTIONS} accent={ACCENT} />
      <div
        style={{
          ...caseStudyContentMaxWidth,
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
            data-cursor-pill="Back"
            style={{
              fontFamily: jakarta,
              fontSize: '13px',
              fontWeight: 400,
              color: '#8A8377',
              textDecoration: 'none',
              letterSpacing: '0.01em',
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
                  fontWeight: 400,
                  color: '#8A8377',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.nav>

        {/* Kicker + one-sentence title */}
        <motion.div {...fadeUp(0.05)} style={L.eyebrow}>
          BCEC · Business Careers in Entertainment Club · UC Irvine
        </motion.div>
        <motion.h1
          {...fadeUp(0.1)}
          style={{ ...caseStudyTitle, fontSize: '36px', lineHeight: 1.2 }}
        >
          Repositioning a niche club from &ldquo;industry insiders only&rdquo;
          into a business-skills hub for students who didn&apos;t know
          entertainment was an option.
        </motion.h1>

        <MetaCards
          accent={ACCENT}
          items={[
            { label: 'Role', value: 'VP of Marketing' },
            { label: 'Timeline', value: 'Mar 2025 – Present' },
            { label: 'Team', value: 'Marketing committee + exec board' },
            { label: 'Scope', value: 'Brand strategy, Workshops, Panels' },
          ]}
        />

        {/* Problem */}
        <Section
          id="problem"
          label="Problem"
          heading="We were seen as the club for people who already knew they wanted in."
        >
          <p style={{ ...caseStudyBody, marginBottom: '14px' }}>
            BCEC was read as a club for students who already knew they wanted
            to work at Disney or Warner Bros. The reality: most business
            students don&apos;t know that Netflix has product managers,
            Spotify hires finance analysts, or gaming companies need data
            scientists. Entertainment is one of the largest industries in the
            world, but it reads as &ldquo;creative roles only&rdquo; to most
            students.
          </p>
          <p style={caseStudyBody}>
            Every student who dismissed us as &ldquo;not for me&rdquo; was a
            member we never recruited. The positioning was leaving real
            opportunity on the table.
          </p>

          <VisualPanel
            caption={
              <>
                The repositioning in one line: stop selling the industry,{' '}
                <strong style={{ color: '#4A443B' }}>start naming the jobs</strong>.
              </>
            }
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '14px',
              }}
            >
              <div
                style={{
                  border: '1px dashed rgba(22,19,14,0.12)',
                  borderRadius: caseStudyRadius,
                  padding: '22px',
                  opacity: 0.75,
                }}
              >
                <div style={{ fontFamily: jakarta, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8377', marginBottom: '10px' }}>
                  Before
                </div>
                <div style={{ fontFamily: jakarta, fontSize: '17px', fontWeight: 600, color: '#8A8377', lineHeight: 1.4 }}>
                  &ldquo;Entertainment industry networking&rdquo;
                </div>
                <div style={{ fontFamily: jakarta, fontSize: '13px', color: '#8A8377', marginTop: '10px' }}>
                  Reads as insiders-only. If you didn&apos;t already want in, it wasn&apos;t for you.
                </div>
              </div>
              <div
                style={{
                  border: `1px solid ${ACCENT}`,
                  background: `${ACCENT}0d`,
                  borderRadius: caseStudyRadius,
                  padding: '22px',
                }}
              >
                <div style={{ fontFamily: jakarta, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: ACCENT, marginBottom: '10px' }}>
                  After
                </div>
                <div style={{ fontFamily: jakarta, fontSize: '17px', fontWeight: 600, color: '#16130E', lineHeight: 1.4 }}>
                  &ldquo;Business careers at companies you use every day&rdquo;
                </div>
                <div style={{ fontFamily: jakarta, fontSize: '13px', color: '#8A8377', marginTop: '10px' }}>
                  Anyone studying business can see themselves here.
                </div>
              </div>
            </div>
          </VisualPanel>
        </Section>

        {/* My Role */}
        <Section
          id="role"
          label="My Role"
          heading="I have been VP of Marketing since March 2025."
        >
          <p style={{ ...caseStudyBody, marginBottom: '14px' }}>
            I led the marketing committee in coordination with the executive
            board, event coordinators, and industry partners, and owned the
            positioning shift, the workshop curriculum direction, and content
            and messaging across channels.
          </p>
          <ul style={caseStudyBulletList}>
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
          heading="We repositioned the brand, taught instead of gatekeeping, and lowered the barrier."
        >
          <p style={{ ...caseStudyBody, marginBottom: '28px' }}>
            We led with roles instead of industry glamour, made workshops
            tactical instead of aspirational, and treated entertainment as
            the case-study lens, not the endpoint.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                phase: '01',
                title: 'Reposition: roles over industry glamour',
                copy:
                  'We stopped leading with "entertainment industry networking" and started leading with "business careers at companies you use every day." We named specific roles: product management at Spotify, marketing at Netflix, strategy at Epic Games. Students who had dismissed us as "not for me" started seeing themselves in the industry when we named the actual jobs.',
              },
              {
                phase: '02',
                title: 'Education over gatekeeping',
                copy:
                  'We made workshops practical, not aspirational: 5+ marketing workshops on branding, social strategy, and content creation rather than abstract theory, and 3+ speaker panels featuring PMs, analysts, and coordinators alongside executives. We broke down real campaigns: how shows get marketed, how music launches happen. People showed up because they learned something immediately useful.',
              },
              {
                phase: '03',
                title: 'Lower the barrier to entry',
                copy:
                  'We ran 10+ collaborative training sessions and brainstorms, discussion-based rather than lecture-based. We framed prompts as "how would you market this show?" instead of "this is how professionals do it," and taught frameworks that transfer to any industry. Attendance grew, members came back, and the club stopped feeling like a resume line and started feeling like a learning community.',
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
                    color: '#16130E',
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
                      color: '#16130E',
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
                Students dismissed &ldquo;entertainment&rdquo;, until we{' '}
                <strong style={{ color: '#4A443B' }}>named the actual jobs</strong>.
              </>
            }
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {[
                { role: 'Product Management', co: 'Spotify' },
                { role: 'Marketing', co: 'Netflix' },
                { role: 'Strategy', co: 'Epic Games' },
                { role: 'Finance', co: 'Warner Bros.' },
                { role: 'Data Science', co: 'Riot Games' },
              ].map(({ role, co }) => (
                <span
                  key={co}
                  style={{
                    fontFamily: jakarta,
                    fontSize: '13.5px',
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(22,19,14,0.12)',
                    borderRadius: '999px',
                    padding: '9px 16px',
                    color: '#4A443B',
                  }}
                >
                  <strong style={{ color: '#16130E', fontWeight: 600 }}>{role}</strong>
                  {' @ '}
                  {co}
                </span>
              ))}
            </div>
          </VisualPanel>
        </Section>

        {/* Outcome */}
        <Section
          id="outcome"
          label="Outcome"
          heading="BCEC became a business-skills hub that happens to focus on entertainment."
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
                  background: 'rgba(255,255,255,0.65)',
                  borderRadius: caseStudyRadius,
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, "Times New Roman", serif',
                    fontSize: '32px',
                    fontWeight: 400,
                    color: '#16130E',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: jakarta,
                    fontSize: '13px',
                    color: '#8A8377',
                    marginTop: '8px',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <p style={caseStudyBody}>
            Brand positioning isn&apos;t just about what you say. It&apos;s
            about who feels welcome when they hear it. Lowering the barrier
            to entry didn&apos;t dilute the brand; it expanded the impact.
            Entertainment is just business applied to content people love.
            Once students understood that, everything clicked.
          </p>
        </Section>

        {/* Takeaways */}
        <Section id="takeaways" label="Reflection" heading="What I took away">
          <TakeawayCards
            accent={ACCENT}
            title=""
            items={[
              {
                title: 'Positioning is about who feels welcome.',
                body: 'The brand didn’t need a louder message, it needed a wider door. Every "not for me" was a recruiting failure we could fix with language alone.',
              },
              {
                title: 'Teach something useful and people come back.',
                body: 'Workshops that broke down real campaigns beat aspirational panels every time. Immediate usefulness is the strongest retention tool a club has.',
              },
              {
                title: 'Lowering the barrier expanded the brand, not diluted it.',
                body: 'Discussion-based prompts ("how would you market this show?") turned spectators into participants, and a resume line into a learning community.',
              },
            ]}
          />
        </Section>

        <NextProjectFooter
          accent={ACCENT}
          prev={{ label: 'In-N-Out Location Predictor', href: '/work/in-n-out' }}
          next={{
            label: 'Findy',
            href: '/work/findy',
            descriptor: 'An AI guide inside iOS that helps seniors use their phones without overwhelm.',
          }}
        />
      </div>
    </div>
  )
}
