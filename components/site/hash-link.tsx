"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { AnchorHTMLAttributes, ComponentProps, MouseEvent } from "react"

function parseHashHref(href: string): { pathname: string; hash: string | null } {
  const hashIndex = href.indexOf("#")

  if (hashIndex === -1) {
    return { pathname: href, hash: null }
  }

  return {
    pathname: href.slice(0, hashIndex) || "/",
    hash: href.slice(hashIndex + 1) || null,
  }
}

export function scrollToSection(hash: string): boolean {
  if (!hash) {
    return false
  }

  const target = document.getElementById(hash)

  if (!target) {
    return false
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  })

  const nextUrl = `${window.location.pathname}${window.location.search}#${hash}`
  window.history.replaceState(null, "", nextUrl)
  return true
}

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
}

export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const pathname = usePathname()
  const { pathname: targetPath, hash } = parseHashHref(href)

  if (!hash) {
    return <Link href={href} onClick={onClick} {...props} />
  }

  const fullHref = `${targetPath}#${hash}`
  const isSamePage = targetPath === pathname

  if (isSamePage) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      scrollToSection(hash)
      onClick?.(event as unknown as MouseEvent<HTMLAnchorElement>)
    }

    return (
      <a href={`#${hash}`} onClick={handleClick} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />
    )
  }

  return (
    <a href={fullHref} onClick={onClick} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />
  )
}
