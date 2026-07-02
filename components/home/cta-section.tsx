import { ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/home/motion-reveal"
import {
  STREAMQ_CONTACT_EMAIL,
  STREAMQ_CONTACT_MAILTO,
  STREAMQ_NPM_URL,
} from "@/lib/site-links"

export function CtaSection() {
  return (
    <section id="cta" className="section-xl pb-24">
      <div className="container-brand">
        <MotionReveal>
          <div className="paper relative overflow-hidden border-2 border-ink bg-orange p-10 md:p-14">
            <div className="grid-pattern absolute inset-0 opacity-15" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-8 text-white md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <span className="sticker bg-white text-ink">Start free</span>
                <h2 className="section-title font-heading text-white">Ready to ship?</h2>
                <p className="max-w-lg text-lg leading-relaxed text-white/90">
                  Read the docs on npm, install the package, or email for a license key and
                  integration help.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={STREAMQ_NPM_URL}
                  className="btn-on-dark"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Docs &amp; install
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </a>
                <a href={STREAMQ_CONTACT_MAILTO} className="btn-outline-light">
                  Contact — {STREAMQ_CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
