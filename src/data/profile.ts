import type { Fact, Profile, SkillGroup, SocialLink } from './types'

export const githubUrl = 'https://github.com/nawaazamien'

export const profile: Profile = {
  name: 'Nawaaz Amien',
  firstName: 'Nawaaz',
  lastName: 'Amien',
  initials: 'NA',
  roleLabel: 'Software Engineer 1',
  intro:
    'I build production-oriented web applications, SaaS products, backend systems, automation and interactive systems — end to end, from database to interface.',
  about: [
    "I'm a software engineer with more than three years of professional experience, promoted from intern and associate-level work into a Software Engineer 1 role. I take features and systems from concept through to implementation across the stack.",
    'Outside work I build independent products under Anti Social Studios — from a multi-tenant accounting platform to research tooling and automation. I’m drawn to architecture, automation and technically difficult systems.',
  ],
  location: 'Cape Town, South Africa',
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', short: 'gh', href: githubUrl },
]

export const facts: Fact[] = [
  { label: 'Name', value: profile.name },
  { label: 'Role', value: profile.roleLabel },
  { label: 'Experience', value: '3+ years' },
  { label: 'Location', value: profile.location },
  { label: 'Education', value: 'CPUT — ICT diplomas' },
  { label: 'Independent', value: 'Anti Social Studios' },
]

export const skills: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'HTML', 'CSS'],
  },
  {
    title: 'Backend & Data',
    items: ['PostgreSQL', 'Supabase', 'REST APIs'],
  },
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'GDScript'],
  },
  {
    title: 'Engineering Practice',
    items: ['Git', 'GitHub', 'CI/CD', 'Automated testing'],
  },
  {
    title: 'Automation & Tooling',
    items: ['FFmpeg', 'yt-dlp', 'Ollama', 'Claude Code'],
  },
  {
    title: 'Interactive',
    items: ['Godot'],
  },
]
