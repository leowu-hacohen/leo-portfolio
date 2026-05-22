'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ObjectIcon from './ObjectIcon'

const PHRASES = [
  'Analytical by nature.',
  'Creative by trade.',
  'Product by obsession.',
]

type RingIcon = {
  name: string
  rotation: number
  top: string
  left?: string
  right?: string
  href: string
  external: boolean
  pillText: string
}

// Six icons placed symmetrically around the centered text in an outer ring.
// Layout mirrors a top / mid-side / bottom arrangement on each side.
const ringIcons: RingIcon[] = [
  {
    name: 'teacup',
    rotation: -10,
    top: '18%',
    left: '18%',
    href: '/work/chagee',
    external: false,
    pillText: 'See Case Study!',
  },
  {
    name: 'submarine',
    rotation: 8,
    top: '18%',
    right: '18%',
    href: 'https://nami.mykm.dev/',
    external: true,
    pillText: 'See Website!',
  },
  {
    name: 'briefcase',
    rotation: -6,
    top: '46%',
    left: '10%',
    href: '/work/bcec',
    external: false,
    pillText: 'See Case Study!',
  },
  {
    name: 'microphone',
    rotation: 6,
    top: '46%',
    right: '10%',
    href: 'https://lumina-lac-chi.vercel.app/',
    external: true,
    pillText: 'See Website!',
  },
  {
    name: 'headphones',
    rotation: -8,
    top: '74%',
    left: '20%',
    href: '/beats',
    external: false,
    pillText: 'Coming soon',
  },
  {
    name: 'burger',
    rotation: 10,
    top: '74%',
    right: '20%',
    href: '/work/in-n-out',
    external: false,
    pillText: 'See Case Study!',
  },
]

const ICON_SIZE = 160

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
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
  { label: 'Extras', href: '/extras' },
] as const

const SCROLL_PILL_AT = 48

export default function Hero({ fromPreHero = false }: { fromPreHero?: boolean }) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [navPill, setNavPill] = useState(false)

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
        background: '#ffffff',
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

      {/* Outer ring of icons. Each icon is a link to its experience.
          Outer motion.div: entry fade/scale.
          Inner motion.div: perpetual bobbing.
          The link wraps the icon so the whole bob area is clickable. */}
      {ringIcons.map((icon, i) => {
        const linkProps = icon.external
          ? {
              href: icon.href,
              target: '_blank' as const,
              rel: 'noopener noreferrer',
            }
          : { href: icon.href }

        const iconNode = (
          <motion.div
            whileHover={{ scale: 1.12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            style={{ display: 'inline-block', cursor: 'pointer' }}
          >
            <motion.div
              animate={{ y: [0, -10, 0, 10, 0] }}
              transition={{
                duration: 4 + (i % 3) * 0.6,
                ease: 'easeInOut',
                repeat: Infinity,
                delay: i * 0.25,
              }}
            >
              <ObjectIcon
                name={icon.name}
                rotation={icon.rotation}
                translateY={0}
                size={ICON_SIZE}
              />
            </motion.div>
          </motion.div>
        )

        return (
          <motion.div
            key={icon.name}
            initial={fromPreHero ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={fromPreHero ? {} : { duration: 0.6, ease: 'easeOut', delay: 0.15 + i * 0.07 }}
            style={{
              position: 'absolute',
              top: icon.top,
              left: icon.left,
              right: icon.right,
              zIndex: 1,
            }}
          >
            {icon.external ? (
              <a
                {...linkProps}
                data-cursor-pill={icon.pillText}
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                {iconNode}
              </a>
            ) : (
              <Link
                href={icon.href}
                data-cursor-pill={icon.pillText}
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                {iconNode}
              </Link>
            )}
          </motion.div>
        )
      })}

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
            <Link
              href="/about"
              data-cursor-pill="About me"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Leo Wu-Hacohen
            </Link>{' '}
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
        </motion.div>
      </motion.div>

      {/* Scroll down — black chevron, gentle vertical bob at bottom of hero */}
      <div
        style={{
          position: 'absolute',
          bottom: '44px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            color: '#111',
            letterSpacing: '0.01em',
            textAlign: 'center',
            lineHeight: 1.6,
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Click around to see my work!
        </p>
        <motion.div
          animate={{ y: [0, 9, 0] }}
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
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
