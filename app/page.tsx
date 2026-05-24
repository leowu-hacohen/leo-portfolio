'use client'

import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import PreHero from '../components/PreHero'
import WorkGrid from '../components/WorkGrid'

// Resets on hard reload (module re-executes), survives client-side navigation.
let heroHasPlayed = false

export default function HomePage() {
  const [showHero, setShowHero] = useState(false)
  const [showPreHero, setShowPreHero] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (heroHasPlayed) {
      setShowHero(true)
    } else {
      setShowPreHero(true)
    }
    setChecked(true)
  }, [])

  // Fires when PreHero starts fading. Mounts Hero behind it so the
  // icons + text animate in *during* the white overlay fade — no dead frame.
  const handleReveal = () => {
    heroHasPlayed = true
    setShowHero(true)
  }

  // Fires after PreHero's fade is fully complete; tear it out of the tree.
  const handleExit = () => {
    setShowPreHero(false)
  }

  if (!checked) return null

  return (
    <>
      {showHero && (
        <>
          <Hero />
          <WorkGrid />
        </>
      )}
      {showPreHero && <PreHero onReveal={handleReveal} onExit={handleExit} />}
    </>
  )
}
