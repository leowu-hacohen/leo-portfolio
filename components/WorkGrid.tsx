'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import LuminaOrb from './LuminaOrb'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument), Helvetica Neue, Helvetica, Arial, sans-serif'

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
  badge?: string
  pillText: string
  buttons?: CardButton[]
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
    buttons: [
      { label: 'View Devpost', href: 'https://devpost.com/software/advisr', pillText: 'View Devpost' },
      { label: 'View Website', href: 'https://nami.mykm.dev/', primary: true, pillText: 'See Website!' },
    ],
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
  const isNami = card.id === 'nami'
  const imageH = isNami ? 500 : undefined
  const isBeats = card.id === 'beats'
  const isChagee = card.id === 'chagee'
  const isLumina = card.id === 'lumina'
  const isInNOut = card.id === 'in-n-out'
  const isBcec = card.id === 'bcec'
  const isDesignUci = card.id === 'design-uci'
  const isExternal = /^https?:\/\//i.test(card.href)
  const hasButtons = !!card.buttons?.length

  const thumbnail = (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: imageH ? `${imageH}px` : undefined,
        aspectRatio: isNami ? undefined : '4/3',
        borderRadius: '0px',
        overflow: isChagee ? 'visible' : 'hidden',
        ...(isDesignUci
          ? { background: '#000000' }
          : isNami
          ? {
              background: 'linear-gradient(135deg, #05080f 0%, #0b1120 60%, #0d1528 100%)',
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
              borderRadius: '0px',
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
              maxHeight: '96%',
              width: 'auto',
              maxWidth: '96%',
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
  )

  const cardBody = (
    <div
      style={{
        paddingTop: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '32px',
      }}
    >
      {/* Left: text */}
      <div>
        <div
          style={{
            fontFamily: instrument,
            fontSize: '11px',
            fontWeight: 500,
            color: '#111',
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
            color: '#111',
            lineHeight: 1.6,
            maxWidth: card.featured && !hasButtons ? '520px' : undefined,
          }}
        >
          {card.description}
        </div>
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
        padding: '80px 7vw',
        background: '#ffffff',
      }}
    >
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
