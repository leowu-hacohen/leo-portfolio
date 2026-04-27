import Link from 'next/link'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <main
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-jakarta), sans-serif',
        gap: '24px',
      }}
    >
      <p style={{ color: 'white', fontSize: '18px', fontWeight: 500 }}>Coming Soon</p>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>{title}</p>
      <Link
        href="/"
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '6px 14px',
          borderRadius: '6px',
        }}
      >
        ← Back Home
      </Link>
    </main>
  )
}
