"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { HashLink } from "@/components/site/hash-link"
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
          className="btn-icon xl:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-paper">
        <SheetTitle className="text-left text-xl font-bold text-ink">StreamQ</SheetTitle>
        <SheetDescription className="sr-only">
          Main site navigation — demo, features, benchmarks, and pricing.
        </SheetDescription>

        <nav aria-label="Mobile navigation" className="mt-10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.label}>
              <HashLink href={link.href} className="text-lg font-bold text-ink">
                {link.label}
              </HashLink>
            </SheetClose>
          ))}

          <SheetClose asChild>
            <Link href={STREAMQ_GET_STARTED_PATH} className="btn-primary w-fit">
              Get license
            </Link>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
