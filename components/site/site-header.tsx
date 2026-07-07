import Link from "next/link"
import { HashLink } from "@/components/site/hash-link"
import { MobileNav } from "@/components/site/mobile-nav"
import { StreamqMark } from "@/components/site/streamq-mark"
import { STREAMQ_GET_STARTED_PATH, STREAMQ_HOME_ANCHORS } from "@/lib/site-links"

const navLinks = [
  { label: "Live demo", href: STREAMQ_HOME_ANCHORS.player },
  { label: "Features", href: STREAMQ_HOME_ANCHORS.included },
  { label: "Benchmarks", href: STREAMQ_HOME_ANCHORS.benchmarks },
  { label: "Pricing", href: STREAMQ_HOME_ANCHORS.pricing },
] as const

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner container-brand">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2 font-heading text-xl font-bold tracking-tight text-ink sm:gap-2.5 sm:text-2xl"
        >
          <StreamqMark className="size-8 shrink-0 sm:size-9" />
          <span className="truncate">StreamQ</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <HashLink
              key={link.label}
              href={link.href}
              className="font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </HashLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href={STREAMQ_GET_STARTED_PATH} className="btn-primary btn-sm inline-flex max-sm:px-3 max-sm:text-xs">
            Get license
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
