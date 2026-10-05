/**
 * Verified public facts about the site owner. Node-safe (no asset imports) so
 * the build can use it for structured data. Add nothing here that is not
 * already public and confirmed.
 */
import { publicLinks } from './links.ts'

export const identity = {
  name: 'Nawaaz Amien',
  jobTitle: 'Software Engineer',
  githubUrl: publicLinks.github,
  alumniOf: 'Cape Peninsula University of Technology',
  city: 'Cape Town',
  countryCode: 'ZA',
} as const
