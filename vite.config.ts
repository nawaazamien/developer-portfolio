import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { PROJECT_PAGES } from './src/data/projectSlugs.ts'
import {
  buildRobots,
  buildSitemap,
  creditsMeta,
  homeMeta,
  notFoundMeta,
  projectMeta,
  renderHead,
  type PageMeta,
} from './src/seo/metadata.ts'
import { resolveSiteUrl } from './src/seo/site.ts'

/*
 * Public base path. Local dev and previews use "/". The GitHub Pages workflow
 * sets VITE_BASE_PATH (e.g. "/developer-portfolio/") from the Pages metadata,
 * so moving to a custom domain needs no code change: Pages then reports an
 * empty base path and the build falls back to "/".
 */
const base = process.env.VITE_BASE_PATH || '/'

/*
 * Canonical site URL (origin + base path) for canonical links, social tags,
 * structured data and the sitemap. The workflow passes the value GitHub Pages
 * reports; otherwise it defaults to the current Pages URL.
 */
const siteUrl = resolveSiteUrl(process.env.SITE_URL)

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/

const withSeo = (html: string, meta: PageMeta) =>
  html.replace(
    SEO_BLOCK,
    `<!--seo:start-->\n    ${renderHead(meta, siteUrl)}\n    <!--seo:end-->`,
  )

/**
 * Search and social metadata, emitted as static HTML so scrapers that do not
 * run JavaScript still get it. GitHub Pages has no SPA rewrites, so this also
 * writes real files for deep links: a copy of index.html (with route-specific
 * metadata) for every case study and the credits page, a 404.html that Pages
 * serves for unknown URLs (the app then renders its not-found page), plus
 * sitemap.xml and robots.txt.
 */
function seo(): Plugin {
  let outDir = 'dist'
  return {
    name: 'seo',
    configResolved(config) {
      outDir = config.build.outDir
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => withSeo(html, homeMeta(siteUrl)),
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      const withoutHomeOnly = (html: string) => html.replace(/<link[^>]*data-route="home"[^>]*>\s*/g, '')
      const emit = (path: string, content: string) => {
        mkdirSync(dirname(join(outDir, path)), { recursive: true })
        writeFileSync(join(outDir, path), content)
      }

      for (const page of PROJECT_PAGES) {
        emit(
          `projects/${page.slug}/index.html`,
          withSeo(withoutHomeOnly(template), projectMeta(page, siteUrl)),
        )
      }
      emit('credits/index.html', withSeo(withoutHomeOnly(template), creditsMeta()))
      emit('projects/index.html', template)
      emit('404.html', withSeo(withoutHomeOnly(template), notFoundMeta()))
      emit('sitemap.xml', buildSitemap(siteUrl))
      emit('robots.txt', buildRobots(siteUrl))
    },
  }
}

/**
 * Preloads what the first paint needs, so the browser does not have to wait
 * for JavaScript and CSS to discover it: the two body fonts on every page, and
 * the hero portrait (marked home-only, then stripped from the other routes).
 */
function preloadCritical(): Plugin {
  let publicBase = '/'
  return {
    name: 'preload-critical',
    configResolved(config) {
      publicBase = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return
        const files = Object.keys(ctx.bundle)
        const href = (pattern: RegExp) => {
          const file = files.find((name) => pattern.test(name))
          return file ? `${publicBase}${file}` : undefined
        }
        const tags = []
        for (const pattern of [/oswald-latin-wght-normal.*\.woff2$/, /nunito-latin-wght-normal.*\.woff2$/]) {
          const url = href(pattern)
          if (url) {
            tags.push({
              tag: 'link',
              attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: url, crossorigin: '' },
              injectTo: 'head-prepend' as const,
            })
          }
        }
        const portrait = href(/nawaaz-amien.*\.webp$/)
        if (portrait) {
          tags.push({
            tag: 'link',
            attrs: { rel: 'preload', as: 'image', href: portrait, fetchpriority: 'high', 'data-route': 'home' },
            injectTo: 'head-prepend' as const,
          })
        }
        return tags
      },
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seo(), preloadCritical()],
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
})
