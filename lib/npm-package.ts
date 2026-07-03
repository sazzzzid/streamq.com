import sitePackage from "@/package.json"
import { STREAMQ_DEMO_LICENSE } from "@/lib/streamq-player-poster"

export const STREAMQ_NPM_INSTALL = "npm install @streamq/player react react-dom" as const

export function getStreamqPlayerVersion(): string {
  const range = sitePackage.dependencies["@streamq/player"]

  if (!range) {
    return "1.0.0"
  }

  const match = range.match(/(\d+\.\d+\.\d+)/)
  return match?.[1] ?? "1.0.0"
}

export const npmQuickStart = {
  install: STREAMQ_NPM_INSTALL,
  demoLicense: STREAMQ_DEMO_LICENSE,
  tryLine: `Try the public demo key: ${STREAMQ_DEMO_LICENSE}`,
} as const
