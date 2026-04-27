import Link from 'next/link'
import ObjectIcon from './ObjectIcon'

const icons = [
  { name: 'submarine',  rotation: -15, translateY: -12 },
  { name: 'headphones', rotation:  12, translateY:  10 },
  { name: 'teacup',     rotation: -10, translateY:   6 },
  { name: 'microphone', rotation:   8, translateY: -14 },
  { name: 'burger',     rotation: -12, translateY:  12 },
  { name: 'briefcase',  rotation:  10, translateY:  -8 },
]

const displayStyle: React.CSSProperties = {
  fontFamily: 'var(--font-jakarta), sans-serif',
  fontSize: '60px',
  fontWeight: 700,
  color: '#111111',
  lineHeight: 1,
  letterSpacing: '-0.03em',
}

export default function Hero() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Nav */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          paddingTop: '28px',
        }}
      >
        {(['About', 'Work', 'Resume'] as const).map((label) => (
          <Link
            key={label}
            href={`/${label.toLowerCase()}`}
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
      </nav>

      {/* Hero — paddingBottom offsets center upward */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '120px',
          overflow: 'visible',
        }}
      >
        {/* Name tag */}
        <p
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: '10px',
            fontWeight: 500,
            color: '#c0c0c0',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            margin: '0 0 24px 0',
          }}
        >
          Leo Wu-Hacohen
        </p>

        {/* Line 1: product [submarine] manager [headphones] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflow: 'visible',
          }}
        >
          <span style={displayStyle}>product</span>
          <ObjectIcon {...icons[0]} />
          <span style={displayStyle}>manager</span>
          <ObjectIcon {...icons[1]} />
        </div>

        {/* Line 2: [teacup] [microphone] who ships. [burger] [briefcase] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '14px',
            overflow: 'visible',
          }}
        >
          <ObjectIcon {...icons[2]} />
          <ObjectIcon {...icons[3]} />
          <span style={displayStyle}>who ships.</span>
          <ObjectIcon {...icons[4]} />
          <ObjectIcon {...icons[5]} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: '320px',
            height: '1px',
            background: '#e5e5e5',
            margin: '40px 0 20px',
          }}
        />

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            color: '#b5b5b5',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Product Manager · UC Irvine · Class of &apos;27
        </p>
      </div>
    </div>
  )
}
