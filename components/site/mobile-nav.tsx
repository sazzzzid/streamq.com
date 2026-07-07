"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { HashLink } from "@/components/site/hash-link"
import { StreamqMark } from "@/components/site/streamq-mark"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { STREAMQ_GET_STARTED_PATH, STREAMQ_HOME_ANCHORS } from "@/lib/site-links"

const navLinks = [
  { label: "Live demo", href: STREAMQ_HOME_ANCHORS.player },
  { label: "Features", href: STREAMQ_HOME_ANCHORS.included },
  { label: "Benchmarks", href: STREAMQ_HOME_ANCHORS.benchmarks },
  { label: "Pricing", href: STREAMQ_HOME_ANCHORS.pricing },
] as const

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="btn-icon lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-paper px-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center gap-2.5 pr-12">
          <StreamqMark className="size-8 shrink-0" />
          <SheetTitle className="text-left text-xl font-bold text-ink">StreamQ</SheetTitle>
        </div>
        <SheetDescription className="sr-only">
          Main site navigation — demo, features, benchmarks, and pricing.
        </SheetDescription>

        <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.label}>
              <HashLink
                href={link.href}
                className="tap-target inline-flex items-center rounded-xl px-1 py-3 text-lg font-bold text-ink"
              >
                {link.label}
              </HashLink>
            </SheetClose>
          ))}

          <SheetClose asChild>
            <Link href={STREAMQ_GET_STARTED_PATH} className="btn-primary btn-sm mt-4 w-fit">
              Get license
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
