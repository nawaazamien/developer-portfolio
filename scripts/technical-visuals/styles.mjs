/** Shared look for the generated technical graphics (matches the site). */
export const baseCss = `
  * { box-sizing: border-box; margin: 0; }
  body { background: #121212; color: #f5f5f5; font-family: Nunito, sans-serif; }
  .canvas { position: relative; overflow: hidden; background: #121212; padding: 44px 48px; }
  .canvas::before { content: ''; position: absolute; right: -180px; top: -220px; width: 560px; height: 560px; border-radius: 50%; background: #1b1b1b; }
  .canvas > * { position: relative; }
  .eyebrow { font: 300 15px Oswald, sans-serif; letter-spacing: .3em; text-transform: uppercase; color: #a3a3a3; }
  h1 { font: 700 40px/1.05 Oswald, sans-serif; letter-spacing: .04em; text-transform: uppercase; margin: 10px 0 6px; }
  .lede { font: 400 17px/1.5 Nunito, sans-serif; color: #a3a3a3; max-width: 900px; }
  .panel { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; }
  .label { font: 700 12px Nunito, sans-serif; letter-spacing: .1em; text-transform: uppercase; color: #8a8a8a; }
  .foot { margin-top: 26px; font: 400 14px/1.5 Nunito, sans-serif; color: #8a8a8a; }
  .arrow { color: #6a6a6a; font: 400 26px Nunito, sans-serif; align-self: center; }
  .chip { display: inline-block; padding: 3px 10px; border: 1px solid #444; border-radius: 3px; font: 700 12px Nunito, sans-serif; letter-spacing: .06em; color: #f5f5f5; }
`

export const fontLink =
  '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />'

export const page = (css, body) =>
  `<!doctype html><html><head><meta charset="utf-8" />${fontLink}<style>${baseCss}${css}</style></head><body>${body}</body></html>`

export const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
