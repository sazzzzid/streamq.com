"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { WeeklyReportPanel } from "@/components/habit-tracker/weekly-report-panel"
import { cn } from "@/lib/utils"
import type { WeeklySummary } from "@/lib/habit-tracker/weekly-report"

type ReportTab = "daily" | "weekly"

interface ReportsPanelProps {
  dailyDateLabel: string
  dailyScore: number
  dailyGrade: string
  dailyMessage: string
  dailyReportText: string
  dailyWhatsAppUrl: string
  weekly: WeeklySummary
  weeklyReportText: string
  weeklyWhatsAppUrl: string
  shareHint: string | null
  onWhatsAppShare: (
    event: React.MouseEvent<HTMLAnchorElement>,
    reportText: string,
    label: string,
  ) => void
  onCopyReport: (reportText: string, label: string) => void
}

export function ReportsPanel({
  dailyDateLabel,
  dailyScore,
  dailyGrade,
  dailyMessage,
  dailyReportText,
  dailyWhatsAppUrl,
  weekly,
  weeklyReportText,
  weeklyWhatsAppUrl,
  shareHint,
  onWhatsAppShare,
  onCopyReport,
}: ReportsPanelProps) {
  const [tab, setTab] = useState<ReportTab>("daily")

  return (
    <div className="ht-report-stack">
      <div className="ht-report-tabs" role="tablist" aria-label="Report type">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "daily"}
          className={cn("ht-report-tab", tab === "daily" && "is-active")}
          onClick={() => setTab("daily")}
        >
          Daily
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "weekly"}
          className={cn("ht-report-tab", tab === "weekly" && "is-active")}
          onClick={() => setTab("weekly")}
        >
          Weekly
        </button>
      </div>

      {tab === "daily" ? (
        <div className="ht-group-card ht-share-card">
          <div className="ht-weekly-head">
            <div>
              <p className="ht-share-heading">Daily report</p>
              <p className="ht-share-range">{dailyDateLabel}</p>
            </div>
            <div className="ht-weekly-score-pill">
              <span className="ht-weekly-score-value">{dailyScore}</span>
              <span className="ht-weekly-score-label">{dailyGrade}</span>
            </div>
          </div>
          <p className="ht-weekly-message">{dailyMessage}</p>
          <div className="ht-share-actions">
            <a
              href={dailyWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ht-btn ht-btn-whatsapp"
              onClick={(event) => onWhatsAppShare(event, dailyReportText, "daily report")}
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Send to WhatsApp
            </a>
            <button type="button" className="ht-btn" onClick={() => onCopyReport(dailyReportText, "Daily report")}>
              Copy report
            </button>
          </div>
        </div>
      ) : (
        <WeeklyReportPanel
          weekly={weekly}
          whatsAppUrl={weeklyWhatsAppUrl}
          onWhatsAppShare={(event) => onWhatsAppShare(event, weeklyReportText, "weekly report")}
          onCopy={() => onCopyReport(weeklyReportText, "Weekly report")}
        />
      )}

      {shareHint ? <p className="ht-share-status">{shareHint}</p> : null}
    </div>
  )
}
