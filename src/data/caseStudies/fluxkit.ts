import type { CaseStudy } from '../types'

export const fluxkit: CaseStudy = {
  summary:
    'A local-first browser toolkit for working with files: tools run on the user’s device and nothing is uploaded. It is early, with one working tool (Merge PDF) inside a catalogue of fifty-one.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'Fluxkit (a working name) is a React and TypeScript app for everyday PDF, video, audio, image and document tasks, processed entirely in the browser. The privacy claim is enforced rather than promised: the page’s content security policy blocks network connections to anywhere but its own origin.',
    'The project is deliberately honest about its stage. The interface, workspace shell, queue and catalogue are in place, and Merge PDF is the one tool with a real processing engine. Every other tool says “Not available yet” instead of pretending.',
  ],
  keyFeatures: [
    {
      title: 'Tool catalogue',
      body: 'Fifty-one tools in six categories, with search, category filters and a toggle that hides planned tools. A tool is shown as available only when a processing engine is actually registered for it.',
    },
    {
      title: 'Merge PDF',
      body: 'Add several PDFs, reorder or remove them, merge in a worker, then reopen the result to confirm the page count before offering the download. Page thumbnails come from the files themselves.',
    },
    {
      title: 'Reusable workspace',
      body: 'One workspace shell handles file intake, previews, the job queue and result panels for every tool, so each new tool supplies an engine rather than a new screen.',
    },
    {
      title: 'Honest states',
      body: 'Tools without an engine still open, accept files for preview, and state plainly that they cannot process them yet.',
    },
  ],
  architecture: {
    summary:
      'A job state machine and a small engine-adapter contract separate the interface from the processing. Heavy work runs in workers, and progress is reported only when it is real.',
    diagram: {
      title: 'How a tool runs',
      description:
        'The workspace shell accepts files and creates a job. A registry maps the tool to an engine adapter. The adapter processes the files in a web worker on the device and reports progress, and the queue panel shows the result. No step makes a network request.',
      flow: [
        { label: 'Workspace shell', note: 'File intake, previews, queue panel' },
        { label: 'Job state machine', note: 'Queued, running, done, failed' },
        { label: 'Engine registry', note: 'A tool is available only if an engine is registered' },
        { label: 'Engine adapter', note: 'Runs in a web worker on the device (Merge PDF today)' },
      ],
    },
    points: [
      'The catalogue computes availability from the engine registry, so the UI cannot claim a tool that does not exist.',
      'A simulated engine used in development is checked to be absent from the production bundle.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Making “nothing is uploaded” checkable',
      body: 'A policy that only allows connections to the same origin, a search of the source for network calls, and browser tests that fail if the page contacts another origin.',
    },
    {
      title: 'Honest progress',
      body: 'Progress is shown only when the engine can report it, instead of a fake animation.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Registry-driven availability',
      body: 'Tool status comes from code rather than a hand-edited flag, which keeps the catalogue truthful as engines are added.',
    },
    {
      title: 'Workers for heavy work',
      body: 'Processing runs off the main thread so the interface stays responsive on large files.',
    },
  ],
  testing: [
    'A unit and component suite of 104 tests, run and passing.',
    'Playwright end-to-end specs for the merge flow, privacy behaviour, responsive layouts and accessibility with axe, plus a header check for the content security policy.',
    'Visual baselines at six widths in light and dark themes, used as regression guards rather than design comparisons. They run on Chromium on Windows, with Firefox and WebKit smoke tests only.',
  ],
  currentStatus:
    'Early development. The interface, catalogue, workspace, queue and the Merge PDF engine are built and tested. The other fifty tools are not yet functional.',
  scopeNotes: [
    'One working tool out of fifty-one. Audio, image and video workspaces are interface only.',
    'Not deployed and not yet on a public repository. The screenshots are real captures of the running app using generated sample PDFs.',
    'No manual screen-reader or keyboard-only testing has been documented yet.',
  ],
}
