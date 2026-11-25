import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

export type Photo = {
  /** Two-digit index, also the grid/large filename stem. */
  n: string
  /** Clean download filename of the original, e.g. LeoWuHacohen_SteveLacy_01.jpg */
  full: string
  w: number
  h: number
  bytes: number
}

export type PhotoSet = {
  slug: string
  artist: string
  event: string | null
  venue: string | null
  city: string | null
  /** ISO date, e.g. 2026-11-20 */
  date: string | null
  credit: string
  /** Hidden from /photos and from search engines; reachable by direct link only. */
  unlisted: boolean
  /** 1-based index of the cover photo. */
  cover: number
  zip: { file: string; bytes: number } | null
  photos: Photo[]
}

const DATA_DIR = join(process.cwd(), 'data', 'photos')

export function getPhotoSet(slug: string): PhotoSet | null {
  const file = join(DATA_DIR, `${slug}.json`)
  if (!existsSync(file)) return null
  return JSON.parse(readFileSync(file, 'utf8')) as PhotoSet
}

export function getAllPhotoSets(): PhotoSet[] {
  if (!existsSync(DATA_DIR)) return []
  return readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => getPhotoSet(f.replace(/\.json$/, '')))
    .filter((s): s is PhotoSet => s !== null)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

export const photoUrls = (set: PhotoSet, p: Photo) => {
  const base = `/photos/${set.slug}`
  return {
    grid: `${base}/grid/${p.n}.jpg`,
    large: `${base}/large/${p.n}.jpg`,
    full: `${base}/full/${p.full}`,
  }
}

export const zipUrl = (set: PhotoSet) => (set.zip ? `/photos/${set.slug}/${set.zip.file}` : null)

export function formatShowDate(iso: string | null) {
  if (!iso) return null
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export const formatBytes = (bytes: number) =>
  bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.max(1, Math.round(bytes / 1e6))} MB`
