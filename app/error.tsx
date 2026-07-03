"use client"

import Link from "next/link"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <main id="main" className="section flex min-h-[60vh] flex-1 items-center justify-center bg-paper py-16">
      <div className="container-brand max-w-lg space-y-8 text-center">
        <div className="space-y-4">
          <span className="sticker">Error</span>
          <h1 className="section-title font-heading">Something went wrong</h1>
          <p className="body-copy">
            The page failed to load. You can try again, or head back to the homepage.
          </p>
          {process.env.NODE_ENV === "development" ? (
            <p className="font-mono text-sm text-ink-light">{error.message}</p>
          ) : null}
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-outline">
            Back home
          </Link>
        </div>
      </div>
    </main>
  )
}
