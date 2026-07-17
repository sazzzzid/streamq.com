"use client"

import { MessageCircle, TrendingDown, TrendingUp } from "lucide-react"
import { ScoreBreakdown } from "@/components/habit-tracker/progress-ring"
import { cn } from "@/lib/utils"
import { SUPPLEMENTS } from "@/lib/habit-tracker/daily-tracker"
import type { WeeklySummary } from "@/lib/habit-tracker/weekly-report"
import { formatWeeklyTrend } from "@/lib/habit-tracker/weekly-report"

interface WeeklyReportPanelProps {
  weekly: WeeklySummary
  whatsAppUrl: string
  onWhatsAppShare: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onCopy: () => void
}

export function WeeklyReportPanel({
  weekly,
  whatsAppUrl,
  onWhatsAppShare,
  onCopy,
}: WeeklyReportPanelProps) {
  const trendLabel = formatWeeklyTrend(weekly)
  const trendUp = weekly.trend !== null && weekly.trend > 0
  const trendDown = weekly.trend !== null && weekly.trend < 0

  return (
    <div className="ht-group-card ht-share-card ht-weekly-card">
      <div className="ht-weekly-head">
        <div>
          <p className="ht-share-heading">This week</p>
          <p className="ht-share-range">{weekly.rangeLabel}</p>
        </div>
        <div className="ht-weekly-score-pill">
          <span className="ht-weekly-score-value">{weekly.avgScore}</span>
          <span className="ht-weekly-score-label">{weekly.grade}</span>
        </div>
      </div>

      <p className="ht-weekly-message">{weekly.message}</p>

      <p className={cn("ht-weekly-trend", trendUp && "is-up", trendDown && "is-down")}>
        {trendUp ? <TrendingUp className="size-3.5" aria-hidden="true" /> : null}
        {trendDown ? <TrendingDown className="size-3.5" aria-hidden="true" /> : null}
        {trendLabel}
      </p>

      <div
        className="ht-weekly-chart"
        role="img"
        aria-label={`Seven day scores from ${weekly.days[0]?.dayLabel} to ${weekly.days[6]?.dayLabel}`}
      >
        {weekly.days.map((day) => (
          <div
            key={day.dateKey}
            className={cn("ht-weekly-bar-col", day.isToday && "is-today", !day.logged && "is-empty")}
          >
            <span className="ht-weekly-bar-value">{day.logged ? day.score : "—"}</span>
            <div className="ht-weekly-bar-track">
              <div className="ht-weekly-bar-fill" style={{ height: `${day.logged ? day.score : 0}%` }} />
            </div>
            <span className="ht-weekly-bar-label">{day.weekday}</span>
          </div>
        ))}
      </div>

      <ul className="ht-weekly-stats">
        <li>
          <span>Days logged</span>
          <strong>{weekly.daysLogged}/7</strong>
        </li>
        <li>
          <span>Best day</span>
          <strong>{weekly.bestScore || "—"}</strong>
        </li>
        <li>
          <span>Supplements</span>
          <strong>{weekly.supplementPct}%</strong>
        </li>
        <li>
          <span>Coding total</span>
          <strong>{weekly.totalCodingHours} hr</strong>
        </li>
      </ul>

      <div className="ht-weekly-section">
        <p className="ht-weekly-section-label">Category averages</p>
        <div className="ht-breakdown-card ht-weekly-breakdown">
          <ScoreBreakdown
            items={weekly.categories.map((item) => ({
              ...item,
              weight: 0,
              accent: "#5e6ad2",
            }))}
          />
        </div>
      </div>

      <ul className="ht-weekly-targets">
        <li>Protein goal · {weekly.targetHits.proteinDays}/7</li>
        <li>Calorie goal · {weekly.targetHits.calorieDays}/7</li>
        <li>Coding goal · {weekly.targetHits.codingDays}/7</li>
        <li>All supplements · {weekly.targetHits.fullSupplementDays}/7</li>
        <li>Study log · {weekly.studyDays}/7</li>
      </ul>

      <ul className="ht-weekly-days">
        {weekly.days.map((entry) => (
          <li key={entry.dateKey} className={cn(entry.isToday && "is-today", !entry.logged && "is-empty")}>
            <div className="ht-weekly-day-main">
              <span className="ht-weekly-day-date">
                {entry.weekday} {entry.dayLabel}
                {entry.isToday ? " · Today" : ""}
              </span>
              <span className="ht-weekly-day-score">
                {entry.logged ? `${entry.score} · ${entry.grade}` : "No data"}
              </span>
            </div>
            {entry.logged ? (
              <p className="ht-weekly-day-detail">
                {entry.supplementsTaken}/{SUPPLEMENTS.length} supp ·{" "}
                {entry.calories ?? "—"} kcal · {entry.proteinG ?? "—"}g · {entry.codingHours ?? "—"} hr
                {entry.hasStudyLog ? " · study ✓" : ""}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="ht-share-actions">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ht-btn ht-btn-whatsapp"
          onClick={onWhatsAppShare}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Send to WhatsApp
        </a>
        <button type="button" className="ht-btn" onClick={onCopy}>
          Copy report
        </button>
      </div>
    </div>
  )
}
