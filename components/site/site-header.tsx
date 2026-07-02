import Link from "next/link"
import { MobileNav } from "@/components/site/mobile-nav"
import { STREAMQ_NPM_URL, STREAMQ_TRY_PATH } from "@/lib/site-links"

const navLinks = [
  { label: "Features", href: "#included" },
  { label: "Try out", href: STREAMQ_TRY_PATH },
  { label: "Docs", href: STREAMQ_NPM_URL, external: true },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Pricing", href: "#pricing" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/95 backdrop-blur-md">
      <div className="container-brand flex h-20 items-center justify-between gap-6">
        <Link href="/" className="font-heading text-2xl font-bold tracking-tight text-ink">
          StreamQ
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 xl:flex">
          {navLinks.map((link) =>
            "external" in link && link.external ? (
              <a
                key={link.label}
                href={link.href}
                className="font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={STREAMQ_NPM_URL}
            className="btn-primary hidden px-6 py-3.5 text-sm sm:inline-flex"
            rel="noopener noreferrer"
            target="_blank"
          >
            Install package
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
