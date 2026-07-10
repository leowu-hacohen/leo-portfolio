'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CLAIR_BLUE = new THREE.Color('#5B7CFA')
const CLAIR_BLUE_LIGHT = new THREE.Color('#9DB1FC')
const INK = new THREE.Color('#1a1a1e')

function makeSparkleTexture(): THREE.Texture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const c = size / 2

  const glow = ctx.createRadialGradient(c, c, 0, c, c, c)
  glow.addColorStop(0, 'rgba(91,124,250,0.55)')
  glow.addColorStop(0.4, 'rgba(91,124,250,0.16)')
  glow.addColorStop(1, 'rgba(91,124,250,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, size, size)

  // Four-point sparkle (matches the logo mark): tall vertical points, shorter horizontal
  const vLong = size * 0.42
  const hShort = size * 0.26
  const inset = size * 0.05
  ctx.beginPath()
  ctx.moveTo(c, c - vLong)
  ctx.quadraticCurveTo(c + inset, c - inset, c + hShort, c)
  ctx.quadraticCurveTo(c + inset, c + inset, c, c + vLong)
  ctx.quadraticCurveTo(c - inset, c + inset, c - hShort, c)
  ctx.quadraticCurveTo(c - inset, c - inset, c, c - vLong)
  ctx.closePath()
  ctx.fillStyle = '#5B7CFA'
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function makeDotTexture(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const c = size / 2
  const g = ctx.createRadialGradient(c, c, 0, c, c, c)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.6)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/**
 * Particle orbit ring + central sparkle, echoing the Clair logo mark.
 * Renders on a transparent canvas that fills its parent.
 */
export default function ClairOrbit3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    )
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    // Sit right-of-center so hero copy stays on clean background
    group.position.x = 1.6
    group.position.y = 0.2
    scene.add(group)

    const dotTexture = makeDotTexture()

    // ── Orbit ring of particles (the logo's ellipse) ─────────────────────────
    const RING_COUNT = 2600
    const ringGeo = new THREE.BufferGeometry()
    const ringPos = new Float32Array(RING_COUNT * 3)
    const ringCol = new Float32Array(RING_COUNT * 3)
    // Circle in its own plane: in-plane spin keeps the silhouette stable
    // (an ellipse would drift edge-on as it rotates). The tilt below gives
    // the slanted-ellipse look from the logo.
    const a = 1.9
    const b = 1.9
    const tmp = new THREE.Color()
    for (let i = 0; i < RING_COUNT; i++) {
      const t = Math.random() * Math.PI * 2
      const spread = 0.045 + Math.pow(Math.random(), 3) * 0.22
      ringPos[i * 3] = Math.cos(t) * a + (Math.random() - 0.5) * spread * 2
      ringPos[i * 3 + 1] = Math.sin(t) * b + (Math.random() - 0.5) * spread * 2
      ringPos[i * 3 + 2] = (Math.random() - 0.5) * spread * 3

      const r = Math.random()
      if (r < 0.55) tmp.copy(CLAIR_BLUE)
      else if (r < 0.8) tmp.copy(CLAIR_BLUE_LIGHT)
      else tmp.copy(INK)
      ringCol[i * 3] = tmp.r
      ringCol[i * 3 + 1] = tmp.g
      ringCol[i * 3 + 2] = tmp.b
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3))
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringCol, 3))
    const ringMat = new THREE.PointsMaterial({
      size: 0.035,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const ring = new THREE.Points(ringGeo, ringMat)
    // Tilt like the logo's slanted ellipse
    const ringHolder = new THREE.Group()
    ringHolder.add(ring)
    ringHolder.rotation.x = 1.05
    ringHolder.rotation.z = 0.4
    group.add(ringHolder)

    // ── Ambient dust for depth ───────────────────────────────────────────────
    const DUST_COUNT = 350
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 10
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 6
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    const dustMat = new THREE.PointsMaterial({
      size: 0.02,
      map: dotTexture,
      color: new THREE.Color('#8CA2FB'),
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const dust = new THREE.Points(dustGeo, dustMat)
    group.add(dust)

    // ── Central sparkle sprite ───────────────────────────────────────────────
    const sparkleTexture = makeSparkleTexture()
    const sparkleMat = new THREE.SpriteMaterial({
      map: sparkleTexture,
      transparent: true,
      depthWrite: false,
    })
    const sparkle = new THREE.Sprite(sparkleMat)
    sparkle.scale.setScalar(1.5)
    group.add(sparkle)

    // ── Interaction + loop ───────────────────────────────────────────────────
    let targetRX = 0
    let targetRY = 0
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      targetRY = nx * 0.22
      targetRX = ny * 0.16
    }
    window.addEventListener('pointermove', onPointerMove)

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let raf = 0
    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (!reducedMotion) {
        ring.rotation.z = t * 0.06
        dust.rotation.y = t * 0.02
        const pulse = 1.5 + Math.sin(t * 1.4) * 0.07
        sparkle.scale.setScalar(pulse)
      }
      group.rotation.x += (targetRX - group.rotation.x) * 0.04
      group.rotation.y += (targetRY - group.rotation.y) * 0.04
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      ringGeo.dispose()
      ringMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      sparkleMat.dispose()
      sparkleTexture.dispose()
      dotTexture.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
