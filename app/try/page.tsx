import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TryOutStudio } from "@/components/try/try-out-studio"
import { TryJsonLd } from "@/components/seo/try-json-ld"
import { tryPageMetadata } from "@/lib/seo"
import { STREAMQ_CONTACT_EMAIL, STREAMQ_CONTACT_MAILTO } from "@/lib/site-links"

export const metadata: Metadata = tryPageMetadata

export default function TryPage() {
  return (
    <>
      <TryJsonLd />
      <main id="main" className="section-lg bg-paper">
        <div className="container-brand editorial-stack">
          <div className="max-w-3xl space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-heading text-sm font-bold text-ink-soft hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>

            <div className="space-y-3">
              <p className="eyebrow">Try it out</p>
              <h1 className="section-title font-heading">
                Test your HLS or DASH stream online
              </h1>
              <p className="body-copy">
                Paste a public DASH .mpd or HLS .m3u8 manifest and play it with @streamq/player
                using the demo license — the same React video SDK teams evaluate against Mux,
                Bitmovin, and JW Player workflows. Need a production key or integration help?
                Email{" "}
                <a
                  href={STREAMQ_CONTACT_MAILTO}
                  className="font-bold text-orange hover:underline"
                >
                  {STREAMQ_CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>

          <TryOutStudio />
        </div>
      </main>
    </>
  )
}
