import Link from "next/link"
import { HashLink } from "@/components/site/hash-link"
import { heroTagline } from "@/lib/home-content"
import {
  STREAMQ_CONTACT_EMAIL,
  STREAMQ_CONTACT_MAILTO,
  STREAMQ_DOCS_URL,
  STREAMQ_GET_STARTED_PATH,
  STREAMQ_HOME_ANCHORS,
} from "@/lib/site-links"

const footerLinks = [
  { label: "Agencies", href: "/partners" },
  { label: "Pricing", href: STREAMQ_HOME_ANCHORS.pricing, hash: true },
  { label: "FAQ", href: STREAMQ_HOME_ANCHORS.faq, hash: true },
  { label: "Docs", href: STREAMQ_DOCS_URL, external: true },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: STREAMQ_CONTACT_MAILTO, external: true },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-paper py-16 pb-[max(4rem,env(safe-area-inset-bottom))]">
      <div className="container-brand flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-4">
          <p className="font-heading text-3xl font-bold text-ink">StreamQ</p>
          <p className="body-copy text-base">{heroTagline}</p>
          <a
            href={STREAMQ_CONTACT_MAILTO}
            className="body-copy inline-block text-base font-bold text-ink-soft hover:text-ink"
          >
            {STREAMQ_CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-4 sm:items-end">
          <Link href={STREAMQ_GET_STARTED_PATH} className="btn-primary w-fit">
            Get license
          </Link>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
            {footerLinks.map((link) => (
              <li key={link.label}>
                {"external" in link && link.external ? (
                  <a
                    href={link.href}
                    className="tap-target inline-flex items-center rounded-md py-2 font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    {...("external" in link && link.external && !link.href.startsWith("mailto:")
                      ? { "aria-label": `${link.label} (opens in new tab)` }
                      : {})}
                  >
                    {link.label}
                  </a>
                ) : "hash" in link && link.hash ? (
                  <HashLink
                    href={link.href}
                    className="tap-target inline-flex items-center rounded-md py-2 font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
                  >
                    {link.label}
                  </HashLink>
                ) : (
                  <Link
                    href={link.href}
                    className="tap-target inline-flex items-center rounded-md py-2 font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
