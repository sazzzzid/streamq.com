import type { Metadata } from "next"
import { pricingTiers } from "@/lib/home-content"
import { getStreamqPlayerVersion } from "@/lib/npm-package"
import {
  DEFAULT_OG_DESCRIPTION,
  OG_IMAGE_ALT,
  PRODUCTION_SITE_URL,
  SITE_BRAND,
  SITE_DOMAIN,
  SITE_PRODUCT_NAME,
  SITE_TAGLINE,
} from "@/lib/site-config"
import { STREAMQ_CONTACT_EMAIL, STREAMQ_NPM_URL } from "@/lib/site-links"

export interface FaqItem {
  question: string
  answer: string
}

export const SITE_NAME = SITE_PRODUCT_NAME

export { DEFAULT_OG_DESCRIPTION, SITE_TAGLINE }

export const SEO_KEYWORDS = [
  "streamq",
  "streamq.in",
  "streamq player",
  "@streamq/player",
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
  "react hls dash player sdk",
  "video player sdk india",
  "react video player agency",
  "white label video player",
] as const

export const SEO_FAQS = [
  {
    question: "What is StreamQ Player?",
    answer:
      "StreamQ Player is a commercial React video SDK distributed on npm as @streamq/player. It ships a cinematic player UI, HLS and DASH playback, live streaming support, subtitle rendering, and built-in sq_live_* license validation in a single package. Learn more at streamq.in.",
  },
  {
    question: "How does StreamQ compare to Mux, Bitmovin, and JW Player?",
    answer:
      "Mux, Bitmovin, and JW Player are established video infrastructure platforms with hosting, analytics, and DRM ecosystems. StreamQ focuses on a developer-first npm SDK: one React component, lazy-loaded streaming engines, static CSS theming, and license gating without Firebase setup on your side. Premium adds DRM playback support, analytics, and enterprise extensions.",
  },
  {
    question: "Does StreamQ support HLS and DASH?",
    answer:
      "Yes. Pass a manifest URL with type hls for .m3u8 streams or type dash for .mpd streams. hls.js and Shaka Player load lazily on first play — only the engine you need is downloaded.",
  },
  {
    question: "Is StreamQ Player free to try?",
    answer:
      "Yes. Use the public demo license key on the streamq.in homepage live player. Production sq_live_* keys start at $49/month with documentation and integration help included.",
  },
  {
    question: "Does StreamQ support DRM playback?",
    answer:
      "Yes, on Premium. StreamQ Player supports encrypted HLS and DASH playback (Widevine, PlayReady, FairPlay). StreamQ backend provides license servers and DRM configuration — you integrate the player SDK in React. Clear, non-encrypted streams work on Player and Premium without DRM setup.",
  },
  {
    question: "How big is the StreamQ Player bundle?",
    answer:
      "The initial @streamq/player preset is about 79 KB gzip including full UI and license gating. Heavy streaming engines are lazy-loaded when playback starts, keeping marketing pages and app shells fast.",
  },
  {
    question: "How do I install StreamQ Player in React?",
    answer:
      "Run npm install @streamq/player react react-dom, import @streamq/player/baseline.css once, then render <StreamqPlayer license=\"sq_live_*\" source={{ src, type }} />. Visit streamq.in for a live demo or get a production license.",
  },
  {
    question: "What support do I get with a license?",
    answer:
      "Every paid license includes integration help, documentation, and direct email support. License requests typically get a reply within one business day with your production sq_live_* key.",
  },
  {
    question: "Which plan should I choose?",
    answer:
      "Player ($49/mo) for one production app. Studio ($199/mo) for agencies with five client keys. Premium ($499/mo) when you need DRM playback, analytics, custom UI SDK, or white-label. Evaluation is free with the public demo key.",
  },
  {
    question: "Does one license cover staging and production?",
    answer:
      "Each production sq_live_* key is for one production deployment (one customer-facing app or domain). Staging and preview environments for the same app typically use the same key. Contact us if you need a separate non-production key.",
  },
  {
    question: "Do you work with agencies?",
    answer:
      "Yes. Studio is a volume license for React agencies and dev shops — five production keys from $199/mo on one invoice, plus onboarding and integration help. Each client app still needs its own sq_live_* key. Details at streamq.in/partners.",
  },
  {
    question: "Can we use one license across multiple client sites?",
    answer:
      "Each client deployment needs its own production sq_live_* key. Studio includes five keys on one invoice; additional keys are available from $35/mo each. Agencies typically hold the Studio license and provision keys per client project.",
  },
  {
    question: "Is white-label available?",
    answer:
      "Yes. Theme per client with --sq-* CSS tokens on any plan. Full white-label — removing StreamQ branding, @streamq/themes, and priority SLA — is included on Premium ($499/mo) or as a Premium add-on for Studio clients.",
  },
] as const satisfies readonly FaqItem[]

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }

  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_URL) {
    const vercelHost = process.env.VERCEL_URL.replace(/\/$/, "")

    if (vercelHost === SITE_DOMAIN || vercelHost === `www.${SITE_DOMAIN}`) {
      return PRODUCTION_SITE_URL
    }

    return `https://${vercelHost}`
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL
  }

  return "http://localhost:3000"
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl()
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`
}

function organizationId(): string {
  return `${absoluteUrl("/")}#organization`
}

function websiteId(): string {
  return `${absoluteUrl("/")}#website`
}

function softwareId(): string {
  return `${absoluteUrl("/")}#software`
}

const sharedOpenGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
  type: "image/png" as const,
}

function buildPageOpenGraph(
  title: string,
  description: string,
  path: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(path),
    siteName: SITE_NAME,
    title,
    description,
    images: [sharedOpenGraphImage],
  }
}

function buildSiteVerification(): Pick<Metadata, "verification"> {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

  if (!google && !bing) {
    return {}
  }

  return {
    verification: {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    },
  }
}

function buildPageTwitter(title: string, description: string): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  }
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_OG_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: SITE_BRAND, url: absoluteUrl("/") }],
  creator: SITE_BRAND,
  publisher: SITE_BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: buildPageOpenGraph(
    "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    DEFAULT_OG_DESCRIPTION,
    "/",
  ),
  twitter: buildPageTwitter(
    "StreamQ Player — React HLS & DASH Video SDK",
    DEFAULT_OG_DESCRIPTION,
  ),
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
  ...buildSiteVerification(),
}

export const homeMetadata: Metadata = {
  title: "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
  description: DEFAULT_OG_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: buildPageOpenGraph(
    "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    DEFAULT_OG_DESCRIPTION,
    "/",
  ),
  twitter: buildPageTwitter(
    "StreamQ Player | React Video SDK for HLS, DASH & Live Streaming",
    DEFAULT_OG_DESCRIPTION,
  ),
}

export const getStartedPageMetadata: Metadata = {
  title: "Get Started — StreamQ Player License",
  description:
    "Get a production sq_live_* license for @streamq/player at streamq.in. Self-serve checkout for Player ($49/mo) and Premium ($499/mo), Studio for agencies ($199/mo), or request a license key with integration help.",
  alternates: {
    canonical: "/get-started",
  },
  openGraph: buildPageOpenGraph(
    "Get Started — StreamQ Player License",
    "Choose Player or Premium, pick monthly or yearly billing, and get your production sq_live_* license for @streamq/player.",
    "/get-started",
  ),
  twitter: buildPageTwitter(
    "Get Started — StreamQ Player License",
    "Production sq_live_* licenses for @streamq/player — Player from $49/mo, Premium from $499/mo.",
  ),
  keywords: [
    "streamq.in",
    "streamq player license",
    "react video player pricing",
    "buy streamq license",
    "video player sdk pricing",
    "sq_live license key",
  ],
}

export const privacyPageMetadata: Metadata = {
  title: "Privacy Policy",
  description: "How StreamQ (streamq.in) collects and uses data on the marketing site.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: buildPageOpenGraph(
    "Privacy Policy — StreamQ",
    "How StreamQ collects and uses data on streamq.in.",
    "/privacy",
  ),
  twitter: buildPageTwitter(
    "Privacy Policy — StreamQ",
    "How StreamQ collects and uses data on streamq.in.",
  ),
  robots: {
    index: true,
    follow: true,
  },
}

export const partnersPageMetadata: Metadata = {
  title: "Studio for Agencies — StreamQ Volume Licensing",
  description:
    "StreamQ Studio for React agencies — five production keys on one invoice, onboarding, and integration help. B2B volume licensing for client video projects.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: buildPageOpenGraph(
    "Studio for Agencies — StreamQ Volume Licensing",
    "Volume licensing for agencies shipping React video — five client keys, integration support, one invoice.",
    "/partners",
  ),
  twitter: buildPageTwitter(
    "Studio for Agencies — StreamQ Volume Licensing",
    "StreamQ Studio — volume license for agencies with five production keys and integration help.",
  ),
  keywords: [
    "streamq studio license",
    "react video player agency",
    "agency video player sdk",
    "white label video player sdk",
  ],
  robots: {
    index: true,
    follow: true,
  },
}

export const termsPageMetadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the StreamQ marketing site and purchasing @streamq/player licenses.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: buildPageOpenGraph(
    "Terms of Service — StreamQ",
    "Terms for using streamq.in and purchasing StreamQ Player licenses.",
    "/terms",
  ),
  twitter: buildPageTwitter(
    "Terms of Service — StreamQ",
    "Terms for using streamq.in and purchasing StreamQ Player licenses.",
  ),
  robots: {
    index: true,
    follow: true,
  },
}

export function buildOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId(),
    name: SITE_BRAND,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    email: STREAMQ_CONTACT_EMAIL,
    sameAs: [STREAMQ_NPM_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: STREAMQ_CONTACT_EMAIL,
      availableLanguage: ["English"],
    },
  }
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId(),
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: SITE_TAGLINE,
    inLanguage: "en-US",
    publisher: {
      "@id": organizationId(),
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Get a StreamQ Player license",
        target: absoluteUrl("/get-started"),
      },
      {
        "@type": "ViewAction",
        name: "Try the live player demo",
        target: `${absoluteUrl("/")}#player`,
      },
    ],
  }
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": softwareId(),
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Video Player SDK",
    operatingSystem: "Web, React 18+",
    softwareVersion: getStreamqPlayerVersion(),
    description: DEFAULT_OG_DESCRIPTION,
    url: absoluteUrl("/"),
    downloadUrl: STREAMQ_NPM_URL,
    softwareHelp: STREAMQ_NPM_URL,
    author: {
      "@id": organizationId(),
    },
    offers: [
      {
        "@type": "Offer",
        name: "Evaluation",
        url: absoluteUrl("/#player"),
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Player",
        url: absoluteUrl("/get-started?plan=player"),
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
        url: absoluteUrl("/get-started?plan=premium"),
        price: "499",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "499",
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
      {
        "@type": "Offer",
        name: "Studio",
        url: absoluteUrl("/partners"),
        price: "199",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "199",
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
      "DRM playback on Premium plan",
    ],
  }
}

export function buildWebPageJsonLd({
  path,
  name,
  description,
}: {
  path: string
  name: string
  description: string
}) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": websiteId(),
    },
    about: {
      "@id": softwareId(),
    },
    inLanguage: "en-US",
  }
}

export function buildFaqPageJsonLd(faqs: readonly FaqItem[] = SEO_FAQS) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/")}#faq`,
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
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildProductJsonLd() {
  return {
    "@type": "Product",
    name: SITE_NAME,
    description: DEFAULT_OG_DESCRIPTION,
    brand: {
      "@type": "Brand",
      name: SITE_BRAND,
    },
    url: absoluteUrl("/"),
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "499",
      priceCurrency: "USD",
      offerCount: pricingTiers.length,
      url: absoluteUrl("/get-started"),
    },
  }
}

export function buildPartnersServiceJsonLd() {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl("/partners")}#service`,
    name: "StreamQ Studio — Agency Volume Licensing",
    description:
      "B2B volume licensing for React agencies — five production sq_live_* keys on one invoice with onboarding and integration help.",
    provider: {
      "@id": organizationId(),
    },
    areaServed: "Worldwide",
    serviceType: "B2B software licensing",
    offers: {
      "@type": "Offer",
      price: "199",
      priceCurrency: "USD",
      url: absoluteUrl("/partners"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "199",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  }
}

function parseTierPrice(value: string): string | null {
  const match = value.match(/\$(\d+)/)
  return match?.[1] ?? null
}

export function buildPricingOffersJsonLd() {
  const offers = pricingTiers.flatMap((tier) => {
    if (tier.slug === "evaluation") {
      return [
        {
          "@type": "Offer",
          name: "Evaluation — free",
          url: absoluteUrl("/#player"),
          price: "0",
          priceCurrency: "USD",
        },
      ]
    }

    const monthly = parseTierPrice(tier.monthlyPrice)
    const yearly = tier.yearlyPrice ? parseTierPrice(tier.yearlyPrice) : null
    const baseUrl =
      tier.slug === "agency"
        ? absoluteUrl("/partners")
        : absoluteUrl(`/get-started?plan=${tier.slug}`)

    const entries: Record<string, unknown>[] = []

    if (monthly) {
      entries.push({
        "@type": "Offer",
        name: `${tier.name} — monthly`,
        url: baseUrl,
        price: monthly,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: monthly,
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      })
    }

    if (yearly) {
      const yearlyUrl =
        tier.slug === "agency"
          ? absoluteUrl("/get-started?plan=agency&billing=yearly")
          : absoluteUrl(`/get-started?plan=${tier.slug}&billing=yearly`)

      entries.push({
        "@type": "Offer",
        name: `${tier.name} — yearly`,
        url: yearlyUrl,
        price: yearly,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: yearly,
          priceCurrency: "USD",
          unitText: "YEAR",
        },
      })
    }

    return entries
  })

  return {
    "@type": "Product",
    "@id": `${absoluteUrl("/get-started")}#product`,
    name: `${SITE_NAME} licenses`,
    description: "Production sq_live_* licenses for @streamq/player — Player, Studio, and Premium tiers.",
    brand: {
      "@type": "Brand",
      name: SITE_BRAND,
    },
    offers,
  }
}
