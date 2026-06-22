'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { caseStudyRadius } from './caseStudyTheme'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

interface CardButton {
  label: string
  href: string
  primary?: boolean
  pillText?: string
}

interface CardData {
  id: string
  company: string
  meta: string
  description: string
  href: string
  icon: string
  iconRotation: number
  featured?: boolean
  pillText: string
  buttons?: CardButton[]
}

const CARDS: CardData[] = [
  {
    id: 'iheart',
    company: 'iHeartMedia',
    meta: 'Product Management Intern / Summer 2026',
    description: 'Building product inside America’s largest audio media company across iHeartRadio and broadcast properties.',
    href: '/work/iheart',
    icon: 'briefcase',
    iconRotation: 0,
    pillText: 'See Case Study!',
  },
  {
    id: 'findy',
    company: 'Findy',
    meta: 'UCI Project Teams',
    description: 'An AI guide that lives inside iOS and helps seniors use their phones without feeling overwhelmed.',
    href: '/work/findy',
    icon: 'briefcase',
    iconRotation: 0,
    pillText: 'See Case Study!',
  },
  {
    id: 'clair',
    company: 'Clair',
    meta: 'HackDavis / Anthropic Track Winner',
    description: 'A clinical AI scribe that turns the messiest part of a doctor’s day into a clean handoff.',
    href: '/work/clair',
    icon: 'briefcase',
    iconRotation: 0,
    pillText: 'See Case Study!',
  },
  {
    id: 'nami',
    company: 'Nami',
    meta: 'Fullyhacks 2026 / Hackathon Winner',
    description: 'AI college counselor that gives every student a personal advisor, built in 24 hours.',
    href: 'https://nami.mykm.dev/',
    icon: 'submarine',
    iconRotation: -15,
    pillText: 'See Website!',
  },
  {
    id: 'chagee',
    company: 'CHAGEE',
    meta: 'Product Marketing Intern',
    description: 'Driving launch strategy for a premium tea brand entering the US market.',
    href: '/work/chagee',
    icon: 'teacup',
    iconRotation: -10,
    pillText: 'See Case Study!',
  },
  {
    id: 'ai-uci',
    company: 'AI @ UCI',
    meta: 'Operations Lead',
    description: 'Website redesign for AI @ UCI · Operations Lead',
    href: 'https://ai-uci.vercel.app/',
    icon: 'briefcase',
    iconRotation: 0,
    pillText: 'See Website!',
  },
]

// ─── WorkCard ─────────────────────────────────────────────────────────────────

function WorkCard({ card, index }: { card: CardData; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isNami = card.id === 'nami'
  const isChagee = card.id === 'chagee'
  const isDesignUci = card.id === 'design-uci'
  const isFindy = card.id === 'findy'
  const isClair = card.id === 'clair'
  const isIheart = card.id === 'iheart'
  const isAiUci = card.id === 'ai-uci'
  const isExternal = /^https?:\/\//i.test(card.href)
  const hasButtons = !!card.buttons?.length

  const thumbnail = (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: caseStudyRadius,
        overflow: 'hidden',
        background: isDesignUci
          ? '#000000'
          : isNami
            ? 'linear-gradient(135deg, #05080f 0%, #0b1120 60%, #0d1528 100%)'
            : isChagee
              ? '#a82620'
              : isFindy
                ? '#eaf2ff'
                : isClair
                  ? '#ffffff'
                  : isIheart
                    ? '#c8102e'
                    : isAiUci
                      ? '#ffffff'
                      : '#f5f5f5',
      }}
    >
      <motion.div
        animate={{
          scale:
            hovered &&
            !isNami &&
            !isChagee &&
            !isDesignUci &&
            !isAiUci
              ? 1.03
              : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isNami ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              maxHeight: '90%',
              width: 'auto',
              maxWidth: '92%',
              display: 'block',
              objectFit: 'contain',
              borderRadius: caseStudyRadius,
              overflow: 'hidden',
            }}
          >
            <source src="/Nami.mp4" type="video/mp4" />
          </video>
        ) : isFindy ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source src="/case-study/findy/introslidevideo.mp4" type="video/mp4" />
          </video>
        ) : isClair ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/work-cards/clair-logo.png"
            alt="Clair"
            style={{
              maxHeight: '52%',
              width: 'auto',
              maxWidth: '72%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        ) : isIheart ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/work-cards/iheart-logo.jpeg"
            alt="iHeartMedia"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        ) : isChagee ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/work-cards/chagee-new.png"
            alt="CHAGEE"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
          />
        ) : isAiUci ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/work-cards/ai-uci.png"
            alt="AI @ UCI"
            style={{
              maxHeight: '72%',
              width: 'auto',
              maxWidth: '72%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        ) : isDesignUci ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/work-cards/design-uci.png"
            alt="Design at UCI"
            style={{
              maxHeight: '88%',
              width: 'auto',
              maxWidth: '88%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/icons/${card.icon}.svg`}
            alt=""
            width={80}
            height={80}
            style={{
              width: '80px',
              height: '80px',
              display: 'block',
              transform: `rotate(${card.iconRotation}deg)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )

  const cardBody = (
    <div style={{ padding: '18px 0 0' }}>
      {/* Company title + meta on the same baseline row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: '24px',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            fontFamily: jakarta,
            fontSize: card.featured ? '26px' : '22px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            minWidth: 0,
          }}
        >
          {card.company}
        </div>

        <div
          style={{
            fontFamily: instrument,
            fontSize: '13px',
            fontWeight: 500,
            color: '#666',
            letterSpacing: '0.01em',
            textAlign: 'right',
            lineHeight: 1.2,
            flexShrink: 0,
          }}
        >
          {card.meta}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}
      >
        <div
          style={{
            fontFamily: jakarta,
            fontSize: '14px',
            fontWeight: 400,
            color: '#111',
            lineHeight: 1.6,
            maxWidth: card.featured && !hasButtons ? '520px' : undefined,
          }}
        >
          {card.description}
        </div>

      {hasButtons && (
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          {card.buttons!.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-pill={btn.pillText ?? btn.label}
              style={{
                fontFamily: jakarta,
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.01em',
                textDecoration: 'none',
                padding: '10px 24px',
                border: '1px solid #111',
                borderRadius: '999px',
                background: btn.primary ? '#111' : 'transparent',
                color: btn.primary ? '#fff' : '#111',
                cursor: 'pointer',
                transition: 'background 0.18s ease, color 0.18s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                if (!btn.primary) {
                  e.currentTarget.style.background = '#111'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={(e) => {
                if (!btn.primary) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#111'
                }
              }}
            >
              {btn.label}
            </a>
          ))}
        </div>
      )}
      </div>
    </div>
  )

  const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 20,
        delay: (index % 2) * 0.1,
      }}
      style={card.featured ? { gridColumn: '1 / -1' } : undefined}
    >
      {hasButtons ? (
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <a
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-pill={card.pillText}
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            {thumbnail}
          </a>
          {cardBody}
        </motion.div>
      ) : isExternal ? (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-pill={card.pillText}
          style={linkStyle}
        >
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {thumbnail}
            {cardBody}
          </motion.div>
        </a>
      ) : (
        <Link
          href={card.href}
          data-cursor-pill={card.pillText}
          style={linkStyle}
        >
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            {thumbnail}
            {cardBody}
          </motion.div>
        </Link>
      )}
    </motion.div>
  )
}

// ─── WorkGrid ─────────────────────────────────────────────────────────────────

export default function WorkGrid() {
  return (
    <section
      id="work"
      style={{
        width: '100%',
        padding: '80px 40px 120px',
        background: '#F4F4F4',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '40px',
          width: '100%',
          margin: 0,
        }}
      >
        {CARDS.map((card, i) => (
          <WorkCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
