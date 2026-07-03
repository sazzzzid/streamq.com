"use client"

import dynamic from "next/dynamic"
import type { ComponentProps, ComponentType } from "react"

function CodeSnippetFallback() {
  return (
    <figure className="code-snippet card-shell" aria-hidden="true">
      <figcaption className="code-snippet-header">
        <div className="flex items-center gap-2.5">
          <span className="code-snippet-dots">
            <span />
            <span />
            <span />
          </span>
          <p className="font-mono text-xs font-semibold text-ink">App.tsx</p>
        </div>
        <span className="sticker text-xs">TSX</span>
      </figcaption>
      <div className="code-snippet-body code-snippet-body--numbered space-y-0">
        {Array.from({ length: 14 }).map((_, index) => (
          <div key={index} className="code-snippet-line">
            <span className="code-snippet-gutter">{index + 1}</span>
            <span
              className="code-snippet-line-content block h-4 animate-pulse rounded bg-line/70"
              style={{ width: `${Math.max(28, 92 - index * 5)}%` }}
            />
          </div>
        ))}
      </div>
    </figure>
  )
}

export const LazyCodeSnippet = dynamic(
  () => import("@/components/home/code-snippet").then((mod) => mod.CodeSnippet),
  {
    ssr: false,
    loading: () => <CodeSnippetFallback />,
  },
) as ComponentType<ComponentProps<typeof import("@/components/home/code-snippet").CodeSnippet>>
