import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Serif } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
    <html lang="en" className={`${plusJakarta.variable} ${notoSerif.variable}`}>
      <body style={{ background: '#ffffff', color: '#111111', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
