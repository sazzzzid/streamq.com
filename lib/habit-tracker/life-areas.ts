export type LifeAreaId = "health" | "fitness" | "mind" | "work" | "sleep" | "growth"

export interface LifeArea {
  id: LifeAreaId
  label: string
  symbol: string
  accent: string
}

export const LIFE_AREAS: LifeArea[] = [
  { id: "health", label: "Health", symbol: "♥", accent: "#ff2d55" },
  { id: "fitness", label: "Fitness", symbol: "⚡", accent: "#30d158" },
  { id: "mind", label: "Mind", symbol: "◐", accent: "#bf5af2" },
  { id: "work", label: "Work", symbol: "▣", accent: "#0a84ff" },
  { id: "sleep", label: "Sleep", symbol: "☾", accent: "#5e5ce6" },
  { id: "growth", label: "Growth", symbol: "↑", accent: "#ff9f0a" },
]

export interface DefaultHabit {
  name: string
  area: LifeAreaId
}

export const DEFAULT_LIFE_HABITS: DefaultHabit[] = [
  { name: "Drink 3L water", area: "health" },
  { name: "No sugar / fried food", area: "health" },
  { name: "Gym 8–10 PM", area: "fitness" },
  { name: "8,000+ steps", area: "fitness" },
  { name: "Deep work block (WFH)", area: "work" },
  { name: "Walk break every hour", area: "work" },
  { name: "Sleep by 11 PM", area: "sleep" },
  { name: "Read or learn 20 min", area: "growth" },
  { name: "5 min quiet / breathe", area: "mind" },
]

export const MOOD_OPTIONS = [
  { value: 1, label: "Rough", emoji: "😔" },
  { value: 2, label: "Low", emoji: "😕" },
  { value: 3, label: "Okay", emoji: "😐" },
  { value: 4, label: "Good", emoji: "🙂" },
  { value: 5, label: "Great", emoji: "😄" },
] as const

export function getLifeArea(id: LifeAreaId): LifeArea {
  return LIFE_AREAS.find((area) => area.id === id) ?? LIFE_AREAS[0]
}
