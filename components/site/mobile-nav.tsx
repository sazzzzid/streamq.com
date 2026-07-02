"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { STREAMQ_CONTACT_MAILTO, STREAMQ_NPM_URL, STREAMQ_TRY_PATH } from "@/lib/site-links"

const navLinks = [
  { label: "Features", href: "#included" },
  { label: "Try out", href: STREAMQ_TRY_PATH },
  { label: "Docs", href: STREAMQ_NPM_URL, external: true },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Pricing", href: "#pricing" },
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

        <nav aria-label="Mobile navigation" className="mt-10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.label}>
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  className="text-lg font-bold text-ink"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="text-lg font-bold text-ink">
                  {link.label}
                </Link>
              )}
            </SheetClose>
          ))}

          <SheetClose asChild>
            <a
              href={STREAMQ_NPM_URL}
              className="btn-primary w-fit"
              rel="noopener noreferrer"
              target="_blank"
            >
              Install package
            </a>
          </SheetClose>

          <SheetClose asChild>
            <a href={STREAMQ_CONTACT_MAILTO} className="font-heading text-sm font-bold text-ink-soft">
              Contact sales
            </a>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
