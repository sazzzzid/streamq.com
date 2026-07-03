"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

const COPY_RESET_MS = 2000

interface CopyCommandProps {
  command: string
  className?: string
  mono?: boolean
}

export function CopyCommand({ command, className, mono = true }: CopyCommandProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command)
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
    <div
      className={cn(
        "flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-4 py-3",
        className,
      )}
    >
      <code
        className={cn(
          "min-w-0 flex-1 truncate text-sm text-ink",
          mono && "font-mono font-semibold",
        )}
      >
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="btn-icon shrink-0"
        aria-label={
          copied ? "Copied to clipboard" : copyError ? "Copy failed" : "Copy command to clipboard"
        }
      >
        {copied ? (
          <Check className="size-4 text-green" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
