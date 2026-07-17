import { formatDayHeading } from "@/lib/habit-tracker/day-utils"
import { todayKey } from "@/lib/habit-tracker/date-utils"
import {
  DEFAULT_TARGETS,
  SUPPLEMENTS,
  type DailyScore,
  type DayLog,
  type TrackerTargets,
} from "@/lib/habit-tracker/daily-tracker"

function supplementLines(log: DayLog): string[] {
  const taken = new Set(log.supplements)
  const done = SUPPLEMENTS.filter((item) => taken.has(item.id)).map((item) => item.name)
  const pending = SUPPLEMENTS.filter((item) => !taken.has(item.id)).map((item) => item.name)

  const lines = [`Supplements: ${log.supplements.length}/${SUPPLEMENTS.length}`]
  if (done.length) lines.push(`Done: ${done.join(", ")}`)
  if (pending.length) lines.push(`Pending: ${pending.join(", ")}`)
  return lines
}

export function formatDailyReport(
  day: DayLog,
  score: DailyScore,
  nextAction: string,
  targets: TrackerTargets = DEFAULT_TARGETS,
  dateKey?: string,
): string {
  const heading = formatDayHeading(dateKey ?? todayKey())

  const lines = [
    `Daily Tracker — ${heading}`,
    "",
    `Score: ${score.total}/100 (${score.grade})`,
    score.message,
    "",
    ...supplementLines(day),
    "",
    "Nutrition",
    `• Calories: ${day.calories ?? "—"} / ${targets.calorieTarget} kcal`,
    `• Protein: ${day.proteinG ?? "—"} / ${targets.proteinTargetG}g`,
    "",
    `Coding: ${day.codingHours ?? "—"} / ${targets.codingHoursTarget} hr`,
  ]

  const study = day.studyNotes.trim()
  lines.push("", study ? `Study log:\n${study}` : "Study log: —")
  lines.push("", `Next: ${nextAction}`)
  return lines.join("\n")
}

export function normalizeWhatsAppPhone(phone?: string): string | undefined {
  if (!phone?.trim()) return undefined

  let digits = phone.replace(/\D/g, "")
  if (!digits) return undefined

  if (digits.length === 10) digits = `91${digits}`
  if (digits.length < 11 || digits.length > 15) return undefined

  return digits
}

export function whatsAppShareUrl(text: string, phone?: string): string {
  const encoded = encodeURIComponent(text)
  const digits = normalizeWhatsAppPhone(phone)

  if (digits) {
    return `https://api.whatsapp.com/send?phone=${digits}&text=${encoded}`
  }

  return `https://api.whatsapp.com/send?text=${encoded}`
}

export function openWhatsAppReport(text: string, phone?: string): boolean {
  if (typeof window === "undefined") return false

  const url = whatsAppShareUrl(text, phone)
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  if (isMobile) {
    window.location.assign(url)
    return true
  }

  const popup = window.open(url, "_blank", "noopener,noreferrer")
  if (popup) return true

  window.location.assign(url)
  return true
}

export async function copyReportText(text: string): Promise<boolean> {
  if (typeof navigator.clipboard?.writeText === "function") {
    await navigator.clipboard.writeText(text)
    return true
  }

  return false
}

export function isValidWhatsAppPhone(phone?: string): boolean {
  if (!phone?.trim()) return true
  return normalizeWhatsAppPhone(phone) !== undefined
}
