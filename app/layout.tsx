import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Serif, Instrument_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import PixelLeo from '../components/PixelLeo'
import CustomCursor from '../components/CustomCursor'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
})

const instrumentSerif = localFont({
  src: [
    { path: '../public/fonts/InstrumentSerif-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/InstrumentSerif-Italic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Leo Wu-Hacohen',
  description: 'Product Manager Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${notoSerif.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}
    >
      <body style={{ background: '#FBF8F3', color: '#16130E', margin: 0 }}>
        <CustomCursor />
        {children}
        <PixelLeo />
      </body>
    </html>
  )
}
