import type { Capability, Fact, Profile, SocialLink } from './types'

/*
 * Placeholder copy transcribed from the approved Claude Design. Replace with
 * real details (contact info, links, portrait) before the site is shared.
 */

export const profile: Profile = {
  name: 'Nawaaz Amien',
  firstName: 'Nawaaz',
  lastName: 'Amien',
  initials: 'NA',
  roleLabel: 'Software Engineer I',
  intro:
    'I build reliable web and mobile products end to end — from database schema to the last pixel of the interface.',
  about:
    "Hello, I'm Nawaaz — a software engineer building web applications and services end to end. I care about clean architecture, fast interfaces and code that the next person can read.",
  email: 'hello@nawaazamien.dev',
  phone: '+1 (555) 014 2290',
  location: 'Cape Town, South Africa',
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', short: 'gh', href: 'https://github.com/nawaazamien' },
  { name: 'LinkedIn', short: 'in' },
  { name: 'Dribbble', short: 'dr' },
  { name: 'X', short: 'x' },
  { name: 'Email', short: '@', href: `mailto:${profile.email}` },
]

export const facts: Fact[] = [
  { label: 'Name', value: profile.name },
  { label: 'Role', value: profile.roleLabel },
  { label: 'Location', value: profile.location },
  { label: 'Freelance', value: 'Available' },
  { label: 'Email', value: profile.email },
  { label: 'Languages', value: 'English / Afrikaans' },
]

export const skills: Capability[] = [
  {
    title: 'Web Development',
    body: 'Fast, accessible sites and web apps with React, Next.js and modern CSS.',
  },
  {
    title: 'Mobile Apps',
    body: 'Cross-platform apps with React Native and Flutter, shipped to both stores.',
  },
  {
    title: 'Backend & APIs',
    body: 'Node.js and Go services, REST and GraphQL, Postgres and Redis.',
  },
  {
    title: 'UI/UX Design',
    body: 'Wireframes to polished interfaces in Figma, built as real design systems.',
  },
  {
    title: 'DevOps',
    body: 'CI/CD pipelines, Docker and cloud deploys on AWS and Vercel.',
  },
  {
    title: 'Consulting',
    body: 'Architecture reviews and technical planning for early-stage teams.',
  },
]
