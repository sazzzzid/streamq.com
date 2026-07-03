import Link from "next/link"
import { LegalPageJsonLd } from "@/components/seo/legal-page-json-ld"
import { SITE_BRAND, SITE_DOMAIN, SITE_PRODUCT_NAME } from "@/lib/site-config"
import { privacyPageMetadata } from "@/lib/seo"
import { STREAMQ_CONTACT_EMAIL } from "@/lib/site-links"

export const metadata = privacyPageMetadata

const PRIVACY_DESCRIPTION =
  "How StreamQ (streamq.in) collects and uses data on the marketing site for StreamQ Player."

export default function PrivacyPage() {
  return (
    <>
      <LegalPageJsonLd
        path="/privacy"
        name="Privacy Policy — StreamQ"
        description={PRIVACY_DESCRIPTION}
        breadcrumbLabel="Privacy Policy"
      />
      <main id="main" className="section-lg bg-paper">
      <div className="container-brand max-w-3xl editorial-stack">
        <div className="space-y-3">
          <p className="eyebrow">Legal</p>
          <h1 className="section-title font-heading">Privacy Policy</h1>
          <p className="body-copy text-sm text-ink-light">Last updated: July 1, 2026</p>
        </div>

        <div className="body-copy space-y-6 text-base">
          <p>
            This policy describes how {SITE_BRAND} ({SITE_DOMAIN}) handles information when you
            visit our marketing website for {SITE_PRODUCT_NAME}.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">What we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Analytics:</strong> We use Vercel Analytics and Speed Insights to measure
                page views and performance. These services may collect anonymized usage data such
                as pages visited, referrer, and device type.
              </li>
              <li>
                <strong>License requests:</strong> If you email us via the license request form,
                we receive the information you include in your email client (name, company, use
                case, etc.).
              </li>
              <li>
                <strong>Checkout:</strong> Payments are processed by Stripe. We do not store card
                details on this site. Stripe&apos;s privacy policy applies to checkout sessions.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Demo player</h2>
            <p>
              The live demo loads sample streams from third-party CDNs (e.g. Apple, Google). Those
              providers may log requests to their servers when you press play.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Cookies</h2>
            <p>
              This marketing site does not set first-party cookies for tracking. Vercel Analytics
              may use privacy-friendly, cookieless measurement where supported.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Contact</h2>
            <p>
              Questions about this policy:{" "}
              <a href={`mailto:${STREAMQ_CONTACT_EMAIL}`} className="font-bold text-orange hover:underline">
                {STREAMQ_CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <Link href="/" className="body-copy inline-block text-sm font-bold text-ink-soft hover:text-ink">
          ← Back home
        </Link>
      </div>
    </main>
    </>
  )
}
