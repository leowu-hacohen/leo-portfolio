'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  caseStudyBody,
  caseStudyBulletChar,
  caseStudyBulletList,
  caseStudyContentMaxWidth,
  caseStudyDescriptor,
  caseStudyEyebrow,
  caseStudyJakarta,
  caseStudySectionBlock,
  caseStudySectionHeading,
  caseStudySectionLabel,
  caseStudyTitle,
} from '../../../components/caseStudyTheme'

const jakarta = caseStudyJakarta

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

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
    style={caseStudySectionBlock}
  >
    <div style={caseStudySectionLabel}>{label}</div>
    <h2 style={caseStudySectionHeading}>{heading}</h2>
    {children}
  </motion.section>
)

export default function InNOutPage() {
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
        <motion.div {...fadeUp(0.05)} style={caseStudyEyebrow}>
          Data Science · Case Study
        </motion.div>

        {/* Title */}
        <motion.h1 {...fadeUp(0.1)} style={caseStudyTitle}>
          In-N-Out Location Predictor: Data Heist 2026
        </motion.h1>

        {/* One-line description */}
        <motion.p {...fadeUp(0.15)} style={caseStudyDescriptor}>
          Reverse-engineering In-N-Out&apos;s site-selection strategy with a
          LambdaRank ML model, built in 36 hours.
        </motion.p>

        {/* Problem */}
        <Section
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
          label="My Role"
          heading="Team Member · 3-person team · 36 hours"
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
                title: 'Reframe · ranking, not classification',
                copy:
                  'Without revenue data, we asked a different question: among the sites available when In-N-Out chose, which one would they pick? For each real opening we added 5 nearby fast-food locations that opened 1-9 months later as "rejected" candidates. That approximated the actual choice In-N-Out faced, closer to how real decisions get made.',
              },
              {
                phase: '02',
                title: 'Build the dataset · 4 sources merged',
                copy:
                  'Merged OpenStreetMap (geospatial + competitors), U.S. Census Bureau (income + population), LODES 8 (worker flows, daytime vs. resident population), and Caltrans PeMS (Annual Average Daily Traffic). Engineered 14 features: distance to nearest In-N-Out, competitors, distribution center, and highway; median household income; resident vs. daytime population; worker flows; AADT. Caught and removed a Chipotle record that claimed to sit 600km from the nearest In-N-Out: a null restaurant name is harmless, a null income value is not.',
              },
              {
                phase: '03',
                title: 'Model + visualize · LightGBM LambdaRank',
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
        </Section>

        {/* Outcome */}
        <Section
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
              { value: '88.8%', label: 'NDCG · ranking quality' },
              { value: '91%', label: 'AUC-ROC' },
              { value: '85.9%', label: 'Accuracy' },
              { value: '79.6%', label: 'F1 score' },
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
            href="/work/chagee"
            style={{
              fontFamily: jakarta,
              fontSize: '14px',
              color: '#888',
              textDecoration: 'none',
            }}
          >
            ← Chagee
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
