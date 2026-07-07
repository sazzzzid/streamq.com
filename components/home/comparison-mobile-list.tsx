import { Check, Minus } from "lucide-react"
import type { ComparisonRow, ComparisonValue } from "@/lib/home-content"

function ComparisonValueDisplay({ value }: { value: ComparisonValue }) {
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

export function ComparisonMobileList({ rows }: { rows: readonly ComparisonRow[] }) {
  return (
    <ul className="data-mobile-list md:hidden">
      {rows.map((row) => (
        <li key={row.capability} className="data-mobile-item">
          <p className="data-mobile-title">{row.capability}</p>
          <dl className="data-mobile-meta">
            <div className="data-mobile-row">
              <dt>Player</dt>
              <dd>
                <ComparisonValueDisplay value={row.player} />
              </dd>
            </div>
            <div className="data-mobile-row">
              <dt>Premium</dt>
              <dd>
                <ComparisonValueDisplay value={row.premium} />
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}

export function BenchmarkMobileList({
  rows,
}: {
  rows: readonly { metric: string; streamq: string; alternative: string }[]
}) {
  return (
    <ul className="data-mobile-list md:hidden">
      {rows.map((row) => (
        <li key={row.metric} className="data-mobile-item">
          <p className="data-mobile-title">{row.metric}</p>
          <dl className="data-mobile-meta">
            <div className="data-mobile-row">
              <dt>@streamq/player</dt>
              <dd className="font-bold text-ink">{row.streamq}</dd>
            </div>
            <div className="data-mobile-row">
              <dt>Typical DIY</dt>
              <dd className="text-ink-soft">{row.alternative}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
