"use client"

import Link from "next/link"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <section className="section flex min-h-[50vh] flex-1 items-center justify-center bg-paper">
      <div className="container-brand max-w-lg space-y-6 text-center">
        <span className="sticker">Error</span>
        <h1 className="section-title font-heading">Something went wrong</h1>
        <p className="body-copy">
          The page failed to load. You can try again, or head back to the homepage.
        </p>
        {process.env.NODE_ENV === "development" ? (
          <p className="font-mono text-sm text-ink-light">{error.message}</p>
        ) : null}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-outline">
            Back home
          </Link>
        </div>
      </div>
    </section>
  )
}
