"use client"

import Link from "next/link"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff9f0",
          color: "#141414",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
        }}
      >
        <main id="main" style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              display: "inline-block",
              marginBottom: "1rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "999px",
              border: "2px solid #141414",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Error
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem" }}>
            Something went wrong
          </h1>
          <p style={{ lineHeight: 1.6, color: "#4a4a4a", margin: "0 0 2rem" }}>
            The app hit an unexpected error. Try again or return to the homepage.
          </p>
          {process.env.NODE_ENV === "development" ? (
            <p style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#767676" }}>
              {error.message}
            </p>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                border: "2px solid #141414",
                borderRadius: "999px",
                background: "#e85a24",
                color: "#fff9f0",
                fontWeight: 700,
                padding: "0.75rem 1.25rem",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "2px solid #141414",
                borderRadius: "999px",
                background: "transparent",
                color: "#141414",
                fontWeight: 700,
                padding: "0.75rem 1.25rem",
                textDecoration: "none",
              }}
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
