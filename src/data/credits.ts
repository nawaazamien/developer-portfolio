export interface Credit {
  name: string
  by: string
  usedFor: string
  terms: string
  url: string
  /** Licence texts served from this site, as paths under the site base. */
  licenceFiles?: { label: string; path: string }[]
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
      'Per the author’s own page, the packs may be used in personal and commercial projects and modified as needed. Redistributing, reselling or repackaging them is not allowed. Credit is not required but welcome. The page does not mention screenshots or videos; only screenshots of the games are shown here, and no asset files are included in this repository.',
    url: 'https://pixelfrog-assets.itch.io/tiny-swords',
  },
  {
    name: 'Meshy',
    by: 'Meshy AI',
    usedFor:
      'One boss model in Tiny Mobile Tower was generated with Meshy, an AI 3D generator, then processed and rigged. It does not appear in the screenshots on this site.',
    terms:
      'Under Meshy’s terms of service (section 3.2), free-plan output is made available under CC BY 4.0 with credit to Meshy, while paid-plan customers own their output. The plan used for this model is not recorded, so Meshy is credited to follow the stricter terms.',
    url: 'https://www.meshy.ai',
  },
  {
    name: 'Oswald and Nunito',
    by: 'their open-source authors',
    usedFor: 'Typography on this site, served from this site as self-hosted latin subsets packaged by Fontsource.',
    terms: 'Both typefaces are released under the SIL Open Font License 1.1, which permits embedding and redistribution with the licence retained.',
    url: 'https://fontsource.org',
    licenceFiles: [
      { label: 'Oswald licence text', path: 'licenses/oswald-OFL-1.1.txt' },
      { label: 'Nunito licence text', path: 'licenses/nunito-OFL-1.1.txt' },
    ],
  },
]

export const screenshotNote =
  'Screenshots of Anti Social Finance and Pet Platform show the real interfaces running against fictional sample data. No real business, customer or breeder data is shown.'
