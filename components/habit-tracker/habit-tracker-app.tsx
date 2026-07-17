"use client"

import { useMemo, useState } from "react"
import { AlertCircle, Check, CheckCircle2 } from "lucide-react"
import { DayNavigator } from "@/components/habit-tracker/day-navigator"
import { ScoreBreakdown, ScoreDisplay } from "@/components/habit-tracker/progress-ring"
import { ReportsPanel } from "@/components/habit-tracker/reports-panel"
import { AppTabs, SettingsPanel } from "@/components/habit-tracker/settings-panel"
import { TrackNotesField, TrackNumberField } from "@/components/habit-tracker/track-field"
import { cn } from "@/lib/utils"
import { formatDayHeading, getCurrentStreak } from "@/lib/habit-tracker/day-utils"
import {
  copyReportText,
  formatDailyReport,
  isValidWhatsAppPhone,
  openWhatsAppReport,
  whatsAppShareUrl,
} from "@/lib/habit-tracker/daily-report"
import {
  computeDailyScore,
  emptyDayLog,
  getNextAction,
  SUPPLEMENTS,
  type DayLog,
} from "@/lib/habit-tracker/daily-tracker"
import { targetsFromSettings } from "@/lib/habit-tracker/settings"
import { todayKey } from "@/lib/habit-tracker/date-utils"
import { useTrackerLog } from "@/lib/habit-tracker/use-tracker-log"
import { useTrackerSettings } from "@/lib/habit-tracker/use-tracker-settings"
import { computeWeeklySummary, formatWeeklyReport } from "@/lib/habit-tracker/weekly-report"

function TrackerSkeleton() {
  return (
    <div className="ht-skeleton-stack" aria-hidden="true">
      <div className="ht-skeleton ht-skeleton-hero" />
      <div className="ht-skeleton ht-skeleton-card" />
      <div className="ht-skeleton-grid">
        <div className="ht-skeleton ht-skeleton-chip" />
        <div className="ht-skeleton ht-skeleton-chip" />
        <div className="ht-skeleton ht-skeleton-chip" />
        <div className="ht-skeleton ht-skeleton-chip" />
      </div>
    </div>
  )
}

export function HabitTrackerApp() {
  const { log, loadError, hydrated, saveStatus, updateLog } = useTrackerLog()
  const { settings, updateSettings, resetSettings } = useTrackerSettings()
  const [appTab, setAppTab] = useState<"track" | "reports" | "settings">("track")
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [shareHint, setShareHint] = useState<string | null>(null)

  const targets = useMemo(() => targetsFromSettings(settings), [settings])
  const today = todayKey()
  const day = log[selectedDate] ?? emptyDayLog()
  const isToday = selectedDate === today
  const score = useMemo(() => computeDailyScore(day, targets), [day, targets])
  const nextAction = useMemo(() => getNextAction(day, score, targets), [day, score, targets])
  const streak = useMemo(() => getCurrentStreak(log, targets), [log, targets])
  const weekly = useMemo(() => computeWeeklySummary(log, new Date(), targets), [log, targets])
  const dailyReportText = useMemo(
    () => formatDailyReport(day, score, nextAction, targets, selectedDate),
    [day, score, nextAction, targets, selectedDate],
  )
  const weeklyReportText = useMemo(
    () => formatWeeklyReport(weekly, targets),
    [weekly, targets],
  )
  const phone = settings.whatsappPhone
  const phoneIsValid = isValidWhatsAppPhone(phone)
  const dailyWhatsAppUrl = useMemo(
    () => whatsAppShareUrl(dailyReportText, phone || undefined),
    [dailyReportText, phone],
  )
  const weeklyWhatsAppUrl = useMemo(
    () => whatsAppShareUrl(weeklyReportText, phone || undefined),
    [weeklyReportText, phone],
  )

  function updateDay(patch: Partial<DayLog>) {
    updateLog((prev) => ({
      ...prev,
      [selectedDate]: { ...(prev[selectedDate] ?? emptyDayLog()), ...patch },
    }))
  }

  function toggleSupplement(id: string) {
    updateLog((prev) => {
      const current = prev[selectedDate] ?? emptyDayLog()
      const taken = current.supplements.includes(id)
      return {
        ...prev,
        [selectedDate]: {
          ...current,
          supplements: taken
            ? current.supplements.filter((item) => item !== id)
            : [...current.supplements, id],
        },
      }
    })
  }

  function markAllSupplements() {
    updateDay({ supplements: SUPPLEMENTS.map((item) => item.id) })
  }

  function handleWhatsAppShare(
    event: React.MouseEvent<HTMLAnchorElement>,
    reportText: string,
    label: string,
  ) {
    setShareHint(null)
    if (!phoneIsValid) {
      event.preventDefault()
      setShareHint("Fix your WhatsApp number in Settings.")
      setAppTab("settings")
      return
    }

    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    if (isMobile) {
      event.preventDefault()
      openWhatsAppReport(reportText, phone || undefined)
      setShareHint(`Opening ${label} in WhatsApp…`)
      return
    }
    setShareHint(`Opening ${label} in WhatsApp Web…`)
  }

  async function handleCopyReport(reportText: string, label: string) {
    setShareHint(null)
    try {
      const copied = await copyReportText(reportText)
      setShareHint(copied ? `${label} copied.` : `Could not copy ${label.toLowerCase()}.`)
    } catch {
      setShareHint(`Could not copy ${label.toLowerCase()}.`)
    }
  }

  if (!hydrated) {
    return <TrackerSkeleton />
  }

  const calorieWarning =
    day.calories !== null && day.calories > targets.calorieTarget
      ? `${day.calories - targets.calorieTarget} kcal over target`
      : undefined
  const proteinWarning =
    day.proteinG !== null && day.proteinG < targets.proteinTargetG
      ? `${targets.proteinTargetG - day.proteinG}g below target`
      : undefined

  return (
    <>
      {(loadError || saveStatus === "error") && (
        <div className="ht-banner ht-banner-error" role="alert">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          <p>{loadError ?? "Could not save on this device. Free up browser storage and try again."}</p>
        </div>
      )}

      <AppTabs tab={appTab} onChange={setAppTab} />

      {appTab === "track" ? (
        <>
          <DayNavigator
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            log={log}
            targets={targets}
          />

          <header className="ht-hero">
            <div className="ht-hero-top">
              <div className="ht-hero-meta">
                {streak > 0 ? (
                  <span className="ht-streak-pill">{streak} day streak</span>
                ) : (
                  <span className="ht-streak-pill ht-streak-pill-muted">Start your streak</span>
                )}
              </div>
              <p
                className={cn("ht-save-pill", saveStatus === "saved" && "is-visible")}
                aria-live="polite"
              >
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Saved
              </p>
            </div>

            <div className="ht-score-card ht-group-card">
              <ScoreDisplay value={score.total} grade={score.grade} message={score.message} />
            </div>

            <div className="ht-next-action" aria-live="polite">
              <span className="ht-next-action-label">Next</span>
              <p>{nextAction}</p>
            </div>
          </header>

          <section className="ht-group" aria-label="Score breakdown">
            <p className="ht-group-label">Breakdown</p>
            <div className="ht-group-card ht-breakdown-card">
              <ScoreBreakdown items={score.items} />
            </div>
          </section>

          <section className="ht-group" aria-labelledby="supplements-label">
            <div className="ht-section-head">
              <p id="supplements-label" className="ht-group-label">
                Supplements
              </p>
              <div className="ht-section-actions">
                <span className="ht-section-badge">
                  {day.supplements.length}/{SUPPLEMENTS.length}
                </span>
                {day.supplements.length < SUPPLEMENTS.length ? (
                  <button type="button" className="ht-link-btn" onClick={markAllSupplements}>
                    Mark all
                  </button>
                ) : null}
              </div>
            </div>
            <div className="ht-group-card ht-supplement-card">
              <ul className="ht-supplement-grid">
                {SUPPLEMENTS.map((item) => {
                  const taken = day.supplements.includes(item.id)
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleSupplement(item.id)}
                        className={cn("ht-supplement-chip", taken && "is-taken")}
                        aria-pressed={taken}
                      >
                        <span className={cn("ht-supplement-check", taken && "is-taken")}>
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="ht-supplement-name">{item.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          <section className="ht-group" aria-labelledby="nutrition-label">
            <div className="ht-section-head">
              <p id="nutrition-label" className="ht-group-label">
                Nutrition
              </p>
              <span className="ht-section-badge">
                {targets.calorieTarget} kcal · {targets.proteinTargetG}g
              </span>
            </div>
            <div className="ht-group-card ht-input-card">
              <TrackNumberField
                label="Calories"
                value={day.calories}
                unit="kcal"
                target={targets.calorieTarget}
                hint={`Target ${targets.calorieTarget} kcal`}
                warning={calorieWarning}
                onCommit={(value) => updateDay({ calories: value })}
              />
              <TrackNumberField
                label="Protein"
                value={day.proteinG}
                unit="g"
                target={targets.proteinTargetG}
                hint={`Target ${targets.proteinTargetG}g`}
                warning={proteinWarning}
                onCommit={(value) => updateDay({ proteinG: value })}
              />
            </div>
          </section>

          <section className="ht-group" aria-labelledby="coding-label">
            <div className="ht-section-head">
              <p id="coding-label" className="ht-group-label">
                Coding
              </p>
              <span className="ht-section-badge">{targets.codingHoursTarget} hr target</span>
            </div>
            <div className="ht-group-card ht-input-card">
              <TrackNumberField
                label="Hours"
                value={day.codingHours}
                unit="hr"
                target={targets.codingHoursTarget}
                hint={`Target ${targets.codingHoursTarget} hr`}
                onCommit={(value) => updateDay({ codingHours: value })}
              />
              <TrackNotesField
                key={selectedDate}
                label="What I studied today"
                value={day.studyNotes}
                placeholder="Topics, chapters, projects..."
                onChange={(value) => updateDay({ studyNotes: value })}
              />
            </div>
          </section>
        </>
      ) : null}

      {appTab === "reports" ? (
        <section className="ht-group" aria-label="Reports">
          <ReportsPanel
            dailyDateLabel={formatDayHeading(isToday ? today : selectedDate)}
            dailyScore={score.total}
            dailyGrade={score.grade}
            dailyMessage={score.message}
            dailyReportText={dailyReportText}
            dailyWhatsAppUrl={dailyWhatsAppUrl}
            weekly={weekly}
            weeklyReportText={weeklyReportText}
            weeklyWhatsAppUrl={weeklyWhatsAppUrl}
            shareHint={shareHint}
            onWhatsAppShare={handleWhatsAppShare}
            onCopyReport={handleCopyReport}
          />
        </section>
      ) : null}

      {appTab === "settings" ? (
        <section className="ht-group" aria-label="Settings">
          <SettingsPanel settings={settings} onUpdate={updateSettings} onReset={resetSettings} />
        </section>
      ) : null}

      <p className="ht-footnote">
        Data stays on this device. Streak counts days with score 50+.
      </p>
    </>
  )
}
