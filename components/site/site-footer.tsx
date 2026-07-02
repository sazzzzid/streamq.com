import Link from "next/link"
import { heroTagline } from "@/lib/home-content"
import {
  STREAMQ_CONTACT_EMAIL,
  STREAMQ_CONTACT_MAILTO,
  STREAMQ_NPM_URL,
  STREAMQ_TRY_PATH,
} from "@/lib/site-links"

const footerLinks = [
  { label: "Features", href: "#included" },
  { label: "Try out", href: STREAMQ_TRY_PATH },
  { label: "Docs", href: STREAMQ_NPM_URL, external: true },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: STREAMQ_CONTACT_MAILTO, external: true },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-paper py-16">
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
          <span className="sticker text-xs">Built for developers</span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-8">
            {footerLinks.map((link) => (
              <li key={link.label}>
                {"external" in link && link.external ? (
                  <a
                    href={link.href}
                    className="font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="font-heading text-sm font-bold text-ink-soft transition hover:text-ink"
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
