import { esc, page } from './styles.mjs'

export const dominoesStrip = {
  file: 'dominoes/platform-overview',
  slug: 'dominoes',
  width: 1200,
  height: 470,
  html: page(
    `
    .canvas { width: 1200px; height: 470px; }
    .row { display: flex; align-items: stretch; gap: 12px; margin-top: 34px; }
    .s { flex: 1; padding: 18px 16px; display: flex; flex-direction: column; gap: 6px; }
    .s .k { font: 700 12px Oswald, sans-serif; letter-spacing: .14em; color: #8a8a8a; }
    .s h2 { font: 600 20px/1.15 Oswald, sans-serif; letter-spacing: .05em; text-transform: uppercase; }
    .s p { font: 400 14px/1.4 Nunito, sans-serif; color: #a3a3a3; }
    .badge { display: inline-block; margin-top: 26px; padding: 8px 14px; border: 1px solid #555; border-radius: 4px; font: 700 14px Nunito, sans-serif; letter-spacing: .05em; color: #d4d4d4; }
    `,
    `<div class="canvas">
      <div class="eyebrow">Dominoes · Architecture</div>
      <h1>Server-authoritative match flow</h1>
      <div class="row">
        <div class="panel s"><div class="k">CLIENT</div><h2>React client</h2><p>Sends intent only; renders what it is sent</p></div>
        <div class="panel s"><div class="k">EDGE</div><h2>Worker</h2><p>HTTP routes and WebSocket upgrade</p></div>
        <div class="panel s"><div class="k">ROOM</div><h2>Match room</h2><p>One Durable Object per match</p></div>
        <div class="panel s"><div class="k">RULES</div><h2>Rules engine</h2><p>Pure, deterministic state machine</p></div>
        <div class="panel s"><div class="k">STATE</div><h2>Atomic commit</h2><p>Sequence-checked compare-and-swap</p></div>
        <div class="panel s"><div class="k">OUT</div><h2>Redacted views</h2><p>Each player sees only their own hand</p></div>
      </div>
      <span class="badge">Game client is in progress; the platform behind it is the focus of this project</span>
    </div>`,
  ),
}

const steps = [
  ['Identify the caller', 'The seat comes from the authenticated connection, never from the message.'],
  ['Parse the envelope', 'A strict, versioned schema (dominoes.v1); anything malformed is a protocol error.'],
  ['Check idempotency', 'A retried message id replays the stored response instead of acting twice.'],
  ['Check the sequence', 'A stale or ahead sequence number is refused and the client is told to resync.'],
  ['Adapt the command', 'The client names a tile and a side; seat, actor and scores are filled in by the server.'],
  ['Apply to the rules engine', 'A pure reducer returns events or a rejection code.'],
  ['Re-check invariants', 'Tile counts and state consistency are verified before anything is kept.'],
  ['Build the responses', 'An acceptance for the caller and a redacted snapshot for every other seat.'],
  ['Commit atomically', 'State, sequence and receipt are written in one compare-and-swap.'],
  ['Send after commit', 'Outbound messages leave only once the commit has succeeded.'],
]

export const dominoesPipeline = {
  file: 'dominoes/command-pipeline',
  slug: 'dominoes',
  width: 1280,
  html: page(
    `
    .canvas { width: 1280px; }
    .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 18px; margin-top: 26px; }
    .st { display: flex; gap: 14px; padding: 14px 18px; }
    .st .n { font: 700 24px Oswald, sans-serif; color: #6a6a6a; width: 34px; flex: none; }
    .st h2 { font: 600 19px Oswald, sans-serif; letter-spacing: .05em; text-transform: uppercase; }
    .st p { font: 400 14.5px/1.45 Nunito, sans-serif; color: #a3a3a3; margin-top: 2px; }
    .ends { display: flex; justify-content: space-between; margin-top: 22px; font: 700 14px Nunito, sans-serif; color: #a3a3a3; }
    `,
    `<div class="canvas">
      <div class="eyebrow">Dominoes · Match runtime</div>
      <h1>How one move is processed</h1>
      <div class="lede">Every client message goes through the same authoritative pipeline inside the match room. The client can request a move; it can never decide the outcome.</div>
      <div class="ends"><span>Client sends: play-tile · draw · pass · resign</span><span>Players receive: accepted + redacted snapshots</span></div>
      <div class="cols">${steps
        .map(
          ([title, text], i) =>
            `<div class="panel st"><div class="n">${String(i + 1).padStart(2, '0')}</div><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div></div>`,
        )
        .join('')}</div>
      <div class="foot">Turn timers and forfeits run on Durable Object alarms, not client clocks.</div>
    </div>`,
  ),
}

export const dominoesReward = {
  file: 'dominoes/reward-claim',
  slug: 'dominoes',
  width: 1280,
  html: page(
    `
    .canvas { width: 1280px; }
    .lanes { display: grid; grid-template-columns: 1fr 1fr 1.25fr; gap: 14px; margin-top: 26px; }
    .lane { padding: 16px 18px 20px; }
    .lane h2 { font: 600 20px Oswald, sans-serif; letter-spacing: .08em; text-transform: uppercase; padding-bottom: 10px; border-bottom: 1px solid #333; margin-bottom: 14px; }
    .m { padding: 10px 12px; margin-top: 10px; background: #121212; border: 1px solid #333; border-radius: 6px; font: 600 14.5px/1.45 Nunito, sans-serif; }
    .m small { display: block; font: 400 13px/1.4 Nunito, sans-serif; color: #a3a3a3; margin-top: 3px; }
    .branch { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 18px; }
    .b { padding: 16px 18px; }
    .b h3 { font: 700 14px Nunito, sans-serif; letter-spacing: .1em; text-transform: uppercase; color: #8a8a8a; }
    .b ul { margin: 8px 0 0 18px; padding: 0; font: 400 15px/1.55 Nunito, sans-serif; color: #d4d4d4; }
    `,
    `<div class="canvas">
      <div class="eyebrow">Dominoes · Rewards</div>
      <h1>Exactly-once weekly reward claim</h1>
      <div class="lede">Retries and double-taps are safe because the guarantee lives in the database, not in the client or the request handler.</div>
      <div class="lanes">
        <div class="panel lane"><h2>Player client</h2>
          <div class="m">Request this week's reward<small>The player identity comes from the sign-in token, not the request.</small></div></div>
        <div class="panel lane"><h2>Worker route</h2>
          <div class="m">Authenticate and resolve the player<small>Never trusts a player id sent by the client.</small></div>
          <div class="m">Call the claim function<small>Passes player, week and the active reward definition.</small></div></div>
        <div class="panel lane"><h2>Database function</h2>
          <div class="m">Insert the claim, do nothing on conflict<small>Primary key is player + week, so only one row can ever exist.</small></div>
          <div class="m">Report whether this call created it<small>Returns the claim and an already-claimed flag.</small></div></div>
      </div>
      <div class="branch">
        <div class="panel b"><h3>First claim</h3><ul><li>Claim row is created.</li><li>A reward event is recorded under a unique idempotency key.</li><li>The cosmetic is granted; ownership is unique per player and item.</li></ul></div>
        <div class="panel b"><h3>Duplicate claim</h3><ul><li>The insert conflicts and changes nothing.</li><li>The response says it was already claimed.</li><li>No second row and no second grant are possible.</li></ul></div>
      </div>
      <div class="foot">A failed grant after a successful claim is repaired on the next request, because the claim records whether the reward was granted.</div>
    </div>`,
  ),
}
