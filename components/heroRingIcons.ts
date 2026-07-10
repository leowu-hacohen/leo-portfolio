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
  /** Product name shown in the hover label pill */
  label: string
  /** One-line credibility/context under the label */
  sub: string
  /** Dark pad behind logo in PreHero intro (light page bg). */
  introBackdrop?: string
}

/** Shared by Hero ring + PreHero intro, keep in sync. */
export const heroRingIcons: HeroRingIcon[] = [
  {
    name: 'teacup',
    rotation: -10,
    top: '15%',
    left: '20%',
    href: '/work/chagee',
    external: false,
    pillText: 'See Case Study!',
    label: 'CHAGEE',
    sub: 'Product Marketing Intern',
  },
  {
    name: 'submarine',
    rotation: 8,
    top: '15%',
    right: '20%',
    href: 'https://nami.mykm.dev/',
    external: true,
    pillText: 'See Website!',
    label: 'Nami',
    sub: 'Fullyhacks 2026 winner',
  },
  {
    name: 'findy',
    ext: 'png',
    rotation: -6,
    top: '44%',
    left: '9%',
    href: '/work/findy',
    external: false,
    pillText: 'See Case Study!',
    label: 'Findy',
    sub: 'UCI Project Teams winner',
  },
  {
    name: 'clair',
    ext: 'png',
    rotation: 6,
    top: '44%',
    right: '9%',
    href: '/work/clair',
    external: false,
    pillText: 'See Case Study!',
    label: 'Clair',
    sub: 'HackDavis, Anthropic winner',
  },
  {
    name: 'iheart',
    ext: 'png',
    rotation: -8,
    scale: 0.75,
    top: '73%',
    left: '20%',
    href: '/work/iheart',
    external: false,
    pillText: 'See Case Study!',
    label: 'iHeartMedia',
    sub: 'PM Intern, Summer 2026',
  },
  {
    name: 'ai-uci',
    ext: 'png',
    rotation: 10,
    scale: 0.85,
    top: '73%',
    right: '20%',
    href: 'https://ai-uci.vercel.app/',
    external: true,
    pillText: 'See Website!',
    label: 'AI @ UCI',
    sub: 'Operations Lead',
  },
]
