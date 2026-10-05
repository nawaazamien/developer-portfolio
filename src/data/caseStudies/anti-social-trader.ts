import type { CaseStudy } from '../types'

export const antiSocialTrader: CaseStudy = {
  summary:
    'A deterministic research and backtesting platform for short-horizon trading ideas, built with the discipline of a scientific experiment — and, so far, a record of honestly rejected hypotheses rather than a profitable strategy.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Anti Social Trader is a Python research and backtesting system. It started with BTC/USDT one-minute data and has grown into multi-asset research that includes FX and CFD instrument data and an options-volatility study.',
    'It is a research system. Live trading is disabled by construction, and no profitable strategy has been demonstrated. The value of the project is the engineering and research discipline: experiments are pre-registered, costs are never zero, and a strategy that fails its predefined criteria is rejected rather than retrofitted.',
  ],
  problem: [
    'Many retail backtests are quietly optimistic: look-ahead bias, zero or flattering costs, and parameters tuned after seeing the results. I wanted infrastructure that makes those mistakes hard to make, and a process that records failure as carefully as success.',
  ],
  goals: [
    'Make look-ahead and cost-free results impossible by construction.',
    'Keep every dataset and run reproducible and identifiable.',
    'Fix hypotheses and pass/fail criteria before looking at results.',
    'Report negative results with the same rigour as positive ones.',
  ],
  keyFeatures: [
    {
      title: 'Verified data pipeline',
      body: 'Market data comes from a public archive chosen because it publishes a checksum for every file. Downloads are written atomically and a partition only counts as complete when its checksum matches. Gaps are never silently filled.',
    },
    {
      title: 'Event-driven backtester',
      body: 'A bar-by-bar engine with an event journal, an execution model, an account and trade records, driven by strategies that can only propose trades.',
    },
    {
      title: 'Adverse cost modelling',
      body: 'Fees, spread and slippage are applied against the strategy, with several cost scenarios and break-even analysis. A configuration with zero costs is rejected.',
    },
    {
      title: 'Strict boundaries',
      body: 'Strategies propose, a separate risk engine sizes and applies loss limits, and the simulator fills. Each hand-off is a typed, one-way boundary.',
    },
    {
      title: 'Cross-asset research',
      body: 'A census of a large FX and CFD instrument universe with cost-based eligibility screening, so only instruments that can plausibly pay for their own costs are studied.',
    },
    {
      title: 'Research harness',
      body: 'Pre-registrations, chronological development, validation and locked holdout splits, and an experiment log that records every attempt, including failures.',
    },
  ],
  architecture: {
    summary:
      'A pipeline of narrow stages. Each stage hands typed data to the next and cannot reach backwards, which is how look-ahead and hidden coupling are kept out.',
    diagram: {
      title: 'Research pipeline',
      description:
        'Verified market data flows into features, then into strategies that only propose trades. A risk engine sizes the proposals, a simulated execution layer fills them, and the results are recorded and measured.',
      flow: [
        { label: 'Verified market data', note: 'Checksummed archives, normalised, gaps preserved' },
        { label: 'Features', note: 'Computed only from data closed before the decision time' },
        { label: 'Strategies', note: 'Propose trades; never size or fill them' },
        { label: 'Risk engine', note: 'Position sizing, daily-loss and drawdown limits' },
        { label: 'Simulated execution', note: 'Fees, spread and slippage applied adversely' },
        { label: 'Records and metrics', note: 'Net of costs, out of sample' },
      ],
    },
    points: [
      'Python 3.12 managed with uv, strict static typing and linting.',
      'Frozen dataclasses on the hot path, with Pydantic only at the configuration edge.',
      'Configuration is fingerprinted, so every run can be identified and reproduced.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Look-ahead bias',
      body: 'The market view refuses to serve any candle that closes after the decision time, and trade records enforce that signal, entry and exit are in order.',
    },
    {
      title: 'Costs decide most ideas',
      body: 'In the early baselines, round-trip costs were larger than the typical stop distance, which is why most simple ideas fail. Modelling that honestly shaped the whole research programme.',
    },
    {
      title: 'Multiple testing',
      body: 'The experiment log states how many variants were tried, and later phases control the false discovery rate across many hypotheses instead of reporting the best-looking one.',
    },
    {
      title: 'Spending the holdout once',
      body: 'The final holdout can only be opened behind an explicit confirmation flag, and each opening is logged, so it cannot be used for tuning.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Pre-register, then look',
      body: 'Each phase fixes its hypotheses and pass/fail criteria in writing before any result is seen.',
    },
    {
      title: 'Reject rather than retrofit',
      body: 'A strategy that fails its criteria is recorded as rejected. Re-defining success after the fact is not allowed.',
    },
    {
      title: 'Prefer plateaus to peaks',
      body: 'Stability across parameters, years and regimes matters more than a single strong result, and walk-forward testing is required before any shadow trading.',
    },
  ],
  testing: [
    'A broad suite of unit and contract tests covers the backtest engine, cost and risk arithmetic, data validation and the look-ahead contracts.',
    'Static typing in strict mode and linting run alongside the tests.',
    'Readiness gates for any prospective observation were frozen before observation began, and market profit is deliberately not one of them.',
  ],
  currentStatus:
    'Active research. Across the documented phases, baseline strategies and later candidates were rejected on cost-adjusted, out-of-sample criteria. One narrow event-based candidate passed its replication rule but was inconclusive on its single locked-holdout test, and is only being observed in a shadow mode that has no order path. No profitable strategy has been demonstrated.',
  scopeNotes: [
    'Research-oriented: there is no live-money trading, and live order permission is disabled by construction.',
    'Nothing here is evidence of profitability. The rejections are the point.',
    'Strategy parameters, data and results are private.',
  ],
  lessons: [
    'A well-recorded rejection is a result. It is more useful than a flattering backtest that cannot be trusted.',
    'Making the right thing the easy thing — through types and invariants — worked better than relying on discipline alone.',
  ],
}
