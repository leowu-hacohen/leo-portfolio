'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ObjectIcon from './ObjectIcon'
import { heroRingIcons, type HeroRingIcon } from './heroRingIcons'
import { caseStudyRadius } from './caseStudyTheme'

const PHRASES = [
  'Analytical by nature.',
  'Creative by trade.',
  'Product by obsession.',
]

const ICON_SIZE = 140

// `delayChildren` lets the centered text start AFTER the icons have begun
// fading in, so the sequence reads as: icons-arrive → text-arrives, without
// a perceptible dead frame between them.
const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.22, staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

/** Little app-style logo tile for the proof strip (Brian Yang-style chip). */
function LogoChip({ src, label }: { src: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '26px',
        height: '26px',
        background: '#efefef',
        borderRadius: '7px',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        style={{ width: '16px', height: '16px', objectFit: 'contain', display: 'block' }}
      />
    </span>
  )
}

const displayStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jakarta), sans-serif',
  fontSize: '38px',
  fontWeight: 700,
  color: '#111111',
  lineHeight: 1.15,
  letterSpacing: '-0.03em',
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '#work' },
  { label: 'Playground', href: '/playground' },
] as const

const SCROLL_PILL_AT = 48

/**
 * One draggable, springy product icon with a hover identity label.
 * Dragging suppresses the navigation click on release.
 */
function RingIcon({ icon, index }: { icon: HeroRingIcon; index: number }) {
  const [hovered, setHovered] = useState(false)
  const wasDragged = useRef(false)

  const linkStyle: React.CSSProperties = {
    display: 'inline-block',
    textDecoration: 'none',
  }

  const iconNode = (
    <motion.div
      drag
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 320, bounceDamping: 14 }}
      dragElastic={0.35}
      whileHover={{ scale: 1.12 }}
      whileDrag={{ scale: 1.15, rotate: icon.rotation * -0.6 }}
      onDragStart={() => {
        wasDragged.current = true
      }}
      onDragEnd={() => {
        setTimeout(() => {
          wasDragged.current = false
        }, 120)
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 18 }}
      style={{ display: 'inline-block', cursor: 'grab', position: 'relative' }}
    >
      <motion.div
        animate={{ y: [0, -10, 0, 10, 0] }}
        transition={{
          duration: 4 + (index % 3) * 0.6,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: index * 0.25,
        }}
      >
        <div
          style={{
            background: icon.introBackdrop,
            borderRadius: icon.introBackdrop ? caseStudyRadius : undefined,
            padding: icon.introBackdrop ? '12px' : undefined,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ObjectIcon
            name={icon.name}
            ext={icon.ext}
            rotation={icon.rotation}
            translateY={0}
            size={
              icon.introBackdrop
                ? Math.round(ICON_SIZE * (icon.scale ?? 1) * 0.82)
                : Math.round(ICON_SIZE * (icon.scale ?? 1))
            }
          />
        </div>

        {/* Hover identity label */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 2px)',
                left: '50%',
                x: '-50%',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,0,0,0.07)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.10)',
                borderRadius: '12px',
                padding: '8px 14px',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jakarta), sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#111',
                  lineHeight: 1.3,
                }}
              >
                {icon.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jakarta), sans-serif',
                  fontSize: '11.5px',
                  fontWeight: 400,
                  color: '#888',
                  lineHeight: 1.3,
                }}
              >
                {icon.sub}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )

  const handleClick = (e: React.MouseEvent) => {
    if (wasDragged.current) e.preventDefault()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 + index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: icon.top,
        left: icon.left,
        right: icon.right,
        zIndex: hovered ? 5 : 1,
      }}
    >
      {icon.external ? (
        <a
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-pill={icon.pillText}
          draggable={false}
          onClick={handleClick}
          style={linkStyle}
        >
          {iconNode}
        </a>
      ) : (
        <Link
          href={icon.href}
          data-cursor-pill={icon.pillText}
          draggable={false}
          onClick={handleClick}
          style={linkStyle}
        >
          {iconNode}
        </Link>
      )}
    </motion.div>
  )
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [navPill, setNavPill] = useState(false)
  const [nameHover, setNameHover] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex(i => (i + 1) % PHRASES.length)
    }, 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => setNavPill(window.scrollY > SCROLL_PILL_AT)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#F4F4F4',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top nav: fixed so it stays while scrolling. Past ~48px scroll it becomes
          a glass pill (blur, shadow, rounded). */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
        }}
      >
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundColor: navPill
              ? 'rgba(255, 255, 255, 0.86)'
              : 'rgba(255, 255, 255, 0)',
            boxShadow: navPill
              ? '0 2px 12px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.05)'
              : '0 0 0 rgba(0,0,0,0)',
            paddingLeft: navPill ? 20 : 4,
            paddingRight: navPill ? 20 : 4,
            paddingTop: navPill ? 10 : 2,
            paddingBottom: navPill ? 10 : 2,
          }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: navPill ? 28 : 40,
            borderRadius: 9999,
            border: navPill ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
            backdropFilter: navPill ? 'blur(14px) saturate(1.2)' : 'none',
            WebkitBackdropFilter: navPill ? 'blur(14px) saturate(1.2)' : 'none',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              data-cursor-pill={label}
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
                fontSize: '13px',
                fontWeight: 400,
                color: '#111',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.25s ease',
              }}
            >
              {label}
            </Link>
          ))}
        </motion.nav>
      </div>

      {/* Ring of draggable product icons — each links to its experience and
          shows an identity label on hover. */}
      {heroRingIcons.map((icon, i) => (
        <RingIcon key={icon.name} icon={icon} index={i} />
      ))}

      {/* Centered text block.
          The wrapper is pointer-events: none so the empty flex area doesn't
          block clicks on the icons. Inner card uses pointer events + hover. */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          variants={item}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 28px',
            borderRadius: '20px',
            margin: -4,
            cursor: 'default',
          }}
        >
          <div
            style={{
              ...displayStyle,
              marginBottom: '8px',
            }}
          >
            <span
              onMouseEnter={() => setNameHover(true)}
              onMouseLeave={() => setNameHover(false)}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              <Link
                href="/about"
                data-cursor-pill="About me"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Leo Wu-Hacohen
              </Link>
              <AnimatePresence>
                {nameHover && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 14px)',
                      left: '50%',
                      x: '-50%',
                      width: '180px',
                      height: '200px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 18px 48px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)',
                      pointerEvents: 'none',
                      zIndex: 10,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/aboutme/Ver1.JPG"
                      alt="Leo"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>{' '}
            is a PM
          </div>

          <div
            style={{
              position: 'relative',
              minHeight: '44px',
              width: '100%',
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  ...displayStyle,
                  whiteSpace: 'nowrap',
                }}
              >
                {PHRASES[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Proof strip — lowercase line with logo chips, Brian Yang-style */}
          <motion.div
            variants={item}
            style={{
              fontFamily: 'var(--font-jakarta), sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: '#111',
              letterSpacing: '0.005em',
              marginTop: '18px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              flexWrap: 'wrap',
            }}
          >
            <span>ambassador @</span>
            <LogoChip src="/logos/google-g.svg" label="Google" />
            <span>, prev pm @</span>
            <LogoChip src="/icons/iheart.png" label="iHeartMedia" />
            <span>,</span>
            <LogoChip src="/logos/claude.svg" label="Anthropic" />
            <span>hackathon winner</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll down — black chevron, gentle vertical bob at bottom of hero.
          Fades in after the centered text so the whole hero settles together.
          We animate `y` here, so centering is done via `x: '-50%'` rather than
          a CSS transform (which framer-motion's transform would clobber). */}
      <motion.div
        initial={{ opacity: 0, y: 12, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.55 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          zIndex: 3,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <motion.p
          animate={{ opacity: [0.72, 1, 0.72] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: '17px',
            fontWeight: 600,
            color: '#111',
            letterSpacing: '0.02em',
            textAlign: 'center',
            lineHeight: 1.4,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Click around to see my work!
        </motion.p>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 1.25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Link
            href="#work"
            scroll
            data-cursor-pill="Scroll to see work!"
            aria-label="Scroll to see work"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#111111',
              textDecoration: 'none',
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
