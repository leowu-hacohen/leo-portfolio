'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

const jakarta = 'var(--font-jakarta), sans-serif'

interface CardData {
  id: string
  company: string
  meta: string
  description: string
  href: string
  icon: string
  iconRotation: number
  featured?: boolean
  badge?: string
  pillText: string
}

const CARDS: CardData[] = [
  {
    id: 'nami',
    company: 'Nami',
    meta: 'Fullyhacks 2026 · Hackathon Winner',
    description: 'AI college counselor that gives every student a personal advisor, built in 24 hours.',
    href: 'https://nami.mykm.dev/',
    icon: 'submarine',
    iconRotation: -15,
    featured: true,
    badge: '1st Place',
    pillText: 'See Website!',
  },
  {
    id: 'beats',
    company: 'Beats by Dre',
    meta: 'Data Analytics Extern',
    description: 'Surfacing consumer listening patterns to inform product and brand strategy.',
    href: '/beats',
    icon: 'headphones',
    iconRotation: 12,
    pillText: 'See Case Study!',
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
    id: 'lumina',
    company: 'Lumina',
    meta: 'Voice AI · Solo Build',
    description: 'A voice-first AI tool designed to help people think out loud and get unstuck.',
    href: 'https://lumina-lac-chi.vercel.app/',
    icon: 'microphone',
    iconRotation: 8,
    pillText: 'See Website!',
  },
  {
    id: 'in-n-out',
    company: 'In-N-Out',
    meta: 'DataThon 2026 · ML Project',
    description: 'ML model predicting In-N-Out location performance using foot traffic data.',
    href: '/work/in-n-out',
    icon: 'burger',
    iconRotation: -12,
    pillText: 'See Case Study!',
  },
  {
    id: 'bcec',
    company: 'BCEC',
    meta: 'VP of Marketing',
    description: "Led marketing strategy for UCI's premier business consulting club.",
    href: '/work/bcec',
    icon: 'briefcase',
    iconRotation: 10,
    pillText: 'See Case Study!',
  },
]

// ─── WorkCard ─────────────────────────────────────────────────────────────────

function WorkCard({ card, index }: { card: CardData; index: number }) {
  const [hovered, setHovered] = useState(false)
  const imageH = card.featured ? 360 : 260
  const isExternal = /^https?:\/\//i.test(card.href)

  const cardInner = (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -6 : 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${imageH}px`,
          overflow: 'hidden',
          borderRadius: '12px',
          background: '#f5f5f5',
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
        </motion.div>

        {card.badge && (
          <span
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              fontFamily: jakarta,
              fontSize: '11px',
              fontWeight: 600,
              color: '#111',
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              borderRadius: '999px',
              padding: '4px 10px',
              letterSpacing: '0.04em',
            }}
          >
            {card.badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ paddingTop: '18px' }}>
        <div
          style={{
            fontFamily: jakarta,
            fontSize: '11px',
            fontWeight: 500,
            color: '#999',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}
        >
          {card.meta}
        </div>

        <div
          style={{
            fontFamily: jakarta,
            fontSize: card.featured ? '26px' : '22px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: '8px',
          }}
        >
          {card.company}
        </div>

        <div
          style={{
            fontFamily: jakarta,
            fontSize: '14px',
            fontWeight: 400,
            color: '#666',
            lineHeight: 1.6,
            maxWidth: card.featured ? '520px' : undefined,
          }}
        >
          {card.description}
        </div>
      </div>
    </motion.div>
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
      {isExternal ? (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-pill={card.pillText}
          style={linkStyle}
        >
          {cardInner}
        </a>
      ) : (
        <Link
          href={card.href}
          data-cursor-pill={card.pillText}
          style={linkStyle}
        >
          {cardInner}
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
        padding: '80px 7vw',
        background: '#ffffff',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '48px',
        }}
      >
        <span
          style={{
            fontFamily: jakarta,
            fontSize: '11px',
            fontWeight: 500,
            color: '#999',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
        >
          Selected Work
        </span>
        <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }} />
      </motion.div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
      >
        {CARDS.map((card, i) => (
          <WorkCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
