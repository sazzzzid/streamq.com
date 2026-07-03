import { STREAMQ_DEMO_ANCHOR, STREAMQ_DOCS_URL, STREAMQ_NPM_URL } from "@/lib/site-links"
import { getGetStartedPath } from "@/lib/pricing-checkout"

export const partnersIntro = {
  eyebrow: "For agencies",
  title: "Studio — volume licensing for client work",
  description:
    "If you ship React video for multiple clients, Studio puts five production keys on one invoice with integration support. Standard software licensing — you deliver the player in client apps, each deployment gets its own sq_live_* key.",
  sticker: "Studio license",
} as const

export const agencyTrustNote =
  "StreamQ Studio is a B2B volume license for agencies and dev shops. It is not an affiliate, reseller, or referral program — you license the SDK for client projects you build and maintain."

export interface AgencyBenefit {
  title: string
  description: string
}

export const agencyBenefits = [
  {
    title: "One SDK across client projects",
    description:
      "Same @streamq/player component everywhere — HLS, DASH, live, and subtitles without rebuilding controls per client.",
  },
  {
    title: "One key per client app",
    description:
      "Each production deployment gets a dedicated sq_live_* key. Revoke access when a contract ends without touching the client codebase.",
  },
  {
    title: "Volume pricing on one invoice",
    description:
      "Five production keys included. Add more at $35/mo each when your active client roster grows.",
  },
  {
    title: "Onboarding for your team",
    description:
      "30-minute setup call plus integration help for Next.js, CMS embeds, and CDN manifest wiring.",
  },
  {
    title: "Client-ready theming",
    description:
      "Rebrand per client with --sq-* CSS tokens. Premium add-on available when a client needs white-label or DRM playback.",
  },
  {
    title: "Demo for proposals",
    description:
      "Link the streamq.in live player or npm docs in technical proposals — clients evaluate playback before sign-off.",
  },
] as const satisfies readonly AgencyBenefit[]

export const studioHowItWorks = {
  eyebrow: "How Studio works",
  title: "Licensed software for client delivery",
  description:
    "You integrate StreamQ into apps you build for clients. StreamQ licenses the player; your SOW covers integration, theming, and ongoing support.",
  steps: [
    {
      title: "Request Studio",
      detail:
        "One subscription covers five production keys on a single invoice — $199/mo or $1,999/yr.",
    },
    {
      title: "Assign keys per client",
      detail:
        "Provision one sq_live_* key per customer-facing app you deliver. Staging for the same app shares that key.",
    },
    {
      title: "Bill clients in your SOW",
      detail:
        "License cost is a line item alongside your development work. Many agencies pass through the license fee or bundle it into a retainer.",
    },
  ],
} as const

export const studioBillingOptions = {
  eyebrow: "Billing with clients",
  title: "Two common setups",
  options: [
    {
      name: "Agency-held license",
      detail:
        "Your studio holds Studio and assigns keys to client apps you host or maintain. Simple when you manage the React codebase.",
    },
    {
      name: "Client-owned license",
      detail:
        "Client purchases Player ($49/mo) or Premium ($499/mo) directly for their own app. You handle integration only — no middle layer.",
    },
  ],
} as const

export const whiteLabelKit = {
  eyebrow: "When clients need more",
  title: "Premium for specific deployments",
  description:
    "Upgrade an individual client app to Premium when they need DRM playback, analytics, custom UI SDK, or full white-label — independent of your Studio subscription.",
  items: [
    "DRM playback via StreamQ backend",
    "Analytics, QoE & custom UI SDK",
    "Full white-label and priority SLA",
    "Handoff documentation for client engineering teams",
  ],
  ctaPath: getGetStartedPath("premium"),
} as const

export interface VerticalPlaybook {
  tag: string
  title: string
  pitch: string
  hooks: readonly string[]
}

export const verticalPlaybooks = [
  {
    tag: "OTT / VOD",
    title: "Subscription video catalogs",
    pitch:
      "One React component for .m3u8 and .mpd catalogs — adaptive quality and subtitles without maintaining separate player integrations.",
    hooks: [
      "HLS + DASH in one API",
      "Subtitle picker in settings",
      "License gate for subscriber-only playback",
    ],
  },
  {
    tag: "Live events",
    title: "Sports, news, and broadcasts",
    pitch:
      "Live layout, jump-to-live, and seekbar edge detection in the same package as VOD.",
    hooks: [
      "Live badge and idle chrome fade",
      "Jump-to-live control",
      "Mobile and compact layouts",
    ],
  },
  {
    tag: "Corporate / training",
    title: "Licensed internal apps",
    pitch:
      "Gate training and internal video with sq_live_* keys. Revoke access when contracts end.",
    hooks: [
      "Built-in license denied overlay",
      "Remote key deactivate",
      "PiP and fullscreen for LMS embeds",
    ],
  },
] as const satisfies readonly VerticalPlaybook[]

export const pitchAssets = {
  eyebrow: "Resources",
  title: "For proposals and handoffs",
  description: "Share these with clients or internal teams during discovery and delivery.",
  assets: [
    {
      label: "Live demo",
      href: STREAMQ_DEMO_ANCHOR,
      description: "Homepage player for technical evaluation.",
      external: false,
    },
    {
      label: "npm documentation",
      href: STREAMQ_DOCS_URL,
      description: "Quick start, props API, HLS/DASH setup, and licensing.",
      external: true,
    },
    {
      label: "Package on npm",
      href: STREAMQ_NPM_URL,
      description: "@streamq/player install and README for technical appendices.",
      external: true,
    },
  ],
} as const

export const sowBoilerplate = `Video playback will use StreamQ Player (@streamq/player), a commercial React video SDK for HLS, DASH, live streaming, subtitles, and license-gated playback. The client receives a dedicated production sq_live_* license key for their deployment. [Agency name] provides integration, theming via CSS design tokens, and QA. StreamQ license fees: [Player / Studio / Premium — monthly or yearly per agreement]. CDN and manifest hosting remain the client's responsibility unless otherwise scoped.`

export const partnerOnboarding = {
  eyebrow: "Apply",
  title: "Request a Studio license",
  description:
    "Tell us about your agency and active client projects. We reply within one business day with Studio pricing and your production keys.",
  includes: [
    "5 production sq_live_* keys on one invoice",
    "30-min onboarding call for your team",
    "Integration help on active client projects",
    "Additional keys from $35/mo each",
  ],
} as const
