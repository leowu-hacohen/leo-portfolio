'use client'

import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import PreHero from '../components/PreHero'
import WorkGrid from '../components/WorkGrid'

// Resets on hard reload (module re-executes), survives client-side navigation.
let heroHasPlayed = false

export default function HomePage() {
  const [showHero, setShowHero] = useState(false)
  const [fromPreHero, setFromPreHero] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (heroHasPlayed) setShowHero(true)
    setChecked(true)
  }, [])

  const handleComplete = () => {
    heroHasPlayed = true
    setFromPreHero(true)
    setShowHero(true)
  }

  return (
    <>
      {checked && !showHero && <PreHero onComplete={handleComplete} />}
      {showHero && (
        <>
          <Hero fromPreHero={fromPreHero} />
          <WorkGrid />
        </>
      )}
    </>
  )
}
