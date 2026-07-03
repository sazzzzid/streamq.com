export const STREAMQ_DEMO_ANCHOR = "/#player" as const

export const STREAMQ_GET_STARTED_PATH = "/get-started" as const

export const STREAMQ_PARTNERS_PATH = "/partners" as const

export const STREAMQ_NPM_URL = "https://www.npmjs.com/package/@streamq/player" as const

/** npm package page — README is the primary docs surface today. */
export const STREAMQ_DOCS_URL = STREAMQ_NPM_URL

/** Homepage section anchors — always use absolute paths so links work from any route. */
export const STREAMQ_HOME_ANCHORS = {
  player: "/#player",
  install: "/#install",
  docs: "/#docs",
  example: "/#example",
  video: "/#video",
  benchmarks: "/#benchmarks",
  stories: "/#stories",
  support: "/#support",
  pricing: "/#pricing",
  faq: "/#faq",
  included: "/#included",
  enterprise: "/#enterprise",
} as const

export const STREAMQ_CONTACT_EMAIL = "imsazzid@gmail.com" as const

export const STREAMQ_CONTACT_MAILTO = `mailto:${STREAMQ_CONTACT_EMAIL}` as const
