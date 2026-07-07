"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { scrollToSection } from "@/components/site/hash-link"
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
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Live demo", href: STREAMQ_HOME_ANCHORS.player },
  { label: "Features", href: STREAMQ_HOME_ANCHORS.included },
  { label: "Benchmarks", href: STREAMQ_HOME_ANCHORS.benchmarks },
  { label: "Pricing", href: STREAMQ_HOME_ANCHORS.pricing },
] as const

function hashFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) {
    return null
  }

  return href.slice(hashIndex + 1) || null
}

function pathnameFromHref(href: string): string {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) {
    return href
  }

  return href.slice(0, hashIndex) || "/"
}

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const pendingHashRef = useRef<string | null>(null)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (nextOpen) {
      return
    }

    const hash = pendingHashRef.current
    pendingHashRef.current = null

    if (!hash) {
      return
    }

    window.requestAnimationFrame(() => {
      scrollToSection(hash)
    })
  }

  function handleNavClick(href: string) {
    const hash = hashFromHref(href)
    pendingHashRef.current = hash
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn("btn-icon lg:hidden", open && "relative z-[60]")}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-paper px-6 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        onCloseAutoFocus={(event) => {
          event.preventDefault()
        }}
      >
        <div className="flex items-center gap-2.5 pr-12">
          <StreamqMark className="size-8 shrink-0" />
          <SheetTitle className="text-left text-xl font-bold text-ink">StreamQ</SheetTitle>
        </div>
        <SheetDescription className="sr-only">
          Main site navigation — demo, features, benchmarks, and pricing.
        </SheetDescription>

        <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-2">
          {navLinks.map((link) => {
            const hash = hashFromHref(link.href)
            const isSamePage = pathnameFromHref(link.href) === pathname

            return (
              <a
                key={link.label}
                href={link.href}
                className="tap-target inline-flex items-center rounded-xl px-1 py-3 text-lg font-bold text-ink"
                onClick={(event) => {
                  if (!hash || !isSamePage) {
                    return
                  }

                  event.preventDefault()
                  handleNavClick(link.href)
                }}
              >
                {link.label}
              </a>
            )
          })}

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
