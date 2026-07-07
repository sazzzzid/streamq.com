import { STREAMQ_DEMO_LICENSE } from "@/lib/streamq-player-poster"

export const heroPosterLine1 = "Stream"
export const heroPosterLine2 = "super."
export const heroKicker = "Production-ready video SDK"
export const heroWildLine = "Ship players with a penchant for quality."

export const heroTagline =
  "One npm package. One React component. Production-ready streaming."

export const heroSubtitle =
  "HLS, DASH, live streaming, cinematic controls, and sq_live_* license control — signed CDN URLs on Premium."

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

export interface BenchmarkRow {
  metric: string
  streamq: string
  alternative: string
}

export const performanceBenchmarks = [
  {
    metric: "Initial JS (gzip)",
    streamq: "~79 KB",
    alternative: "200–400 KB+ (player + UI + adapters)",
  },
  {
    metric: "Streaming engine",
    streamq: "Lazy on first play",
    alternative: "Often bundled at page load",
  },
  {
    metric: "License gating",
    streamq: "Built-in sq_live_* check",
    alternative: "Custom backend + UI",
  },
  {
    metric: "Player UI",
    streamq: "4 preset layouts",
    alternative: "Build controls from scratch",
  },
  {
    metric: "Signed CDN URLs",
    streamq: "Premium — tokenized .m3u8 / .mpd",
    alternative: "Adapter patches per CDN",
  },
  {
    metric: "Time to first stream",
    streamq: "Under 5 minutes",
    alternative: "Days to weeks",
  },
  {
    metric: "CSS runtime",
    streamq: "Static baseline.css",
    alternative: "CSS-in-JS overhead common",
  },
] as const satisfies readonly BenchmarkRow[]

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
    id: "reels",
    title: "Reels/Short",
    summary: "9:16 portrait embeds and a vertical feed — same license gate and lazy engines.",
    accent: "pink",
    items: [
      "StreamqReelsFeed — vertical snap-scroll with windowed mounts",
      "Dynamic 9:16 aspect ratio from video metadata",
      "Portrait-safe viewport sizing — no letterbox hacks",
      "Per-clip posters, titles, and HLS/DASH sources",
      "Touch gestures and center playback feedback",
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
    summary: "Cinematic controls, 4 layouts, dynamic aspect ratio, gestures, PiP, and fullscreen.",
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

export type ComparisonValue = "yes" | "no" | "preset" | string

export interface ComparisonRow {
  capability: string
  player: ComparisonValue
  premium: ComparisonValue
}

export const comparisonRows = [
  { capability: "HLS / DASH / MP4", player: "yes", premium: "yes" },
  { capability: "Reels/Short (9:16)", player: "yes", premium: "yes" },
  { capability: "Signed CDN URLs", player: "no", premium: "yes" },
  { capability: "Live streaming", player: "yes", premium: "yes" },
  { capability: "Subtitles", player: "yes", premium: "yes" },
  { capability: "Player UI", player: "4 preset layouts", premium: "Custom UI SDK" },
  { capability: "License control", player: "yes", premium: "yes" },
  { capability: "Custom UI from scratch", player: "no", premium: "yes" },
  { capability: "DRM playback", player: "Clear streams", premium: "Widevine · PlayReady · FairPlay" },
  { capability: "Analytics / QoE", player: "no", premium: "yes" },
  { capability: "Casting", player: "no", premium: "yes" },
  { capability: "Ads", player: "no", premium: "yes" },
  { capability: "Thumbnails", player: "no", premium: "yes" },
  { capability: "Media Session", player: "no", premium: "yes" },
  {
    capability: "Full theme system",
    player: "Basic CSS tokens",
    premium: "@streamq/themes",
  },
  { capability: "White-label / SLA", player: "no", premium: "yes" },
] as const satisfies readonly ComparisonRow[]

export type TierBadgeTone = "neutral" | "pink" | "purple" | "green" | "blue"

export interface TierBadge {
  label: string
  tone: TierBadgeTone
}

export const reelsShortFeature = "Reels/Shorts UI format supported" as const

export interface PricingTier {
  slug: "evaluation" | "player" | "agency" | "premium"
  name: string
  monthlyPrice: string
  yearlyPrice: string
  audience: string
  badges: readonly TierBadge[]
  features: readonly string[]
  highlighted: boolean
}

export const pricingTiers = [
  {
    slug: "evaluation" as const,
    name: "Evaluation",
    monthlyPrice: "Free",
    yearlyPrice: "",
    audience: "Try the SDK before you buy",
    badges: [],
    features: [
      "Public demo sq_live_* key",
      "HLS, DASH, live & subtitles",
      reelsShortFeature,
      "Homepage live demo & npm docs",
    ],
    highlighted: false,
  },
  {
    slug: "player" as const,
    name: "Player",
    monthlyPrice: "$49",
    yearlyPrice: "$499",
    audience: "One production app · single license key",
    badges: [{ label: "Popular", tone: "neutral" }],
    features: [
      "1 production sq_live_* key",
      "HLS, DASH, live, subtitles & license gate",
      reelsShortFeature,
      "Cinematic UI with CSS theming",
      "Docs, examples & integration help",
    ],
    highlighted: true,
  },
  {
    slug: "agency" as const,
    name: "Studio",
    monthlyPrice: "$199",
    yearlyPrice: "$1,999",
    audience: "Dev shops · 5 client keys · one invoice",
    badges: [{ label: "For agencies", tone: "blue" }],
    features: [
      "5 production sq_live_* keys ($35/mo each extra)",
      "Same Player SDK on every client project",
      reelsShortFeature,
      "30-min onboarding call for your team",
      "Integration help on active client work",
      "Premium add-on per client when needed",
    ],
    highlighted: false,
  },
  {
    slug: "premium" as const,
    name: "Premium",
    monthlyPrice: "$499",
    yearlyPrice: "$4,999",
    audience: "Enterprise extensions · analytics & white-label",
    badges: [
      { label: "DRM", tone: "purple" },
      { label: "Signed URLs", tone: "green" },
    ],
    features: [
      "Everything in Player",
      "Signed CDN manifests — CloudFront, S3 & tokenized streams",
      "DRM — Widevine, PlayReady, FairPlay",
      "Analytics, QoE & custom UI SDK",
      "Casting, ads, thumbnails & Media Session",
      "Full themes, white-label & priority SLA",
    ],
    highlighted: false,
  },
] as const satisfies readonly PricingTier[]

export const playerExample = [
  "import '@streamq/player/baseline.css'",
  "import { StreamqPlayer } from '@streamq/player'",
  "",
  "export function App() {",
  "  return (",
  "    <StreamqPlayer",
  `      license="${STREAMQ_DEMO_LICENSE}" // Demo key only — replace with your production sq_live_* key`,
  '      layout="default"',
  "      source={{",
  "        src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',",
  "        type: 'hls',",
  "      }}",
  "      renderSubtitles",
  "      videoProps={{",
  "        crossOrigin: 'anonymous',",
  "        playsInline: true,",
  "        poster: '/posters/streamq-player-poster.png',",
  "      }}",
  "    />",
  "  )",
  "}",
].join("\n")
