import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { MotionReveal } from "@/components/home/motion-reveal"
import { STREAMQ_GET_STARTED_PATH } from "@/lib/site-links"

export function CtaSection() {
  return (
    <section id="cta" className="section-xl scroll-mt-header pb-24">
      <div className="container-brand">
        <MotionReveal>
          <div className="paper relative overflow-hidden border-2 border-ink bg-orange p-10 md:p-14">
            <div className="grid-pattern absolute inset-0 opacity-15" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-6 text-white md:flex-row md:items-center md:justify-between">
              <h2 className="section-title max-w-lg font-heading text-white">
                Ready for a production key?
              </h2>
              <Link href={STREAMQ_GET_STARTED_PATH} className="btn-on-dark shrink-0">
                Get started
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
