// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'
import { ProjectCard } from '../components/ProjectCard'
import { caseStudies } from '../data/caseStudies'
import { projects } from '../data/projects'
import { PROJECT_PAGES, PROJECT_SLUGS, projectPageTitle } from '../data/projectSlugs'
import { routes } from './router'

afterEach(cleanup)

function renderAt(path: string, basename = '') {
  const router = createMemoryRouter(routes, { initialEntries: [path], basename })
  return render(<RouterProvider router={router} />)
}

describe('project routes', () => {
  it('has a unique slug, route entry and case study for every project', () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect([...slugs].sort()).toEqual([...PROJECT_SLUGS].sort())
    for (const project of projects) {
      expect(caseStudies[project.slug]).toBeDefined()
      expect(PROJECT_PAGES.find((page) => page.slug === project.slug)?.name).toBe(
        project.name,
      )
    }
  })

  it('generates a title for each route', () => {
    expect(projectPageTitle('Warmup')).toBe('Warmup — Nawaaz Amien')
  })

  it('renders a case study for a known slug and sets its title', async () => {
    renderAt('/projects/warmup')
    expect(await screen.findByRole('heading', { level: 1, name: 'Warmup' })).toBeTruthy()
    expect(document.title).toBe('Warmup — Nawaaz Amien')
  })

  it('renders every case study without errors', async () => {
    for (const project of projects) {
      const { unmount } = renderAt(`/projects/${project.slug}`)
      expect(
        await screen.findByRole('heading', { level: 1, name: project.name }),
      ).toBeTruthy()
      unmount()
    }
  })

  it('renders the credits page', async () => {
    renderAt('/credits')
    expect(await screen.findByRole('heading', { level: 1, name: 'Credits and licences' })).toBeTruthy()
  })

  it('shows a not-found page for an unknown slug', async () => {
    renderAt('/projects/does-not-exist')
    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeTruthy()
    expect(document.title).toContain('Page not found')
  })

  it('exposes no repository link on private project pages', async () => {
    for (const project of projects.filter((p) => p.visibility === 'private')) {
      const { container, unmount } = renderAt(`/projects/${project.slug}`)
      await screen.findByRole('heading', { level: 1, name: project.name })
      const main = container.querySelector('main')!
      const external = [...main.querySelectorAll('a[href^="http"]')]
      expect(external).toHaveLength(0)
      expect(main.textContent).toContain('Private repository')
      unmount()
    }
  })
})

describe('case-study links', () => {
  it('are base-aware', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ProjectCard project={projects[0]} variant="compact" />,
        },
      ],
      { initialEntries: ['/developer-portfolio/'], basename: '/developer-portfolio' },
    )
    render(<RouterProvider router={router} />)
    const link = screen.getByRole('link', { name: /View case study/ })
    expect(link.getAttribute('href')).toBe(
      `/developer-portfolio/projects/${projects[0].slug}`,
    )
  })
})

describe('dominoes description', () => {
  it('matches what the repository actually contains', () => {
    const dominoes = projects.find((project) => project.slug === 'dominoes')!
    expect(dominoes.shortDescription).toContain('server-authoritative')
    expect(dominoes.shortDescription).toContain('client still in progress')
    expect(dominoes.technologies).toContain('Durable Objects')
  })
})
