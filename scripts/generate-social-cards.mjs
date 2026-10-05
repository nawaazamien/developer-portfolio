/**
 * Generates the 1200x630 social preview cards in public/social/.
 *
 * The cards are branded designs, not product screenshots. Where a project has
 * a real image it is shown as a small framed inset; otherwise the card is
 * type only. Run with `npm run social-cards` (needs Chrome installed).
 */
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { PROJECT_PAGES } from '../src/data/projectSlugs.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'social')
const assets = join(root, 'src', 'assets', 'projects')

/** Real project images used as an inset, by slug. */
const INSETS = {
  'anti-social-finance': 'anti-social-finance/dashboard.webp',
  'pet-platform': 'pet-platform/dashboard.webp',
  warmup: 'warmup/live-runner-and-standings.webp',
  'tiny-mobile-tower': 'tiny-mobile-tower/pixel-pipeline-comparison.webp',
  'kingdom-incremental': 'kingdom-incremental/forest-and-ledger.webp',
  'tiny-swords-endless-survivor': 'tiny-swords-endless-survivor/new-threat.webp',
  'castle-hold': 'castle-hold/courtyard-defence.webp',
}

const cards = [
  {
    file: 'home',
    eyebrow: 'Software Engineer',
    title: 'Nawaaz Amien',
    tagline:
      'Full-stack products, SaaS platforms, automation and developer tooling.',
  },
  ...PROJECT_PAGES.map((page) => ({
    file: page.slug,
    eyebrow: `Case study · ${page.category.replace('Interactive / Game', 'Game').replace('Data / Research', 'Research')}`,
    title: page.name,
    tagline: page.tagline,
    inset: INSETS[page.slug],
  })),
]

function titleSize(title, hasInset) {
  const limit = hasInset ? 14 : 22
  if (title.length <= limit) return hasInset ? 92 : 112
  if (title.length <= limit * 1.6) return hasInset ? 72 : 88
  return hasInset ? 58 : 72
}

function html(card) {
  const hasInset = Boolean(card.inset)
  // Embedded as a data URI: the page is set from a string, so file URLs would not load.
  const inset = hasInset
    ? `data:image/webp;base64,${readFileSync(join(assets, card.inset)).toString('base64')}`
    : ''
  return `<!doctype html><html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;600;700&family=Nunito:wght@600;700&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #121212; color: #f5f5f5; font-family: Nunito, sans-serif; position: relative; }
  .circle { position: absolute; right: -170px; top: -210px; width: 640px; height: 640px; border-radius: 50%; background: #1b1b1b; }
  .circle.small { right: auto; left: -150px; top: auto; bottom: -230px; width: 360px; height: 360px; }
  .copy { position: absolute; left: 72px; top: 76px; bottom: 76px; width: ${hasInset ? 560 : 900}px; display: flex; flex-direction: column; justify-content: space-between; }
  .eyebrow { font: 300 26px Oswald, sans-serif; letter-spacing: .3em; text-transform: uppercase; color: #a3a3a3; }
  h1 { font: 700 ${titleSize(card.title, hasInset)}px/0.95 Oswald, sans-serif; letter-spacing: .04em; text-transform: uppercase; margin: 22px 0 22px; }
  .tagline { font: 600 28px/1.35 Nunito, sans-serif; color: #a3a3a3; max-width: 520px; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .mark { width: 52px; height: 52px; border: 3px solid #f5f5f5; display: grid; place-items: center; font: 600 24px Oswald, sans-serif; }
  .name { font: 600 16px/1.2 Oswald, sans-serif; letter-spacing: .14em; text-transform: uppercase; }
  .name span { display: block; color: #a3a3a3; font-weight: 300; }
  .inset { position: absolute; right: 64px; top: 120px; width: 460px; height: 390px; border: 1px solid #3a3a3a; border-radius: 10px; overflow: hidden; background: #1a1a1a; box-shadow: 0 24px 60px rgba(0,0,0,.5); }
  .inset img { width: 100%; height: 100%; object-fit: cover; object-position: top left; display: block; }
</style></head><body>
  <div class="circle"></div><div class="circle small"></div>
  <div class="copy">
    <div>
      <div class="eyebrow">${card.eyebrow}</div>
      <h1>${card.title}</h1>
      <p class="tagline">${card.tagline}</p>
    </div>
    <div class="brand"><div class="mark">NA</div><div class="name">Nawaaz Amien<span>Software Engineer</span></div></div>
  </div>
  ${hasInset ? `<div class="inset"><img src="${inset}" alt="" /></div>` : ''}
</body></html>`
}

mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const card of cards) {
  await page.setContent(html(card), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(outDir, `${card.file}.jpg`), type: 'jpeg', quality: 88 })
  console.log('wrote', `public/social/${card.file}.jpg`)
}
await browser.close()
