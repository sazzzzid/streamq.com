import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MotionReveal } from "@/components/home/motion-reveal"
import { PlayerPreview } from "@/components/home/player-preview"
import {
  heroBullets,
  heroKicker,
  heroPosterLine1,
  heroPosterLine2,
  heroSubtitle,
  heroWildLine,
} from "@/lib/home-content"
import { STREAMQ_TRY_PATH } from "@/lib/site-links"

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="blob absolute -left-32 top-10 bg-yellow/35" aria-hidden="true" />
      <div className="blob absolute right-0 top-1/3 bg-orange/20" aria-hidden="true" />
      <div className="grid-pattern absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="container-brand editorial-grid relative z-10 items-center gap-12 lg:gap-20">
        <MotionReveal className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="sticker">@streamq/player</span>
            <span className="sticker-pink sticker text-xs">npm install</span>
          </div>

          <div className="space-y-3">
            <p className="poster-kicker">{heroKicker}</p>
            <h1 className="poster-title">
              <span className="block">{heroPosterLine1}</span>
              <span className="block text-orange">{heroPosterLine2}</span>
              <span className="sr-only">
                — StreamQ Player, React video SDK for HLS, DASH, and live streaming
              </span>
            </h1>
            <p className="poster-kicker text-orange">{heroWildLine}</p>
          </div>

          <p className="body-copy max-w-md">{heroSubtitle}</p>

          <ul className="flex flex-wrap gap-2">
            {heroBullets.map((item) => (
              <li key={item} className="pill-tag">
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={STREAMQ_TRY_PATH} className="btn-primary">
              Try it out
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link href="#pricing" className="btn-outline">
              View pricing
            </Link>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1} className="w-full" id="player">
          <div className="floating tilt-right">
            <PlayerPreview />
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
