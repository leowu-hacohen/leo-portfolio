/**
 * Tints corner-connected near-white background in work-card PNGs so
 * the file matches the card canvas. Lumina on the work grid is now a
 * live `LuminaOrb` (see components/LuminaOrb.tsx), not a PNG — add
 * jobs here if you add new flat thumbnails that need a tint.
 */
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Jimp from 'jimp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const THRESH = 248

function isBgLike(r, g, b) {
  return r >= THRESH && g >= THRESH && b >= THRESH
}

function floodMask(width, height, getPixel) {
  const n = width * height
  const mask = new Uint8Array(n)
  const q = []
  const tryPush = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const i = y * width + x
    if (mask[i]) return
    const p = getPixel(x, y)
    if ((p.a ?? 255) < 20) {
      mask[i] = 1
      return
    }
    if (!isBgLike(p.r, p.g, p.b)) return
    mask[i] = 1
    q.push(i)
  }
  for (const [x, y] of [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ])
    tryPush(x, y)
  let qi = 0
  while (qi < q.length) {
    const i = q[qi++]
    const y = (i / width) | 0
    const x = i - y * width
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      const j = ny * width + nx
      if (mask[j]) continue
      const p = getPixel(nx, ny)
      if ((p.a ?? 255) < 20) {
        mask[j] = 1
        continue
      }
      if (!isBgLike(p.r, p.g, p.b)) continue
      mask[j] = 1
      q.push(j)
    }
  }
  return mask
}

const jobs = []

for (const { rel, target } of jobs) {
  const p = join(root, rel)
  const img = await Jimp.read(p)
  const w = img.bitmap.width
  const h = img.bitmap.height
  const data = img.bitmap.data

  const getPixel = (x, y) => {
    const o = (y * w + x) * 4
    return { r: data[o], g: data[o + 1], b: data[o + 2], a: data[o + 3] }
  }

  const mask = floodMask(w, h, getPixel)
  for (let i = 0; i < mask.length; i++) {
    if (!mask[i]) continue
    const o = i * 4
    const r = data[o]
    const g = data[o + 1]
    const b = data[o + 2]
    if (!isBgLike(r, g, b)) continue
    const wmix = (r + g + b) / 765
    const k = 0.55 + 0.45 * wmix
    data[o] = Math.round(r * (1 - k) + target.r * k)
    data[o + 1] = Math.round(g * (1 - k) + target.g * k)
    data[o + 2] = Math.round(b * (1 - k) + target.b * k)
  }

  const buf = await img.getBufferAsync(Jimp.MIME_PNG)
  fs.writeFileSync(p, buf)
  console.log('Wrote', rel, w, 'x', h)
}
