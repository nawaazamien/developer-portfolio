import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { PROJECT_PAGES, projectPageTitle } from './src/data/projectSlugs.ts'

/*
 * Public base path. Local dev and previews use "/". The GitHub Pages workflow
 * sets VITE_BASE_PATH (e.g. "/developer-portfolio/") from the Pages metadata,
 * so moving to a custom domain needs no code change: Pages then reports an
 * empty base path and the build falls back to "/".
 */
const base = process.env.VITE_BASE_PATH || '/'

const escapeAttribute = (value: string) => value.replace(/"/g, '&quot;')

/**
 * GitHub Pages has no SPA rewrites, so deep links need real files. After the
 * build this emits a copy of index.html (with a route-specific title) at
 * projects/<slug>/index.html for every case study, so direct links and
 * refreshes get a 200 response, plus projects/index.html and a 404.html that
 * Pages serves for unknown URLs (the app then renders its not-found page).
 */
function staticRoutes(): Plugin {
  let outDir = 'dist'
  return {
    name: 'static-routes',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')
      const emit = (path: string, html: string) => {
        mkdirSync(join(outDir, path, '..'), { recursive: true })
        writeFileSync(join(outDir, path), html)
      }
      const withTitle = (title: string, description?: string) => {
        let html = template.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
        if (description) {
          html = html.replace(
            /(<meta\s+name="description"\s+content=")[^"]*(")/s,
            `$1${escapeAttribute(description)}$2`,
          )
        }
        return html
      }

      for (const page of PROJECT_PAGES) {
        emit(
          `projects/${page.slug}/index.html`,
          withTitle(
            projectPageTitle(page.name),
            `Case study of ${page.name} by Nawaaz Amien.`,
          ),
        )
      }
      emit('projects/index.html', template)
      emit('404.html', withTitle('Page not found — Nawaaz Amien'))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), staticRoutes()],
})
