export type HeroRingIcon = {
  name: string
  ext?: 'svg' | 'png'
  rotation: number
  scale?: number
  top: string
  left?: string
  right?: string
  href: string
  external: boolean
  pillText: string
  /** Dark pad behind logo in PreHero intro (light page bg). */
  introBackdrop?: string
}

/** Shared by Hero ring + PreHero intro — keep in sync. */
export const heroRingIcons: HeroRingIcon[] = [
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
    name: 'findy',
    ext: 'png',
    rotation: -6,
    top: '46%',
    left: '10%',
    href: '/work/findy',
    external: false,
    pillText: 'See Case Study!',
  },
  {
    name: 'clair',
    ext: 'png',
    rotation: 6,
    top: '46%',
    right: '10%',
    href: '/work/clair',
    external: false,
    pillText: 'See Case Study!',
  },
  {
    name: 'iheart',
    ext: 'png',
    rotation: -8,
    scale: 0.75,
    top: '74%',
    left: '20%',
    href: '/work/iheart',
    external: false,
    pillText: 'See Case Study!',
  },
  {
    name: 'ai-uci',
    ext: 'png',
    rotation: 10,
    scale: 0.85,
    top: '74%',
    right: '20%',
    href: 'https://ai-uci.vercel.app/',
    external: true,
    pillText: 'See Website!',
  },
]
