'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import LuminaOrb from './LuminaOrb'

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
    pillText: 'Coming soon',
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
  {
    id: 'design-uci',
    company: 'Design @ UCI',
    meta: 'Product Team · UCI',
    description:
      'Student org bringing design education and community to campus — case study in progress.',
    href: '/work/design-uci',
    icon: 'briefcase',
    iconRotation: 0,
    pillText: 'Coming soon',
  },
]

// ─── WorkCard ─────────────────────────────────────────────────────────────────

function WorkCard({ card, index }: { card: CardData; index: number }) {
  const [hovered, setHovered] = useState(false)
  const imageH =
    card.id === 'nami' ? 500 : card.featured ? 360 : 260
  const isNami = card.id === 'nami'
  const isBeats = card.id === 'beats'
  const isChagee = card.id === 'chagee'
  const isLumina = card.id === 'lumina'
  const isInNOut = card.id === 'in-n-out'
  const isBcec = card.id === 'bcec'
  const isDesignUci = card.id === 'design-uci'
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
          borderRadius: '12px',
          overflow: isChagee ? 'visible' : 'hidden',
          ...(isDesignUci
            ? { background: '#000000' }
            : isNami
            ? {
                backgroundImage: 'url(/work-cards/namibackdrop.png)',
                backgroundSize: 'cover',
                /* Anchor top-left: strongest left + up shift for cover; tweak % if a sliver looks off */
                backgroundPosition: '0% 0%',
                backgroundRepeat: 'no-repeat',
              }
            : {
                background: isBeats
                  ? '#000000'
                  : isInNOut
                    ? '#fff4e0'
                    : isChagee
                      ? '#f4efe8'
                      : isLumina
                        ? '#f0f2f6'
                        : isBcec
                          ? '#91a0c0'
                          : '#f5f5f5',
              }),
        }}
      >
        <motion.div
          animate={{
            scale:
              hovered &&
              !isNami &&
              !isBeats &&
              !isChagee &&
              !isLumina &&
              !isInNOut &&
              !isBcec &&
              !isDesignUci
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
                maxHeight: '420px',
                width: 'auto',
                maxWidth: '90%',
                display: 'block',
                objectFit: 'contain',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <source src="/Nami.mp4" type="video/mp4" />
            </video>
          ) : isBeats ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/work-cards/beats-logo.png"
              alt="Beats by Dre"
              style={{
                maxHeight: '58%',
                width: 'auto',
                maxWidth: '60%',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          ) : isChagee ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/work-cards/chageenew.png"
              alt=""
              style={{
                maxHeight: '88%',
                width: 'auto',
                maxWidth: '82%',
                display: 'block',
                objectFit: 'contain',
                transform: 'scale(2.5)',
                transformOrigin: 'center center',
              }}
            />
          ) : isLumina ? (
            <LuminaOrb size={112} />
          ) : isInNOut ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/work-cards/in-n-out-location-predictor-logo.png"
              alt="In-N-Out Location Predictor"
              style={{
                maxHeight: '90%',
                width: 'auto',
                maxWidth: '92%',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          ) : isBcec ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/work-cards/bceclogo.png"
              alt="BCEC"
              style={{
                maxHeight: '88%',
                width: 'auto',
                maxWidth: '88%',
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

        {card.badge && (
          <span
            style={
              isNami
                ? {
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    zIndex: 2,
                    fontFamily: jakarta,
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#0d0d0f',
                    letterSpacing: '0.05em',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 45%, rgba(255,255,255,0.9) 100%)',
                    backdropFilter: 'blur(12px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                    border: '1px solid rgba(255,255,255,0.95)',
                    boxShadow: `
                      0 2px 4px rgba(0,0,0,0.12),
                      0 6px 20px rgba(0,0,0,0.1),
                      0 1px 0 rgba(255,255,255,0.85) inset
                    `,
                    textShadow: '0 1px 0 rgba(255,255,255,0.9)',
                  }
                : {
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
                  }
            }
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
