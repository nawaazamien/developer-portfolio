import type { Project } from './types'

/*
 * Curated project data — the single source the UI reads from. These three
 * entries are placeholders transcribed from the approved Claude Design;
 * replace them with real projects. Fields not shown by the design yet
 * (status, dates, case studies) are kept minimal on purpose.
 */

export const projects: Project[] = [
  {
    id: 'harvest',
    slug: 'harvest',
    name: 'Harvest',
    shortDescription:
      'a food-ordering web app and companion mobile app with live order tracking and a restaurant dashboard.',
    category: 'Web & Mobile',
    projectType: 'Product',
    status: 'completed',
    featured: true,
    visibility: 'public',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'React Native', 'Stripe'],
    screenshots: [],
    highlights: [],
    displayOrder: 1,
  },
  {
    id: 'ledgerly',
    slug: 'ledgerly',
    name: 'Ledgerly',
    shortDescription:
      'an invoicing and expense tool for freelancers, with bank sync and automated reminders.',
    category: 'Web',
    projectType: 'Product',
    status: 'completed',
    featured: true,
    visibility: 'private',
    technologies: ['Next.js', 'Prisma', 'Tailwind', 'Plaid'],
    screenshots: [],
    highlights: [],
    displayOrder: 2,
  },
  {
    id: 'trailhead',
    slug: 'trailhead',
    name: 'Trailhead',
    shortDescription:
      'an offline-first hiking app with route recording, maps and community trail reports.',
    category: 'Mobile',
    projectType: 'Product',
    status: 'completed',
    featured: true,
    visibility: 'public',
    technologies: ['Flutter', 'Firebase', 'Mapbox'],
    screenshots: [],
    highlights: [],
    displayOrder: 3,
  },
]
