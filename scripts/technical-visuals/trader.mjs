import { esc, page } from './styles.mjs'

/*
 * Figures come from the project's own reports (census, cost study, research
 * log, data report). They describe process and screening, not performance.
 */

export const traderFunnel = {
  file: 'anti-social-trader/research-funnel',
  slug: 'anti-social-trader',
  width: 1200,
  height: 470,
  html: page(
    `
    .canvas { width: 1200px; height: 470px; }
    .row { display: flex; align-items: stretch; gap: 18px; margin-top: 34px; }
    .stage { flex: 1; padding: 22px 22px 20px; }
    .stage.big { flex: 0 0 250px; }
    .num { font: 700 64px/1 Oswald, sans-serif; letter-spacing: .02em; }
    .stage .what { font: 700 17px Nunito, sans-serif; margin-top: 8px; }
    .stage .note { font: 400 14px/1.45 Nunito, sans-serif; color: #a3a3a3; margin-top: 8px; }
    .gate { flex: 0 0 150px; display: flex; flex-direction: column; justify-content: center; gap: 6px; text-align: center; }
    .gate .a { color: #6a6a6a; font: 400 28px Nunito, sans-serif; }
    .gate .t { font: 600 13px/1.4 Nunito, sans-serif; color: #8a8a8a; }
    `,
    `<div class="canvas">
      <div class="eyebrow">Anti Social Trader · Research</div>
      <h1>Instrument universe screening</h1>
      <div class="row">
        <div class="panel stage big"><div class="label">Symbol census</div><div class="num">1,992</div><div class="what">symbols listed</div><div class="note">A broker's full symbol list, checked for history and cost.</div></div>
        <div class="gate"><div class="a">→</div><div class="t">Full history, tradable, spread ≤ 20% of a typical hourly move</div></div>
        <div class="panel stage big"><div class="label">Data-eligible</div><div class="num">72</div><div class="what">symbols</div><div class="note">1,705 were excluded on cost alone.</div></div>
        <div class="gate"><div class="a">→</div><div class="t">All-in cost measured from 1.35 billion quote ticks</div></div>
        <div class="panel stage big"><div class="label">Cost-eligible</div><div class="num">15</div><div class="what">symbols · 14 markets</div><div class="note">Signal screening here drew only from these.</div></div>
      </div>
      <div class="foot">Screening happens before any strategy is tested. No performance is shown or implied.</div>
    </div>`,
  ),
}

const ledger = [
  ['3', 'Baseline strategy families', 'x', 'No edge shown (preliminary)'],
  ['4', 'Full-history walk-forward test', 'x', 'No strategy eligible; holdout not run'],
  ['5', 'Execution realism', 'x', 'Negative in every execution mode'],
  ['6', 'Order-flow information', 'x', 'No candidate'],
  ['7', 'Intraday market states', 'x', 'No candidate'],
  ['8', 'Cross-asset information', 'p', 'Move-size effect only; no directional edge'],
  ['9', 'Monetising that effect', 'x', 'Not monetisable as shown'],
  ['10', 'Instrument census', 'd', 'Data phase · 72 of 1,992 eligible'],
  ['11', 'Transaction-cost study', 'd', 'Data phase · 15 of 72 cost-eligible'],
  ['12', 'Cross-market screening', 'x', 'No candidate · 0 of 176 and 0 of 35 tests pass'],
  ['13', 'Macro predictors', 'x', 'No final candidate'],
  ['14', 'Scheduled-event study', 'x', 'No final candidate (failed a concentration gate)'],
  ['15', 'Independent replication', 'p', 'Narrow pass under the frozen rule'],
  ['16', 'Executable simulation', 'p', 'Eligibility gates passed · modelled costs'],
  ['17', 'One-shot holdout', 'p', 'Inconclusive · not falsified, not confirmed'],
  ['18', 'Shadow operation', 'o', 'Open · no order path exists'],
  ['19', 'Options-data census', 'd', 'Research-quality only'],
  ['20', 'Signal vs implied volatility', 'p', 'Design defect found and disclosed'],
]

const symbol = { x: '✕', p: '◐', d: '○', o: '…' }

export const traderLedger = {
  file: 'anti-social-trader/research-ledger',
  slug: 'anti-social-trader',
  width: 1280,
  html: page(
    `
    .canvas { width: 1280px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    td { padding: 9px 12px; border-top: 1px solid #2a2a2a; font: 600 16px Nunito, sans-serif; }
    td.n { width: 54px; font: 700 20px Oswald, sans-serif; color: #a3a3a3; }
    td.s { width: 40px; font: 700 20px Nunito, sans-serif; text-align: center; }
    td.o { color: #a3a3a3; font-weight: 600; }
    .legend { display: flex; gap: 26px; margin-top: 20px; font: 600 14px Nunito, sans-serif; color: #a3a3a3; }
    `,
    `<div class="canvas">
      <div class="eyebrow">Anti Social Trader · Research log</div>
      <h1>Outcomes by research phase</h1>
      <div class="lede">Each phase fixes its hypotheses and pass/fail criteria before results are seen. Negative and inconclusive outcomes are recorded as carefully as positive ones.</div>
      <table>${ledger
        .map(
          ([n, topic, kind, outcome]) =>
            `<tr><td class="n">${n}</td><td>${esc(topic)}</td><td class="s">${symbol[kind]}</td><td class="o">${esc(outcome)}</td></tr>`,
        )
        .join('')}</table>
      <div class="legend"><span>✕ rejected or no candidate</span><span>◐ narrow, partial or inconclusive</span><span>○ data or foundation phase</span><span>… open</span></div>
      <div class="foot">No profitable strategy has been demonstrated. Live trading is disabled by construction. Source: the project's own experiment log.</div>
    </div>`,
  ),
}

const stages = [
  ['Download', 'Daily archives from a public source that publishes a SHA-256 checksum per file.'],
  ['Verify', 'A partition counts as complete only when its zip and checksum both exist and match.'],
  ['Normalise', 'Timestamps become UTC microseconds; candles are half-open and knowable only at close.'],
  ['Validate', 'Gaps, duplicates and bad rows are detected and reported, never silently repaired.'],
  ['Resample', 'A higher-timeframe bar is emitted only if every one-minute bar in it is present.'],
  ['Manifest', 'A deterministic dataset ID, so the same raw files always rebuild the same dataset.'],
]

export const traderIntegrity = {
  file: 'anti-social-trader/data-integrity',
  slug: 'anti-social-trader',
  width: 1280,
  html: page(
    `
    .canvas { width: 1280px; }
    .flow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
    .st { padding: 18px 20px; }
    .st .k { font: 700 13px Oswald, sans-serif; letter-spacing: .14em; color: #8a8a8a; }
    .st h2 { font: 600 22px Oswald, sans-serif; letter-spacing: .06em; text-transform: uppercase; margin: 6px 0 8px; }
    .st p { font: 400 15px/1.5 Nunito, sans-serif; color: #a3a3a3; }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 22px; }
    .stat { padding: 18px 20px; }
    .stat .v { font: 700 32px/1 Oswald, sans-serif; }
    .stat .d { font: 400 14px/1.4 Nunito, sans-serif; color: #a3a3a3; margin-top: 6px; }
    `,
    `<div class="canvas">
      <div class="eyebrow">Anti Social Trader · Data</div>
      <h1>Verified market-data pipeline</h1>
      <div class="lede">Every stage hands a checked artefact to the next, so a result can always be traced back to exact raw files.</div>
      <div class="flow">${stages
        .map(
          ([name, text], i) =>
            `<div class="panel st"><div class="k">STAGE ${i + 1}</div><h2>${name}</h2><p>${esc(text)}</p></div>`,
        )
        .join('')}</div>
      <div class="label" style="margin-top:26px">Result for one-minute BTC/USDT history, 2019–2025</div>
      <div class="stats">
        <div class="panel stat"><div class="v">99.89%</div><div class="d">3,677,969 of 3,682,080 one-minute rows present</div></div>
        <div class="panel stat"><div class="v">22</div><div class="d">genuine gaps, preserved rather than filled</div></div>
        <div class="panel stat"><div class="v">0</div><div class="d">duplicate rows and 0 invalid rows</div></div>
        <div class="panel stat"><div class="v">2,557</div><div class="d">daily partitions, each checksum-verified</div></div>
      </div>
      <div class="foot">Figures from the project's data report. Status: pass with gaps.</div>
    </div>`,
  ),
}
