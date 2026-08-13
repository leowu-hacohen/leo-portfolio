'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import { caseStudyRadius } from '../../components/caseStudyTheme'

const jakarta = 'var(--font-jakarta), sans-serif'
const instrument = 'var(--font-instrument-serif), Georgia, "Times New Roman", serif'

// ─── Field data ───────────────────────────────────────────────────────────────
// Positions are offsets from the center of the viewport, in px.
// depth controls parallax: higher = closer = moves more when you pan.

type FieldProject = {
  id: string
  name: string
  tag: string
  caption: string
  accent: string
  x: number
  y: number
  w: number
  rot: number
  depth: number
  href?: string
  linkLabel?: string
  img?: string
}

const PROJECTS: FieldProject[] = [
  {
    id: 'brew',
    img: '/playground/brew.png',
    name: 'brew',
    tag: 'Full-stack app',
    caption:
      'A keepsake app for coffee chats, so I never lose track of who taught me what (people, quotes, notes, all of it).',
    accent: '#8a5a3b',
    x: -160,
    y: -120,
    w: 330,
    rot: -2,
    depth: 1.1,
  },
  {
    id: 'among-us-irl',
    img: '/playground/among-us-irl.png',
    name: 'Among Us IRL',
    tag: 'Party game',
    caption:
      'Among Us for house parties. Phones run the tasks, Supabase realtime runs the chaos.',
    accent: '#c51111',
    x: -240,
    y: -330,
    w: 300,
    rot: -4,
    depth: 1.0,
  },
  {
    id: 'ai-uci',
    img: '/playground/ai-uci.png',
    name: 'AI @ UCI',
    tag: 'Club site',
    caption: 'The website I built for Artificial Intelligence @ UCI.',
    accent: '#2563eb',
    x: 340,
    y: -420,
    w: 280,
    rot: 3,
    depth: 0.85,
  },
  {
    id: 'zotpath',
    img: '/playground/zotpath.png',
    name: 'ZotPath',
    tag: 'Tool',
    caption:
      'A local-first GPA planner that reads your syllabi so you don’t have to. Everything but the file parsing runs right in the browser.',
    accent: '#0064a4',
    x: 640,
    y: -80,
    w: 300,
    rot: 5,
    depth: 0.9,
  },
  {
    id: 'iheart-routing',
    name: 'iHeart routing',
    tag: 'PM work',
    caption:
      'Routing work from my product summer at iHeartMedia. The full story lands with the case study.',
    accent: '#c8102e',
    x: -620,
    y: 230,
    w: 285,
    rot: 2,
    depth: 0.8,
    href: '/work/iheart',
    linkLabel: 'the case study →',
  },
  {
    id: 'code-quest',
    img: '/playground/code-quest.png',
    name: 'CodeQuest',
    tag: 'Desktop app',
    caption:
      'Duolingo × LeetCode for Python OOP, living in a little Electron app on my desktop.',
    accent: '#58a700',
    x: 200,
    y: 330,
    w: 300,
    rot: -5,
    depth: 1.05,
  },
  {
    id: 'lumina',
    img: '/playground/lumina.png',
    name: 'Lumina',
    tag: 'Voice AI',
    caption:
      'Four voice agents built in one day, helping students switch contexts without losing the thread.',
    accent: '#7c5cff',
    x: 690,
    y: 350,
    w: 300,
    rot: -3,
    depth: 1.2,
  },
]

const GLYPHS = [
  { char: '✦', x: -420, y: -480, size: 26, depth: 0.6, o: 0.28 },
  { char: '✿', x: 80, y: -260, size: 20, depth: 0.7, o: 0.22 },
  { char: '✳', x: -880, y: -60, size: 30, depth: 0.5, o: 0.2 },
  { char: '✦', x: 520, y: 200, size: 18, depth: 1.35, o: 0.3 },
  { char: '✽', x: -300, y: 420, size: 24, depth: 1.25, o: 0.22 },
  { char: '✳', x: 960, y: -320, size: 22, depth: 0.65, o: 0.2 },
  { char: '✿', x: -80, y: 560, size: 26, depth: 0.75, o: 0.24 },
]

const PAN_X = 720
const PAN_Y = 480
const clamp = (v: number, lim: number) => Math.max(-lim, Math.min(lim, v))

// ─── Layers ───────────────────────────────────────────────────────────────────

function ParallaxLayer({
  px,
  py,
  depth,
  children,
  zIndex = 1,
}: {
  px: MotionValue<number>
  py: MotionValue<number>
  depth: number
  children: React.ReactNode
  zIndex?: number
}) {
  const x = useTransform(px, (v) => v * depth)
  const y = useTransform(py, (v) => v * depth)
  return (
    <motion.div style={{ position: 'absolute', inset: 0, x, y, zIndex, pointerEvents: 'none' }}>
      {children}
    </motion.div>
  )
}

function ProjectCard({
  item,
  px,
  py,
  delay,
}: {
  item: FieldProject
  px: MotionValue<number>
  py: MotionValue<number>
  delay: number
}) {
  const x = useTransform(px, (v) => v * item.depth)
  const y = useTransform(py, (v) => v * item.depth)
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        x,
        y,
        width: item.w,
        marginLeft: -item.w / 2,
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: item.rot * 2.4 }}
        animate={{ opacity: 1, scale: 1, rotate: item.rot }}
        transition={{ type: 'spring', stiffness: 170, damping: 15, delay }}
        drag
        dragMomentum
        dragTransition={{ power: 0.16, timeConstant: 180 }}
        dragElastic={0.2}
        whileHover={{
          scale: 1.045,
          rotate: 0,
          boxShadow: `0 26px 60px ${item.accent}2e`,
        }}
        whileDrag={{ scale: 1.09, rotate: 0, boxShadow: `0 34px 80px ${item.accent}40` }}
        onPointerDown={(e) => e.stopPropagation()}
        data-cursor-pill={item.name}
        style={{
          background: '#ffffff',
          border: '1px solid #ececec',
          borderRadius: caseStudyRadius,
          padding: '20px 22px',
          boxShadow: `0 ${10 + item.depth * 8}px ${26 + item.depth * 16}px rgba(0,0,0,0.08)`,
          cursor: 'grab',
        }}
      >
        {item.img && (
          <div
            style={{
              borderRadius: '3px',
              overflow: 'hidden',
              border: '1px solid #ececec',
              marginBottom: '14px',
              aspectRatio: '16 / 10',
              background: '#fafafa',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={`${item.name} screenshot`}
              draggable={false}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: '2px',
              background: item.accent,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: jakarta,
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: item.accent,
            }}
          >
            {item.tag}
          </span>
        </div>
        <div
          style={{
            fontFamily: jakarta,
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: '#111',
            marginBottom: '8px',
          }}
        >
          {item.name}
        </div>
        <p
          style={{
            fontFamily: jakarta,
            fontSize: '13.5px',
            color: '#555',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {item.caption}
        </p>
        {item.href && (
          <Link
            href={item.href}
            draggable={false}
            style={{
              display: 'inline-block',
              marginTop: '12px',
              fontFamily: jakarta,
              fontSize: '13px',
              fontWeight: 600,
              color: item.accent,
              textDecoration: 'none',
            }}
          >
            {item.linkLabel}
          </Link>
        )}
      </motion.div>
    </motion.div>
  )
}

function StickerCard({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const x = useTransform(px, (v) => v * 1.15)
  const y = useTransform(py, (v) => v * 1.15)
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 'calc(50% + 560px)',
        top: 'calc(50% - 420px)',
        x,
        y,
        width: 210,
        marginLeft: -105,
        zIndex: 9,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: 14 }}
        animate={{ opacity: 1, scale: 1, rotate: 7 }}
        transition={{ type: 'spring', stiffness: 170, damping: 15, delay: 0.55 }}
        drag
        dragMomentum
        dragTransition={{ power: 0.16, timeConstant: 180 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileDrag={{ scale: 1.09, rotate: 0 }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          border: '1px solid #ececec',
          borderRadius: caseStudyRadius,
          padding: '12px 12px 14px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.09)',
          cursor: 'grab',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/case-study/findy/lil-finder-guy.png"
          alt="Findy sticker sheet"
          draggable={false}
          style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
        />
        <div
          style={{
            fontFamily: instrument,
            fontSize: '12.5px',
            color: '#888',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          Findy&apos;s sticker sheet (he gets around)
        </div>
      </motion.div>
    </motion.div>
  )
}

function NoteCard({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const x = useTransform(px, (v) => v * 0.95)
  const y = useTransform(py, (v) => v * 0.95)
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: 'calc(50% - 420px)',
        top: 'calc(50% + 470px)',
        x,
        y,
        width: 210,
        marginLeft: -105,
        zIndex: 9,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -6 }}
        transition={{ type: 'spring', stiffness: 170, damping: 15, delay: 0.7 }}
        drag
        dragMomentum
        dragTransition={{ power: 0.16, timeConstant: 180 }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileDrag={{ scale: 1.09, rotate: 0 }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          background: '#fff8c9',
          borderRadius: caseStudyRadius,
          padding: '22px 20px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
          cursor: 'grab',
        }}
      >
        <p
          style={{
            fontFamily: instrument,
            fontStyle: 'italic',
            fontSize: '16.5px',
            color: '#6b5d1e',
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          this field grows as I build. more toys soon :)
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlaygroundPage() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 110, damping: 22, mass: 0.6 })
  const py = useSpring(rawY, { stiffness: 110, damping: 22, mass: 0.6 })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#F4F4F4',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        fontFamily: jakarta,
      }}
    >
      {/* Pannable field */}
      <motion.div
        onPan={(_, info) => {
          rawX.set(clamp(rawX.get() + info.delta.x, PAN_X))
          rawY.set(clamp(rawY.get() + info.delta.y, PAN_Y))
        }}
        onWheel={(e) => {
          rawX.set(clamp(rawX.get() - e.deltaX, PAN_X))
          rawY.set(clamp(rawY.get() - e.deltaY, PAN_Y))
        }}
        style={{
          position: 'absolute',
          inset: 0,
          touchAction: 'none',
          cursor: 'grab',
        }}
      >
        {/* Dot grid, deepest layer */}
        <ParallaxLayer px={px} py={py} depth={0.35} zIndex={0}>
          <div
            style={{
              position: 'absolute',
              inset: '-1200px',
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.10) 1.2px, transparent 1.2px)',
              backgroundSize: '30px 30px',
            }}
          />
        </ParallaxLayer>

        {/* Floating glyphs */}
        {GLYPHS.map((g, i) => (
          <ParallaxLayer key={i} px={px} py={py} depth={g.depth} zIndex={2}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: g.o, y: [0, -10, 0] }}
              transition={{
                opacity: { delay: 0.9 + i * 0.08, duration: 0.8 },
                y: { duration: 3.4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                position: 'absolute',
                left: `calc(50% + ${g.x}px)`,
                top: `calc(50% + ${g.y}px)`,
                fontSize: g.size,
                color: '#111',
              }}
            >
              {g.char}
            </motion.span>
          </ParallaxLayer>
        ))}

        {/* Project cards */}
        {PROJECTS.map((item, i) => (
          <ProjectCard key={item.id} item={item} px={px} py={py} delay={0.15 + i * 0.07} />
        ))}
        <StickerCard px={px} py={py} />
        <NoteCard px={px} py={py} />
      </motion.div>

      {/* Fixed nav */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 7vw',
          background: 'rgba(244,244,244,0.55)',
          backdropFilter: 'blur(18px) saturate(140%)',
          WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        }}
      >
        <Link
          href="/"
          data-cursor-pill="Back"
          style={{ fontFamily: jakarta, fontSize: '13px', color: '#666', textDecoration: 'none' }}
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
                color: label === 'Playground' ? '#111' : '#888',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Title overlay */}
      <div
        style={{
          position: 'absolute',
          top: '92px',
          left: '7vw',
          zIndex: 40,
          pointerEvents: 'none',
          maxWidth: '380px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: instrument, fontSize: '13px', color: '#888', marginBottom: '10px' }}
        >
          Playground
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: jakarta,
            fontSize: '26px',
            fontWeight: 700,
            letterSpacing: '-0.015em',
            lineHeight: 1.25,
            color: '#111',
            margin: 0,
          }}
        >
          Things I&apos;ve built, scattered on a table.
        </motion.h1>
      </div>

      {/* Hint pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        style={{
          position: 'absolute',
          bottom: '26px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          pointerEvents: 'none',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid #e8e8e8',
          borderRadius: '999px',
          padding: '9px 18px',
          fontFamily: jakarta,
          fontSize: '12.5px',
          color: '#666',
          whiteSpace: 'nowrap',
        }}
      >
        drag the field · toss the cards
      </motion.div>
    </div>
  )
}
