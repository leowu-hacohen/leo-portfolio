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
    name: 'headphones',
    rotation: -8,
    top: '18%',
    left: '18%',
    href: '/beats',
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
    name: 'teacup',
    rotation: -10,
    top: '74%',
    left: '20%',
    href: '/work/chagee',
    external: false,
    pillText: 'See Case Study!',
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

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex(i => (i + 1) % PHRASES.length)
    }, 1800)
    return () => clearInterval(id)
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
      {/* Nav locked to the top-center of the viewport.
          Outer div handles absolute positioning + horizontal centering (translateX -50%);
          inner motion.nav handles fade/slide-in without clobbering the transform. */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {(
            [
              { label: 'About',  href: '/about' },
              { label: 'Work',   href: '#work' },
              { label: 'Extras', href: '/extras' },
            ] as const
          ).map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--font-jakarta), sans-serif',
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
        )

        return (
          <motion.div
            key={icon.name}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 + i * 0.07 }}
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
          block clicks on the icons sitting behind it. The actual text spans
          re-enable pointer events on themselves. */}
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
          style={{ ...displayStyle, marginBottom: '8px', pointerEvents: 'auto' }}
        >
          Leo Wu-Hacohen is a PM
        </motion.div>

        <motion.div
          variants={item}
          style={{
            position: 'relative',
            width: '100%',
            height: '44px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
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
                pointerEvents: 'auto',
              }}
            >
              {PHRASES[phraseIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
