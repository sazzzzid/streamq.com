"use client"

import { useState } from "react"
import { Check, ChevronDown, Minus } from "lucide-react"
import { comparisonRows, type ComparisonValue } from "@/lib/home-content"
import { cn } from "@/lib/utils"

const PREVIEW_COUNT = 6

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 font-bold text-green">
        <Check className="size-4" aria-hidden="true" />
        Yes
      </span>
    )
  }

  if (value === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-ink-light">
        <Minus className="size-4" aria-hidden="true" />
        No
      </span>
    )
  }

  if (value === "dash") {
    return <span className="text-ink-soft">Preset only</span>
  }

  return <span className="text-ink-soft">{value}</span>
}

export function ComparisonTable() {
  const [expanded, setExpanded] = useState(false)
  const rows = expanded ? comparisonRows : comparisonRows.slice(0, PREVIEW_COUNT)

  return (
    <div className="space-y-4">
      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <caption className="sr-only">
            Feature comparison between @streamq/player and enterprise extensions
          </caption>
          <thead>
            <tr>
              <th scope="col">Capability</th>
              <th scope="col">Player</th>
              <th scope="col">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.capability}>
                <th scope="row">{row.capability}</th>
                <td>
                  <ComparisonCell value={row.player} />
                </td>
                <td>
                  <ComparisonCell value={row.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {comparisonRows.length > PREVIEW_COUNT ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="inline-flex items-center gap-2 font-bold text-ink-soft transition hover:text-ink"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Show all ${comparisonRows.length} rows`}
          <ChevronDown className={cn("size-4 transition", expanded && "rotate-180")} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
