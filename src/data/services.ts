import type { Service } from './types'

export const services: Service[] = [
  {
    id: 'full-stack',
    title: 'Full-stack products',
    body: 'End-to-end features and products, from data model and API to the interface.',
    tags: ['React', 'TypeScript', 'Supabase'],
  },
  {
    id: 'saas-backend',
    title: 'SaaS & backend systems',
    body: 'Multi-tenant platforms with access control, auditable data and database-level security.',
    tags: ['PostgreSQL', 'Supabase', 'REST APIs'],
  },
  {
    id: 'automation',
    title: 'Automation & tooling',
    body: 'Local pipelines and developer tooling that turn manual workflows into repeatable ones.',
    tags: ['Python', 'FFmpeg', 'Ollama'],
  },
  {
    id: 'interactive',
    title: 'Interactive systems',
    body: 'Gameplay and simulation systems built with performance in mind.',
    tags: ['Godot', 'GDScript'],
  },
]

export const orbitTechnologies = [
  'React',
  'TypeScript',
  'Supabase',
  'PostgreSQL',
  'Python',
  'Godot',
  'FFmpeg',
  'Ollama',
]
