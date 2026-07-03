import Link from "next/link"
import { LegalPageJsonLd } from "@/components/seo/legal-page-json-ld"
import { SITE_BRAND, SITE_DOMAIN, SITE_PRODUCT_NAME } from "@/lib/site-config"
import { termsPageMetadata } from "@/lib/seo"
import { STREAMQ_CONTACT_EMAIL } from "@/lib/site-links"

export const metadata = termsPageMetadata

const TERMS_DESCRIPTION =
  "Terms for using the StreamQ marketing site (streamq.in) and purchasing @streamq/player licenses."

export default function TermsPage() {
  return (
    <>
      <LegalPageJsonLd
        path="/terms"
        name="Terms of Service — StreamQ"
        description={TERMS_DESCRIPTION}
        breadcrumbLabel="Terms of Service"
      />
      <main id="main" className="section-lg bg-paper">
      <div className="container-brand max-w-3xl editorial-stack">
        <div className="space-y-3">
          <p className="eyebrow">Legal</p>
          <h1 className="section-title font-heading">Terms of Service</h1>
            <p className="body-copy text-sm text-ink-light">Last updated: July 3, 2026</p>
        </div>

        <div className="body-copy space-y-6 text-base">
          <p>
            By using {SITE_DOMAIN}, you agree to these terms for the {SITE_PRODUCT_NAME} marketing
            site operated by {SITE_BRAND}.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Site use</h2>
            <p>
              Content on this site is provided for evaluation and purchase of {SITE_PRODUCT_NAME}{" "}
              licenses. Demo streams are third-party samples for testing only — do not redistribute
              or use them in production.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Licenses</h2>
            <p>
              Production use of @streamq/player requires a valid <code className="font-mono text-sm">sq_live_*</code>{" "}
              license. License terms, support scope, and entitlements are defined in your order
              confirmation and any separate license agreement provided at purchase.
            </p>
            <p>
              Each production <code className="font-mono text-sm">sq_live_*</code> key covers one
              production deployment — typically one customer-facing application or domain. Staging or
              preview environments for the same app generally use the same key unless otherwise
              agreed in writing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Payments</h2>
            <p>
              Self-serve checkout is handled by Stripe. Prices shown on the site are in USD unless
              stated otherwise. Refunds and billing disputes are handled according to your checkout
              receipt and applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Disclaimer</h2>
            <p>
              The site and demo player are provided &quot;as is&quot; without warranty. We may update
              pricing, features, or these terms with reasonable notice on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-ink">Contact</h2>
            <p>
              Legal or licensing questions:{" "}
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
