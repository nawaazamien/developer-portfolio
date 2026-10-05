// @vitest-environment jsdom
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { cleanup, render } from '@testing-library/react'
import { createMemoryRouter, matchRoutes, RouterProvider } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { caseStudies } from '../data/caseStudies'
import { credits } from '../data/credits'
import { projects } from '../data/projects'
import { routes } from './router'

afterEach(cleanup)

const root = process.cwd()

describe('public static assets', () => {
  it('has every project image and licence file on disk', () => {
    for (const project of projects) {
      const images = [...project.screenshots, ...(project.thumbnail ? [project.thumbnail] : [])]
      for (const image of images) {
        const file = image.src.replace(/^\//, '').split('?')[0]
        expect(existsSync(join(root, file)), `${project.slug}: ${image.src}`).toBe(true)
      }
    }
    for (const credit of credits) {
      for (const licence of credit.licenceFiles ?? []) {
        expect(existsSync(join(root, 'public', licence.path)), licence.path).toBe(true)
      }
    }
  })

  it('gives every project a card visual and unique image alt text', () => {
    const seen = new Set<string>()
    for (const project of projects) {
      expect(project.thumbnail, project.slug).toBeDefined()
      for (const image of [...project.screenshots, project.thumbnail!]) {
        expect(image.alt.length).toBeGreaterThan(40)
        expect(image.caption?.length ?? 0).toBeGreaterThan(0)
      }
      for (const image of project.screenshots) {
        const key = `${project.slug}:${image.alt}`
        expect(seen.has(key), key).toBe(false)
        seen.add(key)
      }
    }
  })
})

describe('credits', () => {
  it('stay linked to the projects that need them', () => {
    const text = (slug: keyof typeof caseStudies) =>
      JSON.stringify(caseStudies[slug].credits ?? []) +
      JSON.stringify(caseStudies[slug].scopeNotes ?? [])
    expect(text('tiny-mobile-tower')).toContain('Meshy')
    for (const slug of ['kingdom-incremental', 'tiny-swords-endless-survivor', 'castle-hold'] as const) {
      expect(text(slug)).toContain('Pixel Frog')
    }
  })
})

describe('internal navigation', () => {
  it('resolves every header and footer link', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] })
    const { container } = render(<RouterProvider router={router} />)

    const links = [...container.querySelectorAll('header a[href], footer a[href]')]
    expect(links.length).toBeGreaterThan(8)
    for (const link of links) {
      const href = link.getAttribute('href')!
      expect(href).not.toBe('#')
      if (/^https?:|^mailto:/.test(href)) continue
      const [path, hash] = href.split('#')
      expect(matchRoutes(routes, path || '/'), href).not.toBeNull()
      if (hash) {
        expect(container.querySelector(`#${hash}`), `#${hash}`).not.toBeNull()
      }
    }
  })

  it('never renders a placeholder or private repository link on the homepage', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] })
    const { container } = render(<RouterProvider router={router} />)
    for (const link of container.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href')!
      expect(href).not.toBe('#')
      if (href.includes('github.com')) {
        expect(href).toMatch(/^https:\/\/github\.com\/nawaazamien(\/developer-portfolio)?$/)
      }
    }
  })
})
