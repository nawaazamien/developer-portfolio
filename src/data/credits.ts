export interface Credit {
  name: string
  by: string
  usedFor: string
  terms: string
  url: string
}

/**
 * Third-party assets and tools behind what this site shows. Terms were checked
 * against the authors' own pages; re-check them before changing how an asset
 * is used.
 */
export const credits: Credit[] = [
  {
    name: 'Tiny Swords',
    by: 'Pixel Frog',
    usedFor:
      'Pixel art in Kingdom Incremental, Tiny Swords — Endless Survivor and Castle Hold, as seen in their screenshots.',
    terms:
      'The free and enemy packs may be used in personal and commercial projects and modified; redistributing, reselling or repackaging the assets is not allowed. Credit is optional and welcome. No asset files are included in this repository.',
    url: 'https://pixelfrog-assets.itch.io/tiny-swords',
  },
  {
    name: 'Meshy',
    by: 'Meshy AI',
    usedFor:
      'One boss model in Tiny Mobile Tower was generated with Meshy, an AI 3D generator, then processed and rigged. It does not appear in the screenshots on this site.',
    terms:
      'Meshy licenses generated models by plan: free-plan output is under CC BY 4.0 (attribution required) and paid plans grant a private commercial licence. It is credited here to follow the attribution terms.',
    url: 'https://www.meshy.ai',
  },
  {
    name: 'Oswald and Nunito',
    by: 'Google Fonts',
    usedFor: 'Typography on this site.',
    terms: 'Both typefaces are released under the SIL Open Font License.',
    url: 'https://fonts.google.com',
  },
]

export const screenshotNote =
  'Screenshots of Anti Social Finance and Pet Platform show the real interfaces running against fictional sample data. No real business, customer or breeder data is shown.'
