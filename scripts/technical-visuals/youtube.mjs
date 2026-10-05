import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { esc, page } from './styles.mjs'

const here = dirname(fileURLToPath(import.meta.url))
/** Real output of the project's validate_render function on synthetic clips. */
const run = JSON.parse(readFileSync(join(here, 'render-validation-run.json'), 'utf8'))

export const youtubeStrip = {
  file: 'youtube-automation/pipeline-overview',
  slug: 'youtube-automation',
  width: 1200,
  height: 470,
  html: page(
    `
    .canvas { width: 1200px; height: 470px; }
    .row { display: flex; align-items: stretch; gap: 10px; margin-top: 34px; }
    .s { flex: 1; padding: 18px 14px; display: flex; flex-direction: column; gap: 6px; }
    .s .k { font: 700 12px Oswald, sans-serif; letter-spacing: .14em; color: #8a8a8a; }
    .s h2 { font: 600 19px/1.15 Oswald, sans-serif; letter-spacing: .05em; text-transform: uppercase; }
    .s p { font: 400 13.5px/1.4 Nunito, sans-serif; color: #a3a3a3; }
    .badge { display: inline-block; margin-top: 26px; padding: 8px 14px; border: 1px solid #555; border-radius: 4px; font: 700 14px Nunito, sans-serif; letter-spacing: .05em; color: #d4d4d4; }
    `,
    `<div class="canvas">
      <div class="eyebrow">YouTube Automation · Pipeline</div>
      <h1>From long-form video to verified clip candidates</h1>
      <div class="row">
        <div class="panel s"><div class="k">01</div><h2>Ingest</h2><p>yt-dlp download, normalised for editing</p></div>
        <div class="panel s"><div class="k">02</div><h2>Transcribe</h2><p>Word-level timestamps, faster-whisper</p></div>
        <div class="panel s"><div class="k">03</div><h2>Segment</h2><p>Pause-based utterance units</p></div>
        <div class="panel s"><div class="k">04</div><h2>Scout + direct</h2><p>Local model proposes and judges clips</p></div>
        <div class="panel s"><div class="k">05</div><h2>Verify</h2><p>Transcript, audio and boundary checks</p></div>
        <div class="panel s"><div class="k">06</div><h2>Plan + check</h2><p>Edit list, then render validation</p></div>
      </div>
      <span class="badge">Candidate selection and edit planning only — no upload or publishing step</span>
    </div>`,
  ),
}

const auto = [
  ['URL', 'Video URL in'],
  ['Ingest', 'yt-dlp probe and download'],
  ['Normalise', 'DNxHR intermediate + PCM audio, source geometry kept'],
  ['Transcribe', 'faster-whisper, word timestamps'],
  ['Segment', 'Utterance units from pauses'],
  ['Scout', 'Candidate clips (local LLM)'],
  ['Assemble', 'Candidates grouped into threads'],
  ['Direct', 'Select / maybe / reject (local LLM, temperature 0)'],
  ['Verify', 'Transcript, audio and boundary checks'],
]

export const youtubeDetail = {
  file: 'youtube-automation/pipeline-detail',
  slug: 'youtube-automation',
  width: 1280,
  html: page(
    `
    .canvas { width: 1280px; }
    .band { margin-top: 26px; }
    .band .label { margin-bottom: 10px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .st { padding: 14px 16px; }
    .st .k { font: 700 12px Oswald, sans-serif; letter-spacing: .14em; color: #8a8a8a; }
    .st h2 { font: 600 19px Oswald, sans-serif; letter-spacing: .06em; text-transform: uppercase; margin: 3px 0 4px; }
    .st p { font: 400 14px/1.4 Nunito, sans-serif; color: #a3a3a3; }
    .st.manual { border-style: dashed; border-color: #6a6a6a; }
    `,
    `<div class="canvas">
      <div class="eyebrow">YouTube Automation · Architecture</div>
      <h1>Pipeline stages</h1>
      <div class="lede">The first band runs end to end from a single command and picks at most three verified candidates. Everything after that is an explicit step.</div>
      <div class="band"><div class="label">Automated run: URL to verified candidates</div>
        <div class="grid">${auto
          .map(
            ([name, text], i) =>
              `<div class="panel st"><div class="k">${String(i + 1).padStart(2, '0')}</div><h2>${name}</h2><p>${esc(text)}</p></div>`,
          )
          .join('')}</div></div>
      <div class="band"><div class="label">Explicit steps (not part of the automated run)</div>
        <div class="grid">
          <div class="panel st manual"><div class="k">10</div><h2>Edit plan</h2><p>Dead-air-only removal plan and edit list for a selected candidate</p></div>
          <div class="panel st manual"><div class="k">11</div><h2>Resolve edit and render</h2><p>DaVinci Resolve edits and renders through a scripting bridge; it never chooses clips</p></div>
          <div class="panel st manual"><div class="k">12</div><h2>Render validation</h2><p>Standalone deterministic checks on the finished file</p></div>
        </div></div>
      <div class="foot">There is no upload or publishing stage: the pipeline never posts anything. Local inference by default; an optional cloud scout provider exists behind an interface.</div>
    </div>`,
  ),
}

function check(label, ok, detail) {
  return `<div class="chk ${ok ? 'ok' : 'bad'}"><span class="mark">${ok ? '✓' : '✕'}</span><div><div class="cl">${esc(label)}</div><div class="cd">${esc(detail)}</div></div></div>`
}

function card(title, sub, report) {
  const black = report.black_periods.length
    ? `${report.black_periods.map(([a, b]) => `${a.toFixed(1)}–${b.toFixed(1)} s`).join(', ')} of black frames`
    : 'No long black periods'
  return `<div class="panel card"><div class="top"><div><div class="label">${esc(sub)}</div><h2>${esc(title)}</h2></div><span class="verdict ${report.passed ? 'ok' : 'bad'}">${report.passed ? 'PASS' : 'FAIL'}</span></div>
    ${check('Dimensions', report.dimensions_ok, `${report.width} × ${report.height} (expected 1080 × 1920)`)}
    ${check('Duration', report.duration_ok, `${report.duration_seconds.toFixed(1)} s (expected 12.0 s ± 1.0 s)`)}
    ${check('Audio', report.has_audio && !report.silent, report.has_audio ? `Present, mean volume ${report.mean_volume_db} dB` : 'No audio stream found')}
    ${check('Black frames', !report.unexpected_black, black)}
    ${report.problems.length ? `<div class="probs"><div class="label">Problems reported</div>${report.problems.map((p) => `<div class="pr">${esc(p)}</div>`).join('')}</div>` : ''}
  </div>`
}

export const youtubeValidation = {
  file: 'youtube-automation/render-validation',
  slug: 'youtube-automation',
  width: 1280,
  html: page(
    `
    .canvas { width: 1280px; }
    .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 26px; }
    .card { padding: 22px 24px; }
    .top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .card h2 { font: 600 24px Oswald, sans-serif; letter-spacing: .05em; text-transform: uppercase; margin-top: 4px; }
    .verdict { font: 800 14px Nunito, sans-serif; letter-spacing: .12em; padding: 6px 14px; border-radius: 4px; }
    .verdict.ok { background: #1f3a2a; color: #9be3b4; } .verdict.bad { background: #3f2222; color: #f2a1a1; }
    .chk { display: flex; gap: 14px; padding: 12px 0; border-top: 1px solid #2a2a2a; }
    .mark { font: 800 18px Nunito, sans-serif; width: 22px; }
    .ok .mark { color: #9be3b4; } .bad .mark { color: #f2a1a1; }
    .cl { font: 700 16px Nunito, sans-serif; } .cd { font: 400 14.5px/1.4 Nunito, sans-serif; color: #a3a3a3; margin-top: 2px; }
    .probs { margin-top: 10px; padding-top: 12px; border-top: 1px solid #2a2a2a; }
    .pr { font: 600 14px Nunito, sans-serif; color: #f2a1a1; margin-top: 6px; }
    .note { margin-top: 22px; padding: 14px 18px; border-left: 3px solid #6a6a6a; background: #1a1a1a; font: 600 14.5px/1.5 Nunito, sans-serif; color: #d4d4d4; }
    `,
    `<div class="canvas">
      <div class="eyebrow">YouTube Automation · Validation</div>
      <h1>Render validation report</h1>
      <div class="lede">Deterministic checks on a finished 9:16 render: exact dimensions, duration within tolerance, audio present and not silent, and no long unexpected black periods.</div>
      <div class="cards">
        ${card('Clean render', 'Synthetic test clip A', run.good)}
        ${card('Defective render', 'Synthetic test clip B', run.defective)}
      </div>
      <div class="note">Both clips are synthetic test patterns generated for this demonstration — not real footage or a production clip. The values are the unedited output of the project's own validation function.</div>
      <div class="foot">Black periods of 2.0 s or more are flagged; mean volume below −50 dB counts as silent.</div>
    </div>`,
  ),
}
