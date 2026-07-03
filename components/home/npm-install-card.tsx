import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { CopyCommand } from "@/components/home/copy-command"
import { getStreamqPlayerVersion, npmQuickStart, STREAMQ_NPM_INSTALL } from "@/lib/npm-package"
import { STREAMQ_NPM_URL } from "@/lib/site-links"

export function NpmInstallCard() {
  const version = getStreamqPlayerVersion()

  return (
    <div className="card-static space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="eyebrow">npm package</p>
          <p className="font-heading text-lg font-bold text-ink">
            @streamq/player{" "}
            <span className="text-base font-bold text-ink-soft">v{version}</span>
          </p>
          <p className="body-copy text-sm text-ink-soft">{npmQuickStart.tryLine}</p>
        </div>
        <a
          href={STREAMQ_NPM_URL}
          className="btn-outline btn-sm shrink-0"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="View @streamq/player on npm (opens in new tab)"
        >
          View on npm
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>

      <CopyCommand command={STREAMQ_NPM_INSTALL} />

      <p className="body-copy text-sm text-ink-soft">
        Full docs on{" "}
        <a
          href={STREAMQ_NPM_URL}
          className="font-bold text-orange hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          npm
        </a>
        . Production keys at{" "}
        <Link href="/get-started" className="font-bold text-orange hover:underline">
          get-started
        </Link>
        .
      </p>
    </div>
  )
}
