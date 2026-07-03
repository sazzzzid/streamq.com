"use client"

import { useState } from "react"

interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <details
      className="card-static group"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        className="cursor-pointer list-none font-heading text-lg font-bold text-ink marker:content-none"
        aria-expanded={open}
      >
        <span className="flex items-start justify-between gap-4">
          <span>{question}</span>
          <span className="text-orange transition group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </span>
      </summary>
      <p className="body-copy mt-4 border-t border-line pt-4 text-base text-ink-soft">{answer}</p>
    </details>
  )
}
