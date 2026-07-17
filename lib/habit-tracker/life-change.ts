export interface LifeVision {
  northStar: string
  why: string
  weeklyFocus: string
  goals90: string[]
  phaseDone: boolean[]
}

export interface DailyIntentions {
  intention: string
  eveningWin: string
}

export const VISION_STORAGE_KEY = "streamq-life-vision"
export const DAILY_STORAGE_KEY = "streamq-life-daily"

export const DEFAULT_VISION: LifeVision = {
  northStar: "Disciplined, lean, and focused — someone who shows up every single day.",
  why: "WFH made me comfortable. Gym at night is my line. I'm done waiting to feel good in my body.",
  weeklyFocus: "Gym 5 nights + zero sugar + hit meal plan every day",
  goals90: [
    "Drop to 85 kg (first milestone)",
    "Never skip gym Mon–Sat",
    "Walk every hour during WFH",
    "Sleep by 11 PM, wake without snoozing",
  ],
  phaseDone: [false, false, false],
}

export const CHANGE_ROADMAP = [
  {
    title: "Phase 1 · Weeks 1–4",
    subtitle: "Foundation",
    items: [
      "Follow meal plan every day — no sugar, no fried food",
      "Gym 8–10 PM at least 4× per week",
      "Log weight every Sunday morning",
      "8,000 steps daily with hourly walk breaks",
    ],
  },
  {
    title: "Phase 2 · Weeks 5–12",
    subtitle: "Momentum",
    items: [
      "Hit 85 kg — adjust calories if plateau",
      "Gym 5–6× per week, progressive overload",
      "Deep work block daily during WFH",
      "Journal mood + reflection every night",
    ],
  },
  {
    title: "Phase 3 · Months 4–6",
    subtitle: "Transform",
    items: [
      "Reach 75 kg and maintain",
      "Identity shift: you are a healthy person now",
      "Review habits — remove what doesn't serve you",
      "Set your next 90-day challenge",
    ],
  },
] as const

export const CHANGE_RULES = [
  "One bad day doesn't ruin you — never miss twice in a row.",
  "Your evening gym session is non-negotiable. Protect 8–10 PM.",
  "Eat for your future body, not today's mood.",
  "Progress beats perfection. 70% consistency wins.",
] as const

export function loadVision(): LifeVision {
  try {
    const raw = localStorage.getItem(VISION_STORAGE_KEY)
    if (!raw) return DEFAULT_VISION
    const parsed = JSON.parse(raw) as Partial<LifeVision>
    return {
      northStar: parsed.northStar ?? DEFAULT_VISION.northStar,
      why: parsed.why ?? DEFAULT_VISION.why,
      weeklyFocus: parsed.weeklyFocus ?? DEFAULT_VISION.weeklyFocus,
      goals90: Array.isArray(parsed.goals90) ? parsed.goals90 : DEFAULT_VISION.goals90,
      phaseDone: CHANGE_ROADMAP.map((_, index) => Boolean(parsed.phaseDone?.[index])),
    }
  } catch {
    return DEFAULT_VISION
  }
}

export function saveVision(vision: LifeVision): void {
  localStorage.setItem(VISION_STORAGE_KEY, JSON.stringify(vision))
}

export function loadDailyLog(): Record<string, DailyIntentions> {
  try {
    const raw = localStorage.getItem(DAILY_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Record<string, DailyIntentions>)
      : {}
  } catch {
    return {}
  }
}

export function saveDailyLog(log: Record<string, DailyIntentions>): void {
  localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(log))
}

export function getTodayIntentions(today: string): DailyIntentions {
  const log = loadDailyLog()
  return log[today] ?? { intention: "", eveningWin: "" }
}

export function intentionsLogged(intentions: DailyIntentions): boolean {
  return Boolean(intentions.intention.trim() || intentions.eveningWin.trim())
}
