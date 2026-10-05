import type { Job, Milestone } from './types'

/* Placeholder copy transcribed from the approved Claude Design. */

export const jobs: Job[] = [
  {
    dates: '2023 — Present',
    type: 'Full-time',
    company: 'Northwind Labs',
    place: 'Cape Town',
    role: 'Software Engineer I',
    body: 'Lead a four-person team building a B2B analytics platform; cut page load times by 40% and introduced a shared component library.',
  },
  {
    dates: '2021 — 2023',
    type: 'Full-time',
    company: 'Parcel & Co',
    place: 'Remote',
    role: 'Full-stack Developer',
    body: 'Built the customer-facing shipping app on React Native and the Node.js order service behind it.',
  },
  {
    dates: '2019 — 2021',
    type: 'Contract',
    company: 'Studio Oak',
    place: 'Hamburg',
    role: 'Frontend Developer',
    body: 'Delivered marketing sites and e-commerce storefronts for a dozen agency clients.',
  },
]

export const journey: Milestone[] = [
  {
    year: '2019',
    title: 'First production app',
    body: 'Shipped my first paid project — a booking app for a local studio — and never looked back.',
  },
  {
    year: '2024',
    title: 'Software Engineer I',
    body: 'Joined a product team full-time, shipping features across the stack.',
  },
]
