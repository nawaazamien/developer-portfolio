import type { ProjectSlug } from '../projectSlugs'
import type { CaseStudy } from '../types'
import { antiSocialFinance } from './anti-social-finance'
import { antiSocialTrader } from './anti-social-trader'
import { dominoes } from './dominoes'
import {
  castleHold,
  kingdomIncremental,
  tinyMobileTower,
  tinySwordsEndlessSurvivor,
} from './games'
import { petPlatform } from './pet-platform'
import { warmup } from './warmup'
import { youtubeAutomation } from './youtube-automation'

/**
 * Case-study content, keyed by project slug. Kept separate from `projects.ts`
 * and imported only by the case-study route, so the homepage stays light.
 */
export const caseStudies: Record<ProjectSlug, CaseStudy> = {
  'anti-social-finance': antiSocialFinance,
  'anti-social-trader': antiSocialTrader,
  'pet-platform': petPlatform,
  'youtube-automation': youtubeAutomation,
  warmup,
  'tiny-mobile-tower': tinyMobileTower,
  'kingdom-incremental': kingdomIncremental,
  'tiny-swords-endless-survivor': tinySwordsEndlessSurvivor,
  'castle-hold': castleHold,
  dominoes,
}
