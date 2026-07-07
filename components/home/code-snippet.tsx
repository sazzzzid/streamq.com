"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Highlight } from "prism-react-renderer"
import { streamqCodeTheme } from "@/lib/code-theme"
import { cn } from "@/lib/utils"

interface CodeSnippetProps {
  code: string
  filename?: string
  language?: string
  showLineNumbers?: boolean
}

const COPY_RESET_MS = 2000

export function CodeSnippet({
  code,
  filename = "App.tsx",
  language = "tsx",
  showLineNumbers = true,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const trimmedCode = code.trim()
  const lineCount = trimmedCode.split("\n").length

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(trimmedCode)
      setCopyError(false)
      setCopied(true)
      window.setTimeout(() => setCopied(false), COPY_RESET_MS)
    } catch {
      setCopied(false)
      setCopyError(true)
      window.setTimeout(() => setCopyError(false), COPY_RESET_MS)
    }
  }

  return (
    <figure className="code-snippet card-shell">
      <figcaption className="code-snippet-header">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="code-snippet-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <p className="truncate font-mono text-xs font-semibold text-ink">{filename}</p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="code-snippet-copy inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-white px-3 py-2 font-mono text-xs font-semibold text-ink-soft transition hover:text-ink"
            aria-label={
              copied
                ? "Copied to clipboard"
                : copyError
                  ? "Copy failed — select the code manually"
                  : "Copy code to clipboard"
            }
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green" aria-hidden="true" />
                Copied
              </>
            ) : copyError ? (
              <>Copy failed</>
            ) : (
              <>
                <Copy className="size-3.5" aria-hidden="true" />
                Copy
              </>
            )}
          </button>
          <span className="sticker text-xs">{language.toUpperCase()}</span>
        </div>
      </figcaption>

      <Highlight theme={streamqCodeTheme} code={trimmedCode} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              "code-snippet-body",
              showLineNumbers && "code-snippet-body--numbered",
            )}
            style={{ ...style, margin: 0 }}
            tabIndex={0}
            aria-label={`${filename} source code, ${lineCount} lines`}
          >
            <code>
              {tokens.map((line, lineIndex) => {
                const lineProps = getLineProps({ line })

                return (
                  <div key={lineIndex} className="code-snippet-line">
                    {showLineNumbers ? (
                      <span className="code-snippet-gutter" aria-hidden="true">
                        {lineIndex + 1}
                      </span>
                    ) : null}
                    <span
                      {...lineProps}
                      className={cn("code-snippet-line-content", lineProps.className)}
                    >
                      {line.map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                )
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </figure>
  )
}
