'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CASE_STUDY_LABEL_COLORS,
  caseStudyBody,
  caseStudyBulletChar,
  caseStudyBulletList,
  caseStudyContentMaxWidth,
  caseStudyDescriptor,
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
const ACCENT = CASE_STUDY_LABEL_COLORS.inNOut
const L = caseStudyLabelStyles(ACCENT)

const RAIL_SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'role', label: 'My Role' },
  { id: 'process', label: 'Process' },
  { id: 'deck', label: 'Deck' },
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

export default function InNOutPage() {
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

        {/* Title */}
        <motion.h1 {...fadeUp(0.1)} style={caseStudyTitle}>
          In-N-Out Location Predictor: Data Heist 2026
        </motion.h1>

        {/* One-line description */}
        <motion.p {...fadeUp(0.15)} style={caseStudyDescriptor}>
          Reverse-engineering In-N-Out&apos;s site-selection strategy with a
          LambdaRank ML model, built in 36 hours.
        </motion.p>

        <MetaCards
          accent={ACCENT}
          items={[
            { label: 'Event', value: 'Data Heist 2026, 36 hours' },
            { label: 'Team', value: '3 builders' },
            { label: 'My Focus', value: 'Problem framing, Features, Viz' },
            { label: 'Stack', value: 'LightGBM LambdaRank, Omni' },
          ]}
        />

        {/* Problem */}
        <Section
          id="problem"
          label="Problem"
          heading="Predict where In-N-Out opens next, without any of their data."
        >
          <p style={{ ...caseStudyBody, marginBottom: '14px' }}>
            In-N-Out has 289 California locations and is famously strategic
            about expansion, but their decision-making is opaque. Site-level
            data isn&apos;t public. We started by trying to predict
            store-level revenue and hit a wall immediately. We actually called
            In-N-Out to request the data. They rejected us.
          </p>
          <p style={caseStudyBody}>
            With no labels and no cooperation from the company, the original
            problem was unsolvable. The real question wasn&apos;t whether we
            could predict revenue. It was whether we could reframe the
            problem into something we <em>could</em> answer with public data.
          </p>
        </Section>

        {/* My Role */}
        <Section
          id="role"
          label="My Role"
          heading="Team Member: 3-person team, 36 hours"
        >
          <p style={{ ...caseStudyBody, marginBottom: '14px' }}>
            Built at Data Heist 2026 (April 3–5, 2026) alongside Justin Siek
            and Maximiliano Jose Garcia Gutierrez. I focused on problem
            framing, feature engineering across four independent datasets,
            and translating model output into something a non-technical
            stakeholder could read on a map.
          </p>
          <ul style={caseStudyBulletList}>
            {[
              'Helped reframe the problem from revenue prediction to site ranking after the data request was rejected',
              'Engineered 14 features across geospatial, census, traffic, and competitor datasets',
              'Drove model-selection debate: tested XGBoost, landed on LightGBM LambdaRank',
              'Built Omni dashboards translating model output into geographic visualizations',
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
          heading="Reframe the problem, build the dataset, ship a ranking model."
        >
          <p style={{ ...caseStudyBody, marginBottom: '28px' }}>
            We picked features for both predictive power and explainability,
            not black-box signal, and cleaned anomalies case-by-case rather
            than applying blanket imputation rules.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              {
                phase: '01',
                title: 'Reframe: ranking, not classification',
                copy:
                  'Without revenue data, we asked a different question: among the sites available when In-N-Out chose, which one would they pick? For each real opening we added 5 nearby fast-food locations that opened 1-9 months later as "rejected" candidates. That approximated the actual choice In-N-Out faced, closer to how real decisions get made.',
              },
              {
                phase: '02',
                title: 'Build the dataset: 4 sources merged',
                copy:
                  'Merged OpenStreetMap (geospatial + competitors), U.S. Census Bureau (income + population), LODES 8 (worker flows, daytime vs. resident population), and Caltrans PeMS (Annual Average Daily Traffic). Engineered 14 features: distance to nearest In-N-Out, competitors, distribution center, and highway; median household income; resident vs. daytime population; worker flows; AADT. Caught and removed a Chipotle record that claimed to sit 600km from the nearest In-N-Out: a null restaurant name is harmless, a null income value is not.',
              },
              {
                phase: '03',
                title: 'Model + visualize: LightGBM LambdaRank',
                copy:
                  'Each group = 1 real In-N-Out + 5 rejected competitor sites; the model learned to rank the real one higher. XGBoost was our first attempt and returned high likelihoods in absurd places (middle of the ocean). LambdaRank handled it cleanly. We split train/test by group, not by row, to prevent leakage. Omni dashboards turned the predictions into a map a non-technical stakeholder could read in five seconds.',
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
                The reframe: for every real opening, the model sees the{' '}
                <strong style={{ color: '#444' }}>choice In-N-Out actually faced</strong>{' '}
               , and learns to rank the real site first.
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { rank: '#1', label: 'Real In-N-Out site', real: true },
                { rank: '#2', label: 'Rejected candidate: fast-food site opened nearby', real: false },
                { rank: '#3', label: 'Rejected candidate', real: false },
                { rank: '#4', label: 'Rejected candidate', real: false },
                { rank: '#5', label: 'Rejected candidate', real: false },
                { rank: '#6', label: 'Rejected candidate', real: false },
              ].map(({ rank, label, real }) => (
                <div
                  key={rank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    border: real ? `1px solid ${ACCENT}` : '1px solid #efefef',
                    background: real ? `${ACCENT}0d` : '#fafafa',
                    borderRadius: caseStudyRadius,
                    padding: real ? '14px 18px' : '9px 18px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: jakarta,
                      fontSize: real ? '15px' : '12px',
                      fontWeight: 700,
                      color: real ? ACCENT : '#b0b0b0',
                      width: '28px',
                      flexShrink: 0,
                    }}
                  >
                    {rank}
                  </span>
                  <span
                    style={{
                      fontFamily: jakarta,
                      fontSize: real ? '15px' : '13px',
                      fontWeight: real ? 700 : 400,
                      color: real ? '#111' : '#999',
                    }}
                  >
                    {label}
                  </span>
                  {real && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontFamily: jakarta,
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        background: ACCENT,
                        borderRadius: '999px',
                        padding: '4px 10px',
                      }}
                    >
                      Ground truth
                    </span>
                  )}
                </div>
              ))}
            </div>
          </VisualPanel>

          <VisualPanel
            caption={
              <>
                Four public datasets, merged into{' '}
                <strong style={{ color: '#444' }}>14 explainable features</strong> per
                candidate site.
              </>
            }
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { name: 'OpenStreetMap', sub: 'geospatial, competitors' },
                  { name: 'U.S. Census', sub: 'income, population' },
                  { name: 'LODES 8', sub: 'worker flows' },
                  { name: 'Caltrans PeMS', sub: 'daily traffic (AADT)' },
                ].map(({ name, sub }) => (
                  <div
                    key={name}
                    style={{
                      border: '1px solid #ececec',
                      background: '#fafafa',
                      borderRadius: caseStudyRadius,
                      padding: '12px 16px',
                      minWidth: '170px',
                    }}
                  >
                    <div style={{ fontFamily: jakarta, fontSize: '13.5px', fontWeight: 700, color: '#111' }}>
                      {name}
                    </div>
                    <div style={{ fontFamily: jakarta, fontSize: '11.5px', color: '#999', marginTop: '2px' }}>
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
              <span style={{ color: ACCENT, fontSize: '22px' }}>↓</span>
              <div
                style={{
                  border: `1px solid ${ACCENT}`,
                  background: `${ACCENT}0d`,
                  borderRadius: caseStudyRadius,
                  padding: '20px 28px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: jakarta, fontSize: '30px', fontWeight: 700, color: ACCENT, lineHeight: 1 }}>
                  14
                </div>
                <div style={{ fontFamily: jakarta, fontSize: '12.5px', color: '#666', marginTop: '6px', maxWidth: '260px' }}>
                  features per site: distances, income, population, flows, AADT
                </div>
              </div>
            </div>
          </VisualPanel>
        </Section>

        {/* Datathon / final deck */}
        <Section
          id="deck"
          label="Presentation"
          heading="Datathon deck: problem, approach, and results in one place."
        >
          <p style={{ ...caseStudyBody, marginBottom: '24px' }}>
            Below is the slide deck we presented for the datathon (Figma Slides).
            It walks through the narrative from the dead-end revenue ask to the
            ranking model and maps.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto',
              borderRadius: caseStudyRadius,
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
              background: '#fafafa',
              lineHeight: 0,
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '800 / 450',
              }}
            >
              <iframe
                title="Datathon 26, In-N-Out location predictor slides"
                src="https://embed.figma.com/slides/SIYvTOEJ6oBbFXRnUYAVVI/DATATHON26?node-id=139-7&embed-host=share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          </motion.div>
        </Section>

        {/* Outcome */}
        <Section
          id="outcome"
          label="Outcome"
          heading="A ranking model that predicts In-N-Out's site choices with high accuracy."
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
              { value: '88.8%', label: 'NDCG, ranking quality' },
              { value: '91%', label: 'AUC-ROC' },
              { value: '85.9%', label: 'Accuracy' },
              { value: '79.6%', label: 'F1 score' },
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
          <p style={{ ...caseStudyBody, marginBottom: '14px' }}>
            Trained on 289 In-N-Out locations × 6 sites each, for 1,734 data
            points. The model surfaces a ranked list of candidate sites and
            reads as a map, not a confusion matrix.
          </p>
          <p style={caseStudyBody}>
            Data unavailability is a problem-reframing opportunity, not a
            dead end. Businesses rarely ask &ldquo;is this good?&rdquo;
            They ask &ldquo;is this better than the alternatives?&rdquo; The
            hardest work was joining messy geospatial, census, traffic, and
            competitor data cleanly; that&apos;s where most of the value
            lived.
          </p>
        </Section>

        {/* Takeaways */}
        <Section id="takeaways" label="Reflection" heading="What I took away">
          <TakeawayCards
            accent={ACCENT}
            title=""
            items={[
              {
                title: 'A rejected data request is a reframing opportunity.',
                body: 'When In-N-Out said no, the revenue-prediction problem died, but "which site would they pick?" was answerable with public data alone.',
              },
              {
                title: 'Businesses rank, they don’t classify.',
                body: 'Real decisions are "better than the alternatives," not "good in isolation." LambdaRank matched how the decision is actually made, XGBoost put stores in the ocean.',
              },
              {
                title: 'The value lived in the joins.',
                body: 'Merging four messy public datasets cleanly, and catching a Chipotle 600km from anywhere, mattered more than model choice.',
              },
            ]}
          />
        </Section>

        <NextProjectFooter
          accent={ACCENT}
          prev={{ label: 'CHAGEE USA', href: '/work/chagee' }}
          next={{
            label: 'BCEC Brand Strategy',
            href: '/work/bcec',
            descriptor: 'Repositioning a niche club into a business-skills hub anyone can join.',
          }}
        />
      </div>
    </div>
  )
}
