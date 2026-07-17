import type { Metadata, Viewport } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { HabitTrackerApp } from "@/components/habit-tracker/habit-tracker-app"
import { absoluteUrl } from "@/lib/seo"

const PATH = "/habit-tracker"
const TITLE = "Daily Tracker"
const DESCRIPTION =
  "Track supplements, daily calories and protein, coding hours, and what you studied."

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: PATH,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(PATH),
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
}

export default function HabitTrackerPage() {
  return (
    <>
      <header className="ht-toolbar">
        <div className="ht-toolbar-start">
          <Link href="/" className="ht-back">
            <ChevronLeft className="size-[22px]" strokeWidth={2.25} aria-hidden="true" />
            <span className="ht-back-label">Back</span>
          </Link>
        </div>
        <span className="ht-toolbar-title">Tracker</span>
      </header>

      <main id="main" className="ht-frame">
        <HabitTrackerApp />
      </main>
    </>
  )
}
