import Link from "next/link"
import { HashLink } from "@/components/site/hash-link"
import { MobileNav } from "@/components/site/mobile-nav"
import { STREAMQ_GET_STARTED_PATH, STREAMQ_HOME_ANCHORS } from "@/lib/site-links"

const navLinks = [
  { label: "Live demo", href: STREAMQ_HOME_ANCHORS.player },
  { label: "Features", href: STREAMQ_HOME_ANCHORS.included },
  { label: "Benchmarks", href: STREAMQ_HOME_ANCHORS.benchmarks },
  { label: "Pricing", href: STREAMQ_HOME_ANCHORS.pricing },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-md">
      <div className="container-brand flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-ink">
          StreamQ
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 xl:flex">
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

        <div className="flex items-center gap-3">
          <Link href={STREAMQ_GET_STARTED_PATH} className="btn-primary hidden px-6 py-3.5 text-sm sm:inline-flex">
            Get license
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
