import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HashLink } from "@/components/site/hash-link"
import { STREAMQ_DEMO_ANCHOR, STREAMQ_HOME_ANCHORS } from "@/lib/site-links"

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested does not exist on streamq.in.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main id="main" className="section flex min-h-[60vh] flex-1 items-center justify-center bg-paper py-16">
      <div className="container-brand max-w-lg space-y-8 text-center">
        <div className="space-y-4">
          <span className="sticker">404</span>
          <h1 className="section-title font-heading">Page not found</h1>
          <p className="body-copy">
            That URL doesn&apos;t exist — but you can try the live player demo, compare pricing, or
            head back to the homepage.
          </p>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <HashLink href={STREAMQ_DEMO_ANCHOR} className="btn-primary">
            Live demo
            <ArrowRight className="size-5" aria-hidden="true" />
          </HashLink>
          <HashLink href={STREAMQ_HOME_ANCHORS.pricing} className="btn-outline">
            View pricing
          </HashLink>
        </div>
        <Link href="/" className="body-copy inline-block text-sm font-bold text-ink-soft hover:text-ink">
          ← Back to home
        </Link>
      </div>
    </main>
  )
}
