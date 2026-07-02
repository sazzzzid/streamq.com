export const heroPosterLine1 = "Stream"
export const heroPosterLine2 = "super."
export const heroKicker = "Production-ready video SDK"
export const heroWildLine = "Ship players with a penchant for quality."

export const heroTagline =
  "One npm package. One React component. Production-ready streaming."

export const heroSubtitle =
  "HLS, DASH, live streaming, cinematic UI, and sq_live_* license control — in one install."

export const heroBullets = [
  "HLS, DASH & live",
  "Ready-made UI",
  "License control",
] as const

export interface PerformanceStat {
  value: string
  label: string
  detail: string
}

export const performanceIntro = {
  eyebrow: "Performance",
  title: "Performance-first architecture",
  description:
    "Your homepage stays fast. The 200–300 KB streaming engine loads only when someone hits play.",
  sticker: "Built for speed",
} as const

export const performanceStats = [
  {
    value: "~79 KB",
    label: "gzip",
    detail: "Initial player — full UI + license gate",
  },
  {
    value: "Lazy",
    label: "on play",
    detail: "hls.js & Shaka load only when needed",
  },
  {
    value: "1",
    label: "package",
    detail: "npm install @streamq/player",
  },
  {
    value: "0",
    label: "CSS runtime",
    detail: "Plain --sq-* tokens, no CSS-in-JS",
  },
] as const satisfies readonly PerformanceStat[]

export interface PerformanceHighlight {
  id: string
  title: string
  summary: string
  accent: FeatureAccent
}

export const performanceHighlights = [
  {
    id: "lazy",
    title: "Lazy-loaded engines",
    summary:
      "Heavy streaming engines load only when playback starts — not on page load. HLS users never download Shaka; DASH users never download hls.js.",
    accent: "orange",
  },
  {
    id: "single",
    title: "Single package",
    summary:
      "One npm install — player, UI, adapters, and license validation. Integrate in an afternoon, not a quarter.",
    accent: "blue",
  },
  {
    id: "css",
    title: "No CSS-in-JS runtime",
    summary:
      "@streamq/player/baseline.css is static CSS. Theme with variables — no styled-components or emotion overhead.",
    accent: "green",
  },
  {
    id: "budgets",
    title: "CI bundle budgets",
    summary:
      "Strict size limits on every package in CI. Enterprise teams get proof that bundle growth is monitored.",
    accent: "yellow",
  },
  {
    id: "safari",
    title: "Safari native HLS",
    summary:
      "On Safari, HLS can play natively — often skipping hls.js entirely for better battery and faster start.",
    accent: "purple",
  },
  {
    id: "license",
    title: "Lightweight license check",
    summary:
      "Pass license=\"sq_live_*\" only. Validation runs in the background — we manage Firestore, not your team.",
    accent: "pink",
  },
] as const satisfies readonly PerformanceHighlight[]

export const howItWorks = [
  { step: "1", title: "Install", detail: "npm install @streamq/player" },
  { step: "2", title: "Configure", detail: "Add your sq_live_* key" },
  { step: "3", title: "Play", detail: "HLS, DASH, and live in one component" },
] as const

export type FeatureAccent = "orange" | "blue" | "green" | "yellow" | "purple" | "pink"

export interface Tier1Group {
  id: string
  title: string
  summary: string
  accent: FeatureAccent
  items: readonly string[]
}

export const tier1Groups = [
  {
    id: "commercial",
    title: "License control",
    summary: "Gate playback with sq_live_* keys. Revoke remotely — no redeploy.",
    accent: "orange",
    items: [
      "License-gated playback — requires sq_live_* key",
      "Remote activate / deactivate without redeploying",
      "Real-time license revoke",
      "Built-in license denied overlay",
      "Zero backend setup for your client app",
    ],
  },
  {
    id: "playback",
    title: "Streaming",
    summary: "HLS, DASH, and MP4 with adaptive quality and multi-audio.",
    accent: "blue",
    items: [
      "HLS, DASH & progressive MP4",
      "Lazy-loaded hls.js / Shaka engines",
      "ABR, manual quality & multi-audio",
      "Play, pause, seek, volume, autoplay",
      "Buffering recovery & source switching",
    ],
  },
  {
    id: "live",
    title: "Live",
    summary: "Live layout, jump-to-live, and edge detection built in.",
    accent: "yellow",
    items: [
      "Live mode layout",
      "Jump to live",
      "Live seekbar & edge detection",
      "Live badge & UX chrome",
    ],
  },
  {
    id: "subtitles",
    title: "Subtitles",
    summary: "Discover, toggle, and pick subtitle tracks from the stream.",
    accent: "green",
    items: [
      "Subtitle track discovery",
      "On/off toggle & synced overlay",
      "Subtitle picker in settings",
    ],
  },
  {
    id: "ux",
    title: "Player UI",
    summary: "Cinematic controls, 4 layouts, gestures, PiP, and fullscreen.",
    accent: "purple",
    items: [
      "Ready-made controls, overlays & settings",
      "4 layouts — default, compact, mobile, live",
      "Auto-hide controls, keyboard & touch gestures",
      "PiP, fullscreen & dynamic aspect ratio",
      "Settings for quality, audio & subtitles",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    summary: "Screen readers, keyboard nav, and high-contrast support.",
    accent: "pink",
    items: [
      "ARIA live regions",
      "Keyboard navigation & focus management",
      "High-contrast / forced-colors support",
    ],
  },
  {
    id: "integration",
    title: "Developer setup",
    summary: "baseline.css tokens, TypeScript, React 18+, one npm install.",
    accent: "orange",
    items: [
      "@streamq/player/baseline.css design tokens",
      "Override --sq-* CSS variables",
      "TypeScript API & React 18+",
      "Single package — no extra @streamq/* installs",
    ],
  },
] as const satisfies readonly Tier1Group[]

export const tier2Intro =
  "Premium adds DRM, analytics, custom UI, and white-label on top of the full @streamq/player SDK."

export interface EnterpriseHighlight {
  name: string
  detail: string
}

export const enterpriseHighlights = [
  { name: "DRM", detail: "Widevine, PlayReady, FairPlay" },
  { name: "Analytics & QoE", detail: "Startup, rebuffer, engagement events" },
  { name: "Custom UI SDK", detail: "Headless core, React hooks, UI blocks" },
  { name: "Casting & ads", detail: "Chromecast hooks & ad lifecycle" },
  { name: "Themes & white-label", detail: "@streamq/themes & custom tokens" },
  { name: "Enterprise SLA", detail: "Priority support & custom integrations" },
] as const satisfies readonly EnterpriseHighlight[]

export type ComparisonValue = "yes" | "no" | "dash" | string

export interface ComparisonRow {
  capability: string
  player: ComparisonValue
  enterprise: ComparisonValue
}

export const comparisonRows = [
  { capability: "HLS / DASH / MP4", player: "yes", enterprise: "yes" },
  { capability: "Live streaming", player: "yes", enterprise: "yes" },
  { capability: "Subtitles", player: "yes", enterprise: "yes" },
  { capability: "Cinematic UI", player: "yes", enterprise: "dash" },
  { capability: "License control", player: "yes", enterprise: "yes" },
  { capability: "Custom UI from scratch", player: "no", enterprise: "yes" },
  { capability: "DRM", player: "no", enterprise: "yes" },
  { capability: "Analytics / QoE", player: "no", enterprise: "yes" },
  { capability: "Casting", player: "no", enterprise: "yes" },
  { capability: "Ads", player: "no", enterprise: "yes" },
  { capability: "Thumbnails", player: "no", enterprise: "yes" },
  { capability: "Media Session", player: "no", enterprise: "yes" },
  {
    capability: "Full theme system",
    player: "Basic CSS tokens",
    enterprise: "@streamq/themes",
  },
  { capability: "White-label / SLA", player: "no", enterprise: "yes" },
] as const satisfies readonly ComparisonRow[]

export const pricingTiers = [
  {
    name: "Evaluation",
    monthlyPrice: "Free",
    yearlyPrice: "",
    audience: "Try before you buy",
    features: [
      "Demo sq_live_* license key",
      "All @streamq/player features",
      "Docs & quick-start examples",
    ],
    highlighted: false,
  },
  {
    name: "Player",
    monthlyPrice: "$49",
    yearlyPrice: "$499",
    audience: "License key, docs & integration help",
    features: [
      "Production sq_live_* license key",
      "Documentation & examples",
      "Help with integration",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    monthlyPrice: "$499",
    yearlyPrice: "$4,999",
    audience: "DRM-ready · all enterprise extensions",
    features: [
      "Everything in Player",
      "DRM — Widevine, PlayReady, FairPlay",
      "Analytics & QoE",
      "Custom UI SDK",
      "Casting, ads & thumbnails",
      "Media Session API",
      "Themes, white-label & enterprise SLA",
    ],
    highlighted: false,
  },
] as const

export const playerExample = [
  "npm install @streamq/player react react-dom",
  "",
  "import '@streamq/player/baseline.css'",
  "import { StreamqPlayer } from '@streamq/player'",
  "",
  "export function StreamqPlayerDemo() {",
  "  return (",
  "    <StreamqPlayer",
  "      fillViewport",
  "      license='sq_live_D8JK2LQ9MNP4' // Demo key only — replace with your production sq_live_* key",
  '      layout="default"',
  '      radius="none"',
  "      source={{",
  "        src: 'https://example.com/stream.mpd', // Your DASH .mpd or HLS .m3u8 URL",
  "        type: 'dash', // 'dash' for .mpd · 'hls' for .m3u8",
  "      }}",
  "      renderSubtitles",
  "      videoProps={{",
  "        crossOrigin: 'anonymous',",
  "        muted: true,",
  "        playsInline: true,",
  "        poster: '/posters/streamq-player-poster.png', // Optional poster before play",
  "        preload: 'metadata',",
  "      }}",
  "    />",
  "  )",
  "}",
].join("\n")
