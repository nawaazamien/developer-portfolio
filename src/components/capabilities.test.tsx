// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { skills } from '../data/profile'
import {
  STRENGTH_LEVELS,
  additionalStack,
  capabilities,
  coreStack,
  engineeringStrengths,
  getAtAGlance,
  publicCodebases,
} from '../data/engineering'
import { projects } from '../data/projects'
import { publicLinks } from '../data/links'
import { Capabilities } from './Capabilities'

afterEach(cleanup)

describe('What I build', () => {
  it('renders the four capabilities with no media placeholders', () => {
    const { container } = render(<Capabilities />)
    const section = container.querySelector('#capabilities')!
    for (const capability of capabilities) {
      expect(within(section as HTMLElement).getByRole('heading', { level: 3, name: capability.title })).toBeTruthy()
    }
    expect(capabilities).toHaveLength(4)
    expect(section.querySelectorAll('.media, img')).toHaveLength(0)
  })

  it('lists Node.js and keeps project-specific tools out of the capability tags', () => {
    const tags = capabilities.flatMap((capability) => capability.technologies)
    expect(tags).toContain('Node.js')
    for (const tool of ['FFmpeg', 'Ollama', 'yt-dlp']) expect(tags).not.toContain(tool)
  })
})

describe('Core stack', () => {
  it('contains the genuine core and excludes tooling and specialised languages', () => {
    for (const tech of ['React', 'TypeScript', 'Node.js', 'PostgreSQL']) expect(coreStack).toContain(tech)
    for (const tool of ['FFmpeg', 'Ollama', 'yt-dlp', 'Python', 'Godot', 'GDScript']) {
      expect(coreStack).not.toContain(tool)
    }
  })

  it('shows Python as additional rather than core, and keeps it in the detailed skills', () => {
    expect(additionalStack).toContain('Python')
    expect(skills.flatMap((group) => group.items)).toContain('Python')
    expect(skills.flatMap((group) => group.items)).toContain('Node.js')
  })

  it('renders the core stack and the additional line', () => {
    render(<Capabilities />)
    const core = screen.getByRole('list', { name: 'Core stack' })
    expect(within(core).getByText('Node.js')).toBeTruthy()
    expect(within(core).queryByText('FFmpeg')).toBeNull()
    expect(within(core).queryByText('Ollama')).toBeNull()
    expect(screen.getByText(/Additional:/).parentElement?.textContent).toContain('Python')
  })
})

describe('Engineering strengths', () => {
  it('uses only the defined qualitative levels and no numeric scores', () => {
    for (const strength of engineeringStrengths) {
      expect(STRENGTH_LEVELS).toContain(strength.level)
      expect(Object.keys(strength)).not.toContain('score')
    }
    expect(engineeringStrengths.map((s) => s.label)).toEqual([
      'Frontend Engineering',
      'Backend Engineering',
      'Database & Data Design',
      'Testing & Quality',
      'Product Engineering',
      'Automation',
    ])
  })

  it('has a text equivalent listing every strength and its level', () => {
    render(<Capabilities />)
    const list = screen.getByRole('list', { name: 'Engineering strengths by level' })
    const rows = within(list).getAllByRole('listitem')
    expect(rows).toHaveLength(engineeringStrengths.length)
    expect(rows[0]!.textContent).toContain('Frontend Engineering')
    expect(rows[0]!.textContent).toContain('Core')
    expect(rows.at(-1)!.textContent).toContain('Automation')
    expect(rows.at(-1)!.textContent).toContain('Working')
    expect(screen.getByRole('img', { name: /Radar chart of engineering strengths/ })).toBeTruthy()
  })

  it('does not display percentage figures', () => {
    const { container } = render(<Capabilities />)
    expect(container.textContent).not.toMatch(/\d+\s?%/)
  })
})

describe('At a glance', () => {
  it('counts projects and public codebases from the real data', () => {
    const stats = getAtAGlance(projects)
    expect(stats.find((s) => s.label.startsWith('Projects'))?.value).toBe(String(projects.length))
    expect(stats.find((s) => s.label.startsWith('Public codebases'))?.value).toBe(String(publicCodebases.length))
    expect(publicCodebases).toContain(publicLinks.saasFoundation.repository)
    expect(publicCodebases).toContain(publicLinks.portfolioSource)
    expect(stats.find((s) => s.label.includes('Lighthouse'))?.label).toBe('Lighthouse accessibility and SEO')
  })

  it('renders the four stats', () => {
    const { container } = render(<Capabilities />)
    expect(container.querySelectorAll('.capabilities__stat')).toHaveLength(4)
    expect(container.textContent).not.toContain('Technologies used')
  })
})
