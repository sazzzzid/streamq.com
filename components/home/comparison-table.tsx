"use client"

import { useState } from "react"
import { Check, ChevronDown, Minus } from "lucide-react"
import { ComparisonMobileList } from "@/components/home/comparison-mobile-list"
import { comparisonRows, type ComparisonValue } from "@/lib/home-content"
import { cn } from "@/lib/utils"

const PREVIEW_COUNT = 6

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center gap-1.5 font-bold text-green">
        <Check className="size-4 shrink-0" aria-hidden="true" />
        Yes
      </span>
    )
  }

  if (value === "no") {
    return (
      <span className="inline-flex items-center gap-1.5 text-ink-light">
        <Minus className="size-4 shrink-0" aria-hidden="true" />
        No
      </span>
    )
  }

  if (value === "preset") {
    return <span className="text-ink-soft">Preset layouts</span>
  }

  return <span className="text-ink-soft">{value}</span>
}

export function ComparisonTable() {
  const [expanded, setExpanded] = useState(false)
  const rows = expanded ? comparisonRows : comparisonRows.slice(0, PREVIEW_COUNT)

  return (
    <div className="space-y-4">
      <ComparisonMobileList rows={rows} />

      <div className="comparison-table-wrap hidden md:block">
        <table className="comparison-table">
          <caption className="sr-only">
            Player vs Premium — features and DRM playback
          </caption>
          <thead>
            <tr>
              <th scope="col">Capability</th>
              <th scope="col">Player</th>
              <th scope="col">Premium</th>
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
                  <ComparisonCell value={row.premium} />
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
          className="tap-target inline-flex items-center gap-2 rounded-full px-3 py-2 font-bold text-ink-soft transition hover:bg-paper hover:text-ink"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : `Show all ${comparisonRows.length} rows`}
          <ChevronDown className={cn("size-4 transition", expanded && "rotate-180")} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
