import type { CaseStudy } from '../types'

export const tinyMobileTower: CaseStudy = {
  summary:
    'A 3D survivor-style action game where a castle on wheels fights goblin swarms, built as a data-driven systems project in Godot 4.',
  role: 'Game and systems developer (independent project)',
  overview: [
    'Tiny Mobile Tower is an isometric 3D action roguelike made with Godot 4 and GDScript. The interesting engineering is underneath the art: a low-resolution pixel renderer, modular weapon systems, pooled projectiles and enemies, and a run structure driven entirely by data.',
  ],
  keyFeatures: [
    {
      title: '480×270 pixel renderer',
      body: 'The 3D world is rendered once into a low-resolution viewport with a texel-snapped camera, then upscaled with nearest-neighbour filtering while the interface stays full resolution.',
    },
    {
      title: 'Modular tower weapons',
      body: 'Weapon modules install onto mount sockets and can be swapped at runtime. Delivery types include pooled projectiles and chain lightning, whose arcs are resolved on cast and drawn as one mesh.',
    },
    {
      title: 'Enemy behaviours',
      body: 'Pooled enemy types including a shield goblin whose front guard is data-driven, fast and heavy variants, and a mini-boss with a telegraphed charge.',
    },
    {
      title: 'Run structure and bosses',
      body: 'A phased run timeline with a spawn director, time-based enemy scaling, reward chests and a boss arena.',
    },
    {
      title: 'Rarity-tiered upgrades',
      body: 'Upgrade drafts roll a rarity before the choice is shown, and every upgrade is built from generic effects rather than special-case code.',
    },
  ],
  engineeringChallenges: [
    {
      title: 'Performance at scale',
      body: 'The bottleneck was the CPU-side enemy simulation. A flat spatial grid, capped separation contacts and allocation-free updates cut the enemy tick at 400 goblins from about 21 ms to about 12 ms.',
    },
    {
      title: 'Measuring honestly',
      body: 'The pixel renderer cuts GPU cost a lot but is not a CPU win, which the benchmarks showed, so it was adopted for its look rather than as a performance claim.',
    },
  ],
  technicalDecisions: [
    {
      title: 'All gameplay numbers are data',
      body: 'Balance lives in Godot resource files, with run-scoped copies so shared definitions are never mutated, and composition is preferred over large scripts.',
    },
  ],
  testing: [
    'About two dozen headless smoke tests covering movement, combat, weapons, enemies, drafts, bosses and run structure.',
    'Stress and benchmark scripts for enemy counts, boss fights and the renderer, and automated multi-run balance simulations.',
  ],
  currentStatus:
    'Active development. Weapons, enemy types, the upgrade draft, mini-boss rewards and the first boss encounter are built. The final boss and later castle evolution are still open.',
  scopeNotes: ['This is a work in progress, not a released game.'],
  credits: [
    'Part of the art pipeline is AI-assisted: one boss model was generated with Meshy, an AI 3D generator, then processed and rigged. It is credited per Meshy’s attribution terms and does not appear in the screenshots here. The project’s focus is the systems.',
  ],
}

export const kingdomIncremental: CaseStudy = {
  summary:
    'An incremental kingdom builder in Godot 4 with a deterministic economy, offline progression and a versioned save format.',
  role: 'Game and systems developer (independent project)',
  overview: [
    'Kingdom Incremental is a mobile-first incremental game. A working forest estate grows through upgrades while workers fell and regrow trees, haul logs and sell timber for gold. The current build is a Forest Demo, with a combat prototype kept separate.',
  ],
  keyFeatures: [
    {
      title: 'Forest simulation',
      body: 'A tree lifecycle, worker AI that claims the nearest mature tree, log transport and a lumberyard that turns timber into gold.',
    },
    {
      title: 'Progression and landmarks',
      body: 'Upgrades and estate stages with landmarks and a completion milestone, plus an active Work Order ability.',
    },
    {
      title: 'Offline progression',
      body: 'Time away is converted into progress at a discounted rate with a cap and sanity guards, using the last stable income rate.',
    },
    {
      title: 'Versioned saves',
      body: 'A save codec with explicit versions, migration from older formats and atomic writes, so an interrupted save cannot corrupt progress.',
    },
    {
      title: 'Combat prototype',
      body: 'A separate battle page prototype, frozen in the demo build while the economy was proven.',
    },
  ],
  engineeringChallenges: [
    {
      title: 'Trustworthy offline maths',
      body: 'Offline progress has to be bounded and robust against bad data, with guards for invalid numbers, capped rates and a carried fractional remainder so nothing is lost or invented.',
    },
    {
      title: 'Restoring a live simulation',
      body: 'Saving and loading workers, trees and claims means rebuilding consistent state, and dropping a corrupt entry rather than failing the whole load.',
    },
    {
      title: 'Pacing as a tested property',
      body: 'A deterministic simulation harness plays the economy and tests assert pacing windows, so balance changes that break the intended curve fail the build.',
    },
  ],
  testing: [
    'A headless test harness with well over a hundred tests covering the economy, simulation, saves and offline progress.',
    'A pacing report generated by a deterministic simulation of balanced play.',
  ],
  currentStatus:
    'The Forest Demo (v0.1.0) is built, with Windows and Web export presets. The battle and wider kingdom features are not part of the demo.',
  credits: [
    'Stock art comes from the Tiny Swords pack by Pixel Frog, used as a development foundation while custom pixel art is introduced for the forest.',
  ],
}

export const tinySwordsEndlessSurvivor: CaseStudy = {
  summary:
    'An endless survivor roguelike in Godot 4 where a commander leads a growing squad against huge goblin hordes, with the engineering challenge of simulating hundreds of enemies at 60 FPS.',
  role: 'Game and systems developer (independent project)',
  overview: [
    'Tiny Swords — Endless Survivor is a 2D action game. One commander is followed by a permanent squad that grows through recruits and upgrades, while goblin waves, mini-bosses and rewards escalate. Most of the recent work has been on large-horde performance.',
  ],
  keyFeatures: [
    {
      title: 'Squad and classes',
      body: 'Warrior, archer, lancer and monk followers plus necromancer summons, moving in formation with support auras and per-class upgrade pools.',
    },
    {
      title: 'Combat systems',
      body: 'Engagement slots limit how many enemies attack one target, with target priority and stat modifiers kept in separate, testable modules.',
    },
    {
      title: 'Progression',
      body: 'XP and levels with one-of-three upgrade cards, repeatable upgrades, relics and mini-boss chests that offer recruits and relics.',
    },
    {
      title: 'Data-driven upgrades',
      body: 'Upgrades and relics are resource files, and the squad and effects are composed from them.',
    },
  ],
  engineeringChallenges: [
    {
      title: 'Large-horde performance',
      body: 'At about 300 goblins the game ran at around 7 FPS. Replacing per-enemy sensors with a shared crowd grid, moving goblins out of the physics space, running AI at different rates by distance and merging sprite sheets raised it to a median above 180 FPS at that size.',
    },
    {
      title: 'Reporting the result accurately',
      body: 'The strict goal of 60 FPS at 500 goblins passed in only some runs on a loaded machine, so it is recorded as near the threshold rather than as a clean pass.',
    },
  ],
  testing: [
    'About two dozen headless scene tests, one set per development phase.',
    'A windowed horde benchmark and a performance-correctness test that checks the fast paths against reference behaviour and confirms the game restarts cleanly.',
  ],
  currentStatus:
    'Active development. The latest work covers large-horde performance and a presentation pass.',
  credits: ['Art uses the Tiny Swords pack by Pixel Frog, used under its free-pack terms.'],
}

export const castleHold: CaseStudy = {
  summary:
    'A mobile-first tactical defence game where squads hold a castle courtyard against waves that attack from any direction.',
  role: 'Game and systems developer (independent project)',
  overview: [
    'Castle Hold places a castle at the centre of a circular courtyard. The player positions four squads anywhere in the zone to intercept enemies that arrive from any angle across ten authored waves and a boss. It began as a four-lane design and was reworked into free-zone defence.',
  ],
  keyFeatures: [
    {
      title: '360-degree defence',
      body: 'Squads can stand anywhere in the courtyard, and enemies spawn at any angle, with a threat preview for each incoming direction.',
    },
    {
      title: 'Routing around the castle',
      body: 'Units walk straight when the way is clear and otherwise take the shortest path around the castle, found with a small visibility graph.',
    },
    {
      title: 'Squad placement',
      body: 'A deterministic placement resolver enforces spacing between squads using a ring search and reserves other squads’ target points.',
    },
    {
      title: 'Radius combat and waves',
      body: 'Squads intercept enemies within a radius using limited block slots, with class abilities, a wave controller and a boss with a telegraphed attack.',
    },
    {
      title: 'Between-wave upgrades',
      body: 'A shop with seeded offers that always includes something affordable.',
    },
  ],
  engineeringChallenges: [
    {
      title: 'Placement that never overlaps',
      body: 'Dropping a squad at a crowded point must produce a valid, predictable position, which is covered by dedicated tests.',
    },
    {
      title: 'Balancing without a human',
      body: 'Scripted players of different skill levels are used to check difficulty, for example a passive player that falls early and a simple responder that reaches the last wave.',
    },
  ],
  testing: [
    'Headless tests for boot, field combat, placement spacing, the run economy, wave flow, the boss, audio and visual effects.',
  ],
  currentStatus:
    'Active development. Combat visual effects, full-run balance, the boss and an audio foundation are in place. Final audio is still to come.',
  credits: ['Art uses the Tiny Swords pack by Pixel Frog, used under its free-pack terms.'],
}
