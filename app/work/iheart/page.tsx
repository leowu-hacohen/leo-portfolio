'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  caseStudyTitle,
  caseStudyBody,
  caseStudySectionHeading,
  caseStudyLabelStyles,
  caseStudySectionBlock,
} from '../../../components/caseStudyTheme'
import {
  MetaCards,
  TakeawayCards,
  NextProjectFooter,
  kitReveal,
} from '../../../components/CaseStudyKit'

const sans = 'var(--font-instrument), sans-serif'
const serif = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

const ACCENT = '#C6002B'
const PAPER = '#FBF8F3'
const INK = '#16130E'
const MUTED = '#8A8377'

const labels = caseStudyLabelStyles(ACCENT)

function Stat({ n, caption }: { n: string; caption: string }) {
  return (
    <motion.div
      {...kitReveal}
      style={{
        borderTop: `1px solid rgba(22,19,14,0.12)`,
        paddingTop: '18px',
      }}
    >
      <div style={{ fontFamily: serif, fontSize: 'clamp(38px, 5vw, 56px)', color: ACCENT, lineHeight: 1 }}>
        {n}
      </div>
      <p style={{ fontFamily: sans, fontSize: '14.5px', color: MUTED, lineHeight: 1.5, margin: '10px 0 0' }}>
        {caption}
      </p>
    </motion.div>
  )
}

export default function IHeartPage() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '22px 6vw',
          fontFamily: sans,
          fontSize: '13.5px',
        }}
      >
        <Link href="/#work" style={{ color: MUTED, textDecoration: 'none' }}>
          ← back
        </Link>
        <div style={{ display: 'flex', gap: '26px' }}>
          {(
            [
              ['home', '/'],
              ['about', '/about'],
              ['work', '/#work'],
              ['playground', '/playground'],
            ] as const
          ).map(([label, href]) => (
            <Link key={label} href={href} style={{ color: MUTED, textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '11vh 6vw 0' }}>
        {/* header */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ ...labels.eyebrow, fontFamily: serif }}
        >
          Product Management Intern · iHeartMedia · Summer 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          style={{ ...caseStudyTitle, maxWidth: '820px' }}
        >
          Contests keep iHeart listeners around, almost nobody finds them, and I
          spent my summer fixing that.
        </motion.h1>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ margin: '48px 0 0' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work-cards/iheart/kc-flow.png"
            alt="Keyword Cash native entry concept mockups, a four-screen iOS flow from listening to confirmation"
            style={{
              width: '100%',
              borderRadius: '4px',
              border: '1px solid rgba(22,19,14,0.12)',
              display: 'block',
            }}
          />
          <figcaption
            style={{
              fontFamily: serif,
              fontStyle: 'italic',
              fontSize: '14px',
              color: MUTED,
              marginTop: '10px',
            }}
          >
            the concept mockups from my Keyword Cash PRD: listening, prompt, gated entry, confirmation
          </figcaption>
        </motion.figure>

        <MetaCards
          accent={ACCENT}
          items={[
            { label: 'Role', value: 'Product Management Intern, Digital Audio Group' },
            { label: 'Timeline', value: 'June to July 2026 · New York' },
            { label: 'Team', value: '2 PM interns, UXR, UXD, 2 managers' },
            { label: 'Result', value: 'Presented at Product Summit to the full product org' },
          ]}
        />

        {/* tldr */}
        <section style={caseStudySectionBlock}>
          <motion.p {...kitReveal} style={labels.sectionLabel}>
            TLDR
          </motion.p>
          <motion.div {...kitReveal} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={caseStudyBody}>
              Radio&apos;s money is ads, and ad agencies buy addressable audiences.
              Over-the-air listeners are invisible to that spend, so iHeart&apos;s
              whole digital push chains back to one goal: grow app users until
              they become a real line in programmatic budgets. Contests turned
              out to be a quiet retention lever pointed straight at that goal,
              since contest entrants stick around at roughly 68% versus about
              20% for new users.
            </p>
            <p style={caseStudyBody}>
              The catch: 96% of live listeners never reach the contest tab, and
              Keyword Cash, the mechanic behind 36% of all entries, is not even
              an app feature, it runs in a web view. My half of the intern
              project was Keyword Cash. I wrote the PRD, ran the user journey
              with the team, sat in the design jam, and presented the case at
              the July Product Summit in front of the whole product org.
            </p>
          </motion.div>
        </section>

        {/* the numbers */}
        <section style={caseStudySectionBlock}>
          <motion.p {...kitReveal} style={labels.sectionLabel}>
            The problem
          </motion.p>
          <motion.h2 {...kitReveal} style={caseStudySectionHeading}>
            The problem hid in plain sight.
          </motion.h2>
          <motion.p {...kitReveal} style={{ ...caseStudyBody, marginBottom: '36px' }}>
            Our UX researcher ran a 12-participant study, and the findings were
            humbling in the best way. Every participant scrolled instead of
            searching, because there was no search. People expected the contest
            being promoted on air to be near the top, and it wasn&apos;t. All
            twelve expected a confirmation email that never came. None of this
            was a technology problem, it was a findability problem.
          </motion.p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '28px',
            }}
          >
            <Stat n="96%" caption="of live listeners never reach the contest tab" />
            <Stat n="~68%" caption="retention for contest entrants, versus about 20% for new users" />
            <Stat n="36%" caption="of all entries come through Keyword Cash, which runs in a web view" />
          </div>
          <motion.figure {...kitReveal} style={{ margin: '44px 0 0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work-cards/iheart/gap-map.png"
              alt="Contest experience gap map sorting every pain point from interviews, UX study, and Amplitude into project buckets"
              style={{
                width: '100%',
                borderRadius: '4px',
                border: '1px solid rgba(22,19,14,0.12)',
                display: 'block',
              }}
            />
            <figcaption
              style={{
                fontFamily: serif,
                fontStyle: 'italic',
                fontSize: '14px',
                color: MUTED,
                marginTop: '10px',
              }}
            >
              the gap map I built for the July PRD, every pain point sorted by where it lives in the contest journey
            </figcaption>
          </motion.figure>
        </section>

        {/* keyword cash */}
        <section style={caseStudySectionBlock}>
          <motion.p {...kitReveal} style={labels.sectionLabel}>
            My half
          </motion.p>
          <motion.h2 {...kitReveal} style={caseStudySectionHeading}>
            Keyword Cash was the meatier half, so I took it.
          </motion.h2>
          <motion.div {...kitReveal} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={caseStudyBody}>
              We split the project in two: my partner took the contest tab
              (navigation and findability), and I took Keyword Cash, the
              listen-for-a-keyword mechanic that drives over a third of all
              entries. I went deep with the person who owns the mechanic, wrote
              the PRD, and worked the user journey with two other interns while
              a third built the prototypes.
            </p>
            <p style={caseStudyBody}>
              The framing mattered more than the feature list. Mid-summer we
              made a data-driven pivot: discovery became the primary story and
              native entry became the bonus, because helping people find
              contests moves the retention number, and retention feeds the
              addressable-audience goal. My manager also gave me the correction
              that saved me on stage: Keyword Cash is not &quot;not in the
              app,&quot; it is &quot;not an app feature.&quot; You can enter it
              from the app today, through a web view, and precision about that
              distinction is the difference between a finding and an error.
            </p>
            <p style={caseStudyBody}>
              The deck itself taught me tone. Screenshots were labeled
              &quot;current state,&quot; never &quot;bad.&quot; Gaps were
              &quot;room to improve.&quot; The same evidence lands completely
              differently when the framing respects the people who built the
              current thing.
            </p>
          </motion.div>
        </section>

        {/* the rest of the summer */}
        <section style={caseStudySectionBlock}>
          <motion.p {...kitReveal} style={labels.sectionLabel}>
            Beyond the project
          </motion.p>
          <motion.h2 {...kitReveal} style={caseStudySectionHeading}>
            I treated the summer like a discovery sprint on everything.
          </motion.h2>
          <motion.div {...kitReveal} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <p style={caseStudyBody}>
              In week one, before the intern project even kicked off, I noticed
              engineers losing time to ticket assignment and built a prototype
              for a smart routing layer connecting Outlook, Jira, and Slack,
              with a feasibility pass across four real APIs. I pitched it to my
              manager in a 1:1, and it earned me an audience with the people
              who own AI workflow optimization for the org.
            </p>
            <p style={caseStudyBody}>
              Alongside that: a Nielsen heuristic evaluation of the playlisting
              and player experience, a WWDC iOS 27 analysis that turned into
              four recommendations for the iOS team (including flagging a
              SiriKit deprecation before it bit), and the sports partnership
              pitch where I was the sole product voice on a seven-person intern
              team. I also ran coffee chats all summer, 74 logged meetings,
              which turned out to be the richest part of the whole thing.
            </p>
          </motion.div>
        </section>

        {/* takeaways */}
        <section style={caseStudySectionBlock}>
          <TakeawayCards
            accent={ACCENT}
            items={[
              {
                title: 'Asking questions is the job',
                body: 'What got me hired was not a portfolio, it was asking the right questions with real curiosity. PM is the role where my core trait is the work itself.',
              },
              {
                title: 'PM is the voice of the customer',
                body: 'Not project management, not engineering, not business. Answers come from research and data; instinct is for knowing which questions to ask.',
              },
              {
                title: 'Speed of learning beats flawless execution',
                body: 'The best PMs I met iterate fast and document what was explored, not just what was decided. Even the test that moved nothing taught us where the energy should go.',
              },
            ]}
          />
        </section>

        {/* acknowledgments */}
        <section style={{ ...caseStudySectionBlock, paddingBottom: '20px' }}>
          <motion.p {...kitReveal} style={labels.sectionLabel}>
            Thanks
          </motion.p>
          <motion.p {...kitReveal} style={caseStudyBody}>
            To Prachi, who told me she &quot;never once thought you weren&apos;t
            a PM,&quot; and whose corrections show up all over this page. To
            Bhawini, Dawn, Cassie, Harry, Stephanie, and Tony, who made the
            work real. And to everyone who said yes to a coffee chat, all
            seventy-something of you.
          </motion.p>
        </section>

        <NextProjectFooter
          accent={ACCENT}
          next={{
            label: 'Findy',
            href: '/work/findy',
            descriptor: 'An AI guide that helps seniors use their phones without overwhelm.',
          }}
        />
        <div style={{ height: '80px' }} />
      </main>
    </div>
  )
}
