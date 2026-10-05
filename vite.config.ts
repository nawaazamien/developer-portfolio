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
      const emit = (path: string, content: string) => {
        mkdirSync(dirname(join(outDir, path)), { recursive: true })
        writeFileSync(join(outDir, path), content)
      }

      for (const page of PROJECT_PAGES) {
        emit(
          `projects/${page.slug}/index.html`,
          withSeo(template, projectMeta(page, siteUrl)),
        )
      }
      emit('credits/index.html', withSeo(template, creditsMeta()))
      emit('projects/index.html', template)
      emit('404.html', withSeo(template, notFoundMeta()))
      emit('sitemap.xml', buildSitemap(siteUrl))
      emit('robots.txt', buildRobots(siteUrl))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seo()],
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
})
