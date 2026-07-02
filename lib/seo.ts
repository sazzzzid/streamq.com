import type { Metadata } from "next"

export interface FaqItem {
  question: string
  answer: string
}

export const SITE_NAME = "StreamQ Player" as const

export const SITE_TAGLINE =
  "Commercial React video player SDK for HLS, DASH, live streaming, and OTT apps." as const

export const DEFAULT_OG_DESCRIPTION =
  "StreamQ Player is a production-ready React video SDK with cinematic UI, lazy-loaded HLS/DASH engines, built-in license control, and one npm install. Compare features with Mux, Bitmovin, and JW Player." as const

export const SEO_KEYWORDS = [
  "react video player",
  "react video player sdk",
  "hls player react",
  "dash player react",
  "commercial video player",
  "video player npm",
  "ott video player",
  "live streaming player",
  "video streaming sdk",
  "html5 video player api",
  "shaka player react",
  "hls.js react component",
  "video player with drm",
  "enterprise video player",
  "mux video player alternative",
  "bitmovin player alternative",
  "jw player alternative",
  "streamq player",
  "@streamq/player",
] as const

export const SEO_FAQS = [
  {
    question: "What is StreamQ Player?",
    answer:
      "StreamQ Player is a commercial React video SDK distributed on npm as @streamq/player. It ships a cinematic player UI, HLS and DASH playback, live streaming support, subtitle rendering, and built-in sq_live_* license validation in a single package.",
  },
  {
    question: "How does StreamQ compare to Mux, Bitmovin, and JW Player?",
    answer:
      "Mux, Bitmovin, and JW Player are established video infrastructure platforms with hosting, analytics, and DRM ecosystems. StreamQ focuses on a developer-first npm SDK: one React component, lazy-loaded streaming engines, static CSS theming, and license gating without Firebase setup on your side. Premium adds DRM and enterprise extensions for teams that need more than playback.",
  },
  {
    question: "Does StreamQ support HLS and DASH?",
    answer:
      "Yes. Pass a manifest URL with type hls for .m3u8 streams or type dash for .mpd streams. hls.js and Shaka Player load lazily on first play — only the engine you need is downloaded.",
  },
  {
    question: "Is StreamQ Player free to try?",
    answer:
      "Yes. Use the public demo license key on the homepage or paste your own DASH or HLS URL on the /try page. Production sq_live_* keys start at $49/month with documentation and integration help included.",
  },
  {
    question: "Does StreamQ include DRM?",
    answer:
      "The core @streamq/player package covers HLS, DASH, live mode, subtitles, and license control. Widevine, PlayReady, and FairPlay DRM are available on the Premium plan along with analytics, custom UI SDK, casting, ads, and white-label options.",
  },
  {
    question: "How big is the StreamQ Player bundle?",
    answer:
      "The initial @streamq/player preset is about 79 KB gzip including full UI and license gating. Heavy streaming engines are lazy-loaded when playback starts, keeping marketing pages and app shells fast.",
  },
  {
    question: "How do I install StreamQ Player in React?",
    answer:
      "Run npm install @streamq/player react react-dom, import @streamq/player/baseline.css once, then render <StreamqPlayer license=\"sq_live_*\" source={{ src, type }} />. See the npm package README for full API details.",
  },
] as const satisfies readonly FaqItem[]

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return "http://localhost:3000"
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    template: "%s | StreamQ Player",
  },
  description: DEFAULT_OG_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: "StreamQ", url: absoluteUrl("/") }],
  creator: "StreamQ",
  publisher: "StreamQ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    description: DEFAULT_OG_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamQ Player — React HLS & DASH Video SDK",
    description: DEFAULT_OG_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const homeMetadata: Metadata = {
  title:
    "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
  description: DEFAULT_OG_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    description: DEFAULT_OG_DESCRIPTION,
    url: "/",
  },
}

export const tryPageMetadata: Metadata = {
  title: "Try StreamQ Player — Test Your HLS or DASH URL Online",
  description:
    "Paste a public DASH .mpd or HLS .m3u8 URL and play it instantly with @streamq/player. Free demo license. Compare playback with Mux, Bitmovin, and JW Player workflows.",
  alternates: {
    canonical: "/try",
  },
  openGraph: {
    title: "Try StreamQ Player — Test HLS & DASH Manifests",
    description:
      "Live browser demo for @streamq/player. Paste your stream URL and validate playback before you integrate.",
    url: "/try",
  },
  keywords: [
    "test hls url online",
    "test dash mpd online",
    "react video player demo",
    "streamq player try",
    "hls player test",
    "dash player test",
  ],
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StreamQ",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    email: "imsazzid@gmail.com",
    sameAs: ["https://www.npmjs.com/package/@streamq/player"],
  }
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_TAGLINE,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: "StreamQ",
    },
  }
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Video Player SDK",
    operatingSystem: "Web, React 18+",
    description: DEFAULT_OG_DESCRIPTION,
    url: absoluteUrl("/"),
    downloadUrl: "https://www.npmjs.com/package/@streamq/player",
    softwareHelp: "https://www.npmjs.com/package/@streamq/player",
    offers: [
      {
        "@type": "Offer",
        name: "Player",
        price: "49",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "49",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "499",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "499",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
    ],
    featureList: [
      "HLS and DASH playback",
      "Live streaming",
      "Lazy-loaded hls.js and Shaka",
      "Cinematic React player UI",
      "Built-in license validation",
      "Subtitle rendering",
      "Safari native HLS",
      "DRM on Premium plan",
    ],
  }
}

export function buildFaqPageJsonLd(faqs: readonly FaqItem[] = SEO_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(items: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
