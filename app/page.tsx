'use client'

import { useState } from 'react'
import Hero from '../components/Hero'
import PreHero from '../components/PreHero'

export default function HomePage() {
  const [showHero, setShowHero] = useState(false)

  return (
    <>
      {!showHero && <PreHero onComplete={() => setShowHero(true)} />}
      {showHero && <Hero />}
    </>
  )
}
