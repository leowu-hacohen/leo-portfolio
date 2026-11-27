#!/usr/bin/env node
/**
 * Build (or rebuild) a photo gallery from a folder of exported photos.
 *
 *   node scripts/add-photos.mjs --slug stevelacy --artist "Steve Lacy" \
 *     --dir ~/Pictures/exports/stevelacy --venue "The Observatory" \
 *     --city "Santa Ana, CA" --date 2026-11-20 \
 *     --publication "KUCI 88.9 FM" --publication-url https://kuci.org
 *
 * Output:
 *   public/photos/<slug>/grid/NN.jpg        900px, for the grid
 *   public/photos/<slug>/large/NN.jpg       2400px, for the lightbox and link previews
 *   public/photos/<slug>/full/<Name>_NN.jpg the original export, what teams download
 *   public/photos/<slug>/<Name>.zip         every original, for "Download all"
 *   data/photos/<slug>.json                 the gallery manifest the site reads
 *
 * Photos are ordered by filename, so prefix exports (01_, 02_...) to set the order.
 * Rerunning replaces the set; metadata flags you omit are kept from the last run.
 * Uses macOS sips and zip, so no npm dependencies.
 */
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, extname, join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CREDIT = 'Leo Wu-Hacohen'
const FILE_PREFIX = 'LeoWuHacohen'
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.heic', '.tif', '.tiff'])

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue
    const key = argv[i].slice(2)
    const next = argv[i + 1]
    args[key] = next && !next.startsWith('--') ? (i++, next) : true
  }
  return args
}

function fail(msg) {
  console.error(`\n✗ ${msg}\n`)
  process.exit(1)
}

const args = parseArgs(process.argv.slice(2))
const slug = args.slug
if (!slug || !/^[a-z0-9-]+$/.test(slug)) fail('--slug is required (lowercase letters, numbers, dashes), e.g. --slug stevelacy')
if (!args.dir) fail('--dir is required: the folder of exported photos')

const srcDir = resolve(String(args.dir).replace(/^~(?=$|\/)/, homedir()))
if (!existsSync(srcDir)) fail(`folder not found: ${srcDir}`)

const manifestPath = join(ROOT, 'data', 'photos', `${slug}.json`)
const prev = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {}

const artist = args.artist ?? prev.artist ?? fail('--artist is required for a new set')
const pick = (key) => (args[key] === undefined ? (prev[key] ?? null) : String(args[key]))

const files = readdirSync(srcDir)
  .filter((f) => !f.startsWith('.') && IMAGE_EXT.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
if (!files.length) fail(`no images found in ${srcDir}`)

const nameStem = `${FILE_PREFIX}_${artist.replace(/[^A-Za-z0-9]+/g, '')}`
const outDir = join(ROOT, 'public', 'photos', slug)
rmSync(outDir, { recursive: true, force: true })
for (const sub of ['grid', 'large', 'full']) mkdirSync(join(outDir, sub), { recursive: true })
mkdirSync(join(ROOT, 'data', 'photos'), { recursive: true })

const sips = (...a) => execFileSync('sips', a, { stdio: 'pipe' }).toString()
const dims = (file) => {
  const out = sips('-g', 'pixelWidth', '-g', 'pixelHeight', file)
  return { w: Number(/pixelWidth: (\d+)/.exec(out)[1]), h: Number(/pixelHeight: (\d+)/.exec(out)[1]) }
}

console.log(`\nBuilding "${artist}" (${files.length} photos) from ${srcDir}\n`)
const photos = files.map((file, i) => {
  const src = join(srcDir, file)
  const n = String(i + 1).padStart(2, '0')
  const fullName = `${nameStem}_${n}.jpg`
  const full = join(outDir, 'full', fullName)

  const ext = extname(file).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') copyFileSync(src, full)
  else sips('-s', 'format', 'jpeg', '-s', 'formatOptions', '95', src, '--out', full)

  sips('-Z', '2400', '-s', 'format', 'jpeg', '-s', 'formatOptions', '82', full, '--out', join(outDir, 'large', `${n}.jpg`))
  sips('-Z', '900', '-s', 'format', 'jpeg', '-s', 'formatOptions', '76', full, '--out', join(outDir, 'grid', `${n}.jpg`))

  const { w, h } = dims(full)
  const bytes = statSync(full).size
  process.stdout.write(`  ${n}  ${basename(file)}  ${w}×${h}  ${(bytes / 1e6).toFixed(1)} MB\n`)
  return { n, full: fullName, w, h, bytes }
})

const zipName = `${nameStem}.zip`
execFileSync('zip', ['-j', '-0', '-q', join(outDir, zipName), ...photos.map((p) => join(outDir, 'full', p.full))])
const zipBytes = statSync(join(outDir, zipName)).size

const coverArg = args.cover ? Number(args.cover) : null
const cover = coverArg && coverArg >= 1 && coverArg <= photos.length ? coverArg : Math.min(prev.cover ?? 1, photos.length)

const manifest = {
  slug,
  artist,
  event: pick('event'),
  venue: pick('venue'),
  city: pick('city'),
  date: pick('date'),
  credit: prev.credit ?? CREDIT,
  publication:
    args.publication !== undefined
      ? { name: String(args.publication), url: args["publication-url"] ? String(args["publication-url"]) : null }
      : (prev.publication ?? null),
  unlisted: args.unlisted !== undefined ? args.unlisted === true || args.unlisted === 'true' : (prev.unlisted ?? false),
  cover,
  zip: { file: zipName, bytes: zipBytes },
  photos,
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

const totalMB = (photos.reduce((s, p) => s + p.bytes, 0) + zipBytes) / 1e6
console.log(`\n✓ ${photos.length} photos · zip ${(zipBytes / 1e6).toFixed(1)} MB · ${totalMB.toFixed(0)} MB of originals+zip`)
console.log(`  manifest: data/photos/${slug}.json`)
console.log(`  preview:  http://localhost:3000/photos/${slug}`)
if (totalMB > 400) {
  console.log('\n! This set is large for a git repo. Consider exporting at a lower JPEG quality,')
  console.log('  or moving originals to object storage (see docs/PHOTOS.md).')
}
console.log('')
