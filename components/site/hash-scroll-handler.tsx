"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { scrollToSection } from "@/components/site/hash-link"

function scrollToHashFromLocation(retry = 0): void {
  const hash = window.location.hash.slice(1)

  if (!hash) {
    return
  }

  if (scrollToSection(hash)) {
    return
  }

  if (retry < 12) {
    window.setTimeout(() => scrollToHashFromLocation(retry + 1), 50)
  }
}

/** Scroll to hash after navigation and on browser back/forward. */
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    scrollToHashFromLocation()
  }, [pathname])

  useEffect(() => {
    const onHashChange = () => scrollToHashFromLocation()

    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  return null
}
