/**
 * Renders the static technical graphics for the Trader, YouTube Automation and
 * Dominoes case studies into src/assets/projects/<slug>/ as lossless WebP.
 *
 * These are explanatory diagrams and report graphics built from real project
 * facts and outputs — never fabricated product screenshots. Run with
 * `npm run technical-visuals` (needs Chrome and ffmpeg on PATH).
 */
import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { dominoesPipeline, dominoesReward, dominoesStrip } from './technical-visuals/dominoes.mjs'
import { traderFunnel, traderIntegrity, traderLedger } from './technical-visuals/trader.mjs'
import { youtubeDetail, youtubeStrip, youtubeValidation } from './technical-visuals/youtube.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const assets = join(root, 'src', 'assets', 'projects')
const visuals = [
  traderFunnel,
  traderLedger,
  traderIntegrity,
  youtubeStrip,
  youtubeDetail,
  youtubeValidation,
  dominoesStrip,
  dominoesPipeline,
  dominoesReward,
]

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

for (const visual of visuals) {
  await page.setViewportSize({ width: visual.width, height: visual.height ?? 800 })
  await page.setContent(visual.html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const png = join(assets, `${visual.file}.png`)
  mkdirSync(dirname(png), { recursive: true })
  await page.locator('.canvas').screenshot({ path: png })
  const webp = join(assets, `${visual.file}.webp`)
  const result = spawnSync(
    'ffmpeg',
    ['-v', 'error', '-y', '-i', png, '-map_metadata', '-1', '-lossless', '1', '-compression_level', '6', webp],
    { stdio: 'inherit' },
  )
  rmSync(png)
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${visual.file}`)
  console.log('wrote', `src/assets/projects/${visual.file}.webp`)
}

await browser.close()
