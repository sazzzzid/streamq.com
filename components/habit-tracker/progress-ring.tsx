"use client"

import { cn } from "@/lib/utils"

interface ScoreDisplayProps {
  value: number
  grade: string
  message: string
}

export function ScoreDisplay({ value, grade, message }: ScoreDisplayProps) {
  return (
    <div className="ht-score-display" aria-label={`Daily score ${value} out of 100`}>
      <div className="ht-score-main">
        <span className="ht-score-value">{value}</span>
        <span className="ht-score-max">/ 100</span>
      </div>
      <div className="ht-score-copy">
        <p className="ht-score-grade">{grade}</p>
        <p className="ht-score-message">{message}</p>
      </div>
    </div>
  )
}

interface MacroBarProps {
  label: string
  current: number | null
  target: number
  unit: string
  tone?: "default" | "warning" | "complete"
}

export function MacroBar({
  label,
  current,
  target,
  unit,
  tone = "default",
}: MacroBarProps) {
  const pct = current === null ? 0 : Math.min(100, Math.round((current / target) * 100))

  return (
    <div className={cn("ht-macro-bar", tone === "warning" && "is-warning", tone === "complete" && "is-complete")}>
      <div className="ht-macro-bar-head">
        <span>{label}</span>
        <strong>
          {current ?? "—"}
          <span>
            {" "}
            / {target}
            {unit}
          </span>
        </strong>
      </div>
      <div
        className="ht-macro-bar-track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} progress`}
      >
        <div className="ht-macro-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

interface ScoreBreakdownProps {
  items: Array<{
    id: string
    label: string
    score: number
    weight: number
    detail: string
  }>
}

export function ScoreBreakdown({ items }: ScoreBreakdownProps) {
  return (
    <ul className="ht-score-breakdown">
      {items.map((item) => (
        <li key={item.id} className="ht-score-row">
          <div className="ht-score-row-head">
            <span className="ht-score-row-label">{item.label}</span>
            {item.weight > 0 ? (
              <span className="ht-score-row-weight">{item.weight}%</span>
            ) : (
              <span className="ht-score-row-weight" aria-hidden="true" />
            )}
            <span className="ht-score-row-pct">{item.score}%</span>
          </div>
          <div
            className="ht-score-row-track"
            role="progressbar"
            aria-valuenow={item.score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${item.label} score`}
          >
            <div className="ht-score-row-fill" style={{ width: `${item.score}%` }} />
          </div>
          <p className="ht-score-row-detail">{item.detail}</p>
        </li>
      ))}
    </ul>
  )
}

/** @deprecated Legacy life-overview still imports this alias */
export function ProgressRing({ value }: { value: number; label?: string; gradientId?: string }) {
  return <ScoreDisplay value={value} grade="" message="" />
}
