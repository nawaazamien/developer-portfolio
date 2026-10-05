import type { EducationEntry, ExperienceEntry } from './types'

/*
 * Employer details are deliberately not published here. Only facts that are
 * safe and verified appear: level, progression and duration.
 */
export const experience: ExperienceEntry[] = [
  {
    period: '3+ years',
    periodNote: 'Current employer',
    heading: 'Software Engineer 1',
    headingNote: 'Current level',
    role: 'Full-stack product engineering',
    body: 'Own features and systems from concept through implementation across the stack.',
  },
  {
    period: 'Earlier',
    periodNote: 'Progression',
    heading: 'Intern / Associate',
    headingNote: 'Software engineering',
    role: 'Promoted to Software Engineer 1',
    body: 'Progressed from intern and associate-level engineering work into a Software Engineer 1 role.',
  },
]

export const education: EducationEntry[] = [
  {
    qualification: 'Advanced Diploma',
    field: 'ICT',
    institution: 'Cape Peninsula University of Technology (CPUT)',
  },
  {
    qualification: 'Postgraduate Diploma',
    field: 'ICT',
    institution: 'Cape Peninsula University of Technology (CPUT)',
  },
]
