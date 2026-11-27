import Link from 'next/link'

const jakarta = 'var(--font-jakarta), sans-serif'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/#work' },
  { label: 'Playground', href: '/playground' },
  { label: 'Photos', href: '/photos' },
] as const

export default function PhotosNav({ back = '/' }: { back?: string }) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px max(16px, 4vw)',
        background: 'rgba(244,244,244,0.7)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
      }}
    >
      <Link href={back} data-cursor-pill="Back" style={{ fontFamily: jakarta, fontSize: '13px', color: '#666', textDecoration: 'none' }}>
        ← Back
      </Link>
      {/* On phones only Home and Photos fit beside Back. */}
      <style>{`@media (max-width: 560px) { .pn-secondary { display: none; } }`}</style>
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'flex-end' }}>
        {LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={label === 'Home' || label === 'Photos' ? undefined : 'pn-secondary'}
            data-cursor-pill={label}
            style={{ fontFamily: jakarta, fontSize: '13px', color: label === 'Photos' ? '#111' : '#888', textDecoration: 'none' }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
