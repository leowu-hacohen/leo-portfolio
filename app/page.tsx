'use client'

import { useState } from 'react'
import Hero from '../components/Hero'
import PreHero from '../components/PreHero'
import WorkGrid from '../components/WorkGrid'

export default function HomePage() {
  const [showHero, setShowHero] = useState(false)

  return (
    <>
      {!showHero && <PreHero onComplete={() => setShowHero(true)} />}
      {showHero && (
        <>
          <Hero />
          <WorkGrid />
        </>
      )}
    </>
  )
}
