import type { Award, Service, Stat } from './types'

/* Placeholder copy transcribed from the approved Claude Design. */

export const services: Service[] = [
  {
    id: 'svc-web',
    title: 'Web Development',
    body: 'Responsive websites and web apps built for speed, SEO and easy content editing.',
    tags: ['React', 'Next.js', 'CMS'],
  },
  {
    id: 'svc-mobile',
    title: 'App Development',
    body: 'Native-feeling iOS and Android apps from a single codebase.',
    tags: ['React Native', 'Flutter'],
  },
  {
    id: 'svc-design',
    title: 'UI/UX Design',
    body: 'Research-led interfaces, prototypes and design systems ready for handoff.',
    tags: ['Figma', 'Prototyping'],
  },
]

export const stats: Stat[] = [
  { value: '40+', label: 'Projects delivered' },
  { value: '25', label: 'Happy clients' },
  { value: '3', label: 'Years coding' },
  { value: '12', label: 'Integrations built' },
]

export const orbitTechnologies = [
  'React',
  'Node.js',
  'Postgres',
  'AWS',
  'Figma',
  'Stripe',
  'Flutter',
  'Docker',
]

export const awards: Award[] = [
  {
    id: 'award-1',
    title: 'Quality',
    body: 'Recognized for code quality and test coverage across the platform team.',
  },
  {
    id: 'award-2',
    title: 'Satisfaction',
    body: 'Client award for on-time delivery of a multi-platform launch.',
  },
  {
    id: 'award-3',
    title: 'Responsiveness',
    body: 'Certificate of appreciation for incident response and support.',
  },
]
