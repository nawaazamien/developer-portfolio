import type { CaseStudy } from '../types'

export const youtubeAutomation: CaseStudy = {
  summary:
    'A local-first pipeline that turns a long-form video into verified clip candidates and an edit plan for vertical 9:16 shorts, using local speech recognition and a local language model.',
  role: 'Product and engineering owner (independent project)',
  overview: [
    'YouTube Automation takes a long-form video from a URL, normalises it, transcribes it, finds self-contained moments worth clipping, and prepares a controlled vertical edit. Everything runs on a local machine: speech recognition with faster-whisper and clip judgement with a local model served by Ollama.',
    'It is a clip-candidate selection and edit-planning pipeline. It does not publish or upload anything.',
  ],
  problem: [
    'Turning an hour of unstructured talk into a handful of coherent short clips is mostly judgement work. The challenge was making that judgement repeatable: deterministic stages, recorded decisions, and checks that catch bad cuts before anyone has to watch a render.',
  ],
  keyFeatures: [
    {
      title: 'Ingestion and normalisation',
      body: 'A metadata probe and download with yt-dlp, then conversion to an editing-friendly intermediate that preserves the source geometry. The vertical crop is deliberately not baked in.',
    },
    {
      title: 'Transcription',
      body: 'Word-level timestamps with faster-whisper, using the GPU when available and recording which device was actually used when it falls back.',
    },
    {
      title: 'Scouting and selection',
      body: 'A local model proposes candidate clips, and a second “director” pass marks each one select, maybe or reject, using structured output at temperature zero.',
    },
    {
      title: 'Verification',
      body: 'Separate checks for transcript consistency, audio, clip boundaries and related threads, so a clip does not end mid-thought or cut off its payoff.',
    },
    {
      title: 'Edit planning with DaVinci Resolve',
      body: 'Selected clips become an edit plan that Resolve executes through a scripting bridge. A conservative pass removes only unambiguous dead air.',
    },
    {
      title: 'Render validation',
      body: 'Deterministic checks on a finished render: exact dimensions, duration within tolerance, audio present and not silent, and no unexpected black frames.',
    },
  ],
  architecture: {
    summary:
      'A linear pipeline of independent stages. Each stage records a checksum of its inputs, so a rerun reuses unchanged work and a corrupted output marks only that stage stale.',
    diagram: {
      title: 'Pipeline',
      description:
        'A YouTube URL is downloaded with yt-dlp, normalised with FFmpeg, transcribed and segmented, then a local model served by Ollama proposes and judges clips. Selected clips are verified, turned into an edit plan for DaVinci Resolve, rendered as 9:16 video and validated.',
      flow: [
        { label: 'YouTube URL' },
        { label: 'yt-dlp', note: 'Probe and download' },
        { label: 'Normalise and transcribe', note: 'FFmpeg, faster-whisper' },
        { label: 'Segmentation', note: 'Utterances and content units' },
        { label: 'Local LLM', note: 'Ollama · Qwen — scout and director' },
        { label: 'Clip selection and verification' },
        { label: 'Edit plan', note: 'DaVinci Resolve edits and renders; it does not choose' },
        { label: 'Render validation', note: 'FFmpeg probes · 9:16 output' },
      ],
    },
    points: [
      'Semantic selection happens before Resolve. Resolve edits and renders but never decides what is a good clip.',
      'The language-model provider sits behind an interface and never silently falls back to a different model.',
    ],
  },
  engineeringChallenges: [
    {
      title: 'Making model judgement repeatable',
      body: 'At temperature zero the director’s decisions were identical across runs. At higher temperatures they changed depending on which candidates shared a prompt, so verification runs on one candidate at a time.',
    },
    {
      title: 'Honest limits of a text-only model',
      body: 'A local text model cannot hear or see the video. Audio and boundary checks therefore run deterministically against the source media, and the transcript checks are labelled for what they are.',
    },
    {
      title: 'Idempotent, restartable stages',
      body: 'Stage state is checksummed, so reruns are cheap and tampered or deleted outputs are detected and rebuilt rather than trusted.',
    },
    {
      title: 'Real-world tooling',
      body: 'Practical issues such as GPU library discovery on Windows, locating FFmpeg, console encoding and editor codec support each had to be diagnosed and pinned down.',
    },
  ],
  technicalDecisions: [
    {
      title: 'Normalise once, crop late',
      body: 'Keeping the source geometry until the edit stage means different vertical framings can be tried without re-processing the video.',
    },
    {
      title: 'Cut only what is clearly dead air',
      body: 'The edit plan removes long silences but keeps shorter pauses that may carry timing, preferring a clip that is slightly loose to one that is wrong.',
    },
  ],
  testing: [
    'Dozens of unit tests across ingestion, boundary resolution, verification, edit-list generation and render validation. The render checks are pure functions over probe output, so they run without FFmpeg or Resolve.',
    'Canary runs and stability reports compare prompt versions and model settings.',
  ],
  currentStatus:
    'A working prototype in active development. Going from a URL to verified candidate clips runs end to end; Resolve edits are an explicit, controlled step. There is no dashboard and no publishing step.',
  scopeNotes: [
    'No autonomous publishing: nothing is uploaded or posted.',
    'No third-party footage or transcripts are shown on this site.',
  ],
  lessons: [
    'Treating a language model as one noisy stage in a checked pipeline, rather than the pipeline itself, is what made the output trustworthy enough to build on.',
  ],
}
