import { shiftDay, todayKey } from "@/lib/habit-tracker/date-utils"
import {
  computeDailyScore,
  emptyDayLog,
  gradeForScore,
  MIN_STUDY_NOTE_LENGTH,
  SUPPLEMENTS,
  type DayLog,
  type TrackerTargets,
} from "@/lib/habit-tracker/daily-tracker"
import { DEFAULT_TARGETS } from "@/lib/habit-tracker/settings"

export interface WeekDaySummary {
  dateKey: string
  weekday: string
  dayLabel: string
  isToday: boolean
  log: DayLog
  score: number
  grade: string
  logged: boolean
  supplementsTaken: number
  calories: number | null
  proteinG: number | null
  codingHours: number | null
  hasStudyLog: boolean
}

export interface WeeklyCategoryScore {
  id: string
  label: string
  score: number
  detail: string
}

export interface WeeklyTargetHits {
  proteinDays: number
  calorieDays: number
  codingDays: number
  fullSupplementDays: number
}

export interface WeeklySummary {
  rangeLabel: string
  grade: string
  message: string
  daysLogged: number
  avgScore: number
  bestScore: number
  bestDayLabel: string
  trend: number | null
  previousAvgScore: number | null
  supplementPct: number
  supplementDoses: number
  supplementTarget: number
  avgCalories: number | null
  calorieDays: number
  avgProtein: number | null
  proteinDays: number
  totalCodingHours: number
  codingDays: number
  studyDays: number
  categories: WeeklyCategoryScore[]
  targetHits: WeeklyTargetHits
  days: WeekDaySummary[]
}

function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function formatShortDate(dateKey: string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(parseDateKey(dateKey))
}

function formatWeekday(dateKey: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(parseDateKey(dateKey))
}

export function getWeekDayKeys(endDate: Date | string = new Date(), length = 7): string[] {
  const end = typeof endDate === "string" ? endDate : todayKey(endDate)
  return Array.from({ length }, (_, index) => shiftDay(end, index - (length - 1)))
}

export function getCurrentWeekDayKeys(endDate = new Date()): string[] {
  return getWeekDayKeys(endDate, 7)
}

function dayHasActivity(log: DayLog): boolean {
  return (
    log.supplements.length > 0 ||
    log.calories !== null ||
    log.proteinG !== null ||
    log.codingHours !== null ||
    log.studyNotes.trim().length > 0
  )
}

function average(values: number[]): number | null {
  if (values.length === 0) return null
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

function summarizeDays(
  dayKeys: string[],
  log: Record<string, DayLog>,
  today: string,
  targets: TrackerTargets,
): WeekDaySummary[] {
  return dayKeys.map((dateKey) => {
    const entry = log[dateKey] ?? emptyDayLog()
    const score = computeDailyScore(entry, targets)
    return {
      dateKey,
      weekday: formatWeekday(dateKey),
      dayLabel: formatShortDate(dateKey),
      isToday: dateKey === today,
      log: entry,
      score: score.total,
      grade: score.grade,
      logged: dayHasActivity(entry),
      supplementsTaken: entry.supplements.length,
      calories: entry.calories,
      proteinG: entry.proteinG,
      codingHours: entry.codingHours,
      hasStudyLog: entry.studyNotes.trim().length >= MIN_STUDY_NOTE_LENGTH,
    }
  })
}

function computeTargetHits(days: WeekDaySummary[], targets: TrackerTargets): WeeklyTargetHits {
  return days.reduce<WeeklyTargetHits>(
    (hits, day) => {
      if (day.proteinG !== null && day.proteinG >= targets.proteinTargetG) hits.proteinDays += 1
      if (day.calories !== null && day.calories <= targets.calorieTarget) hits.calorieDays += 1
      if (day.codingHours !== null && day.codingHours >= targets.codingHoursTarget) hits.codingDays += 1
      if (day.supplementsTaken === SUPPLEMENTS.length) hits.fullSupplementDays += 1
      return hits
    },
    { proteinDays: 0, calorieDays: 0, codingDays: 0, fullSupplementDays: 0 },
  )
}

function computeCategoryAverages(days: WeekDaySummary[], targets: TrackerTargets): WeeklyCategoryScore[] {
  const logged = days.filter((day) => day.logged)
  if (logged.length === 0) {
    return computeDailyScore(emptyDayLog(), targets).items.map((item) => ({
      id: item.id,
      label: item.label,
      score: 0,
      detail: "No data yet",
    }))
  }

  const totals = new Map<string, { label: string; sum: number; count: number }>()
  for (const day of logged) {
    const items = computeDailyScore(day.log, targets).items
    for (const item of items) {
      const current = totals.get(item.id) ?? { label: item.label, sum: 0, count: 0 }
      current.sum += item.score
      current.count += 1
      totals.set(item.id, current)
    }
  }

  const order = ["supplements", "nutrition", "coding", "study"]
  return order.map((id) => {
    const entry = totals.get(id)
    if (!entry) return { id, label: id, score: 0, detail: "—" }
    const score = Math.round(entry.sum / entry.count)
    return {
      id,
      label: entry.label,
      score,
      detail: categoryDetail(id, days, score),
    }
  })
}

function categoryDetail(id: string, days: WeekDaySummary[], score: number): string {
  switch (id) {
    case "supplements": {
      const doses = days.reduce((sum, day) => sum + day.supplementsTaken, 0)
      return `${doses}/${days.length * SUPPLEMENTS.length} doses · ${score}%`
    }
    case "nutrition": {
      const calories = days.flatMap((day) => (day.calories !== null ? [day.calories] : []))
      const protein = days.flatMap((day) => (day.proteinG !== null ? [day.proteinG] : []))
      return `${average(calories) ?? "—"} kcal · ${average(protein) ?? "—"}g avg`
    }
    case "coding": {
      const total = days.reduce((sum, day) => sum + (day.codingHours ?? 0), 0)
      return `${Math.round(total * 10) / 10} hr total · ${score}%`
    }
    case "study": {
      const count = days.filter((day) => day.hasStudyLog).length
      return `${count}/${days.length} days logged`
    }
    default:
      return `${score}%`
  }
}

function formatTrend(trend: number | null, previousAvgScore: number | null): string {
  if (trend === null || previousAvgScore === null) return "First week of data"
  if (trend > 0) return `Up ${trend} vs last week (${previousAvgScore} avg)`
  if (trend < 0) return `Down ${Math.abs(trend)} vs last week (${previousAvgScore} avg)`
  return `Flat vs last week (${previousAvgScore} avg)`
}

function formatDayLine(day: WeekDaySummary): string {
  if (!day.logged) return `${day.weekday} ${day.dayLabel}: —`

  const parts = [
    `${day.supplementsTaken}/${SUPPLEMENTS.length} supp`,
    day.calories !== null ? `${day.calories} kcal` : "— kcal",
    day.proteinG !== null ? `${day.proteinG}g` : "—g",
    day.codingHours !== null ? `${day.codingHours}hr` : "—hr",
    day.hasStudyLog ? "study ✓" : "study —",
  ]

  return `${day.weekday} ${day.dayLabel}: ${day.score}/100 — ${day.grade} | ${parts.join(" · ")}`
}

export function computeWeeklySummary(
  log: Record<string, DayLog>,
  endDate = new Date(),
  targets: TrackerTargets = DEFAULT_TARGETS,
): WeeklySummary {
  const today = todayKey(endDate)
  const dayKeys = getCurrentWeekDayKeys(endDate)
  const days = summarizeDays(dayKeys, log, today, targets)
  const loggedDays = days.filter((day) => day.logged)
  const scores = loggedDays.map((day) => day.score)
  const avgScore = average(scores) ?? 0

  const bestDay = loggedDays.reduce<WeekDaySummary | null>(
    (best, current) => (!best || current.score > best.score ? current : best),
    null,
  )

  const previousKeys = getWeekDayKeys(shiftDay(today, -7), 7)
  const previousDays = summarizeDays(previousKeys, log, today, targets)
  const previousScores = previousDays.filter((day) => day.logged).map((day) => day.score)
  const previousAvgScore = average(previousScores)
  const trend = previousAvgScore === null ? null : avgScore - previousAvgScore

  const supplementDoses = days.reduce((sum, day) => sum + day.supplementsTaken, 0)
  const supplementTarget = days.length * SUPPLEMENTS.length
  const calorieValues = days.flatMap((day) => (day.calories !== null ? [day.calories] : []))
  const proteinValues = days.flatMap((day) => (day.proteinG !== null ? [day.proteinG] : []))
  const codingValues = days.flatMap((day) => (day.codingHours !== null ? [day.codingHours] : []))
  const { grade, message } = gradeForScore(avgScore)

  const rangeLabel = `${formatShortDate(dayKeys[0])} – ${formatShortDate(dayKeys[6])}, ${parseDateKey(dayKeys[6]).getFullYear()}`

  return {
    rangeLabel,
    grade,
    message,
    daysLogged: loggedDays.length,
    avgScore,
    bestScore: bestDay?.score ?? 0,
    bestDayLabel: bestDay ? `${bestDay.weekday} ${bestDay.dayLabel}` : "—",
    trend,
    previousAvgScore,
    supplementPct: supplementTarget === 0 ? 0 : Math.round((supplementDoses / supplementTarget) * 100),
    supplementDoses,
    supplementTarget,
    avgCalories: average(calorieValues),
    calorieDays: calorieValues.length,
    avgProtein: average(proteinValues),
    proteinDays: proteinValues.length,
    totalCodingHours: Math.round(codingValues.reduce((sum, value) => sum + value, 0) * 10) / 10,
    codingDays: codingValues.length,
    studyDays: days.filter((day) => day.hasStudyLog).length,
    categories: computeCategoryAverages(days, targets),
    targetHits: computeTargetHits(days, targets),
    days,
  }
}

export function formatWeeklyReport(
  summary: WeeklySummary,
  targets: TrackerTargets = DEFAULT_TARGETS,
): string {
  const lines = [
    `Weekly Tracker — ${summary.rangeLabel}`,
    `Grade: ${summary.grade} · Avg ${summary.avgScore}/100`,
    summary.message,
    formatTrend(summary.trend, summary.previousAvgScore),
    "",
    `Consistency: ${summary.daysLogged}/7 days logged`,
    `Best day: ${summary.bestDayLabel}${summary.bestScore ? ` (${summary.bestScore})` : ""}`,
    "",
    "Category averages",
    ...summary.categories.map((item) => `• ${item.label}: ${item.score}/100 — ${item.detail}`),
    "",
    "Targets hit this week",
    `• Protein ${targets.proteinTargetG}g+: ${summary.targetHits.proteinDays}/7`,
    `• Calories ≤${targets.calorieTarget}: ${summary.targetHits.calorieDays}/7`,
    `• Coding ${targets.codingHoursTarget}hr+: ${summary.targetHits.codingDays}/7`,
    `• All supplements: ${summary.targetHits.fullSupplementDays}/7`,
    `• Study log: ${summary.studyDays}/7`,
    "",
    "Daily breakdown",
    ...summary.days.map(formatDayLine),
  ]

  return lines.join("\n")
}

export function formatWeeklyTrend(summary: WeeklySummary): string {
  return formatTrend(summary.trend, summary.previousAvgScore)
}
