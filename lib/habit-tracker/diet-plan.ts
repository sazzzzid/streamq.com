export const WEIGHT_GOAL = {
  startKg: 92,
  targetKg: 75,
  heightFeet: 5,
  heightInches: 8,
} as const

export const DAILY_TARGETS = {
  calories: "1,850–2,000",
  proteinG: "150–170",
  waterL: 3,
  steps: 8000,
} as const

export interface MealSlot {
  id: string
  time: string
  title: string
  calories: number
  items: string[]
}

const WEEKDAY_LUNCH: Record<number, { protein: string; side: string }> = {
  1: { protein: "150g grilled chicken", side: "1 small roti + salad + vegetables" },
  2: { protein: "1.5 cup dal", side: "salad + 1 small roti" },
  3: { protein: "200g paneer + vegetables", side: "1 small roti" },
  4: { protein: "150g fish", side: "salad + ½ cup brown rice" },
  5: { protein: "150g chicken", side: "½ cup brown rice + vegetables" },
  6: { protein: "3 eggs (1 whole + 2 whites) omelette", side: "1 small roti + salad" },
  0: { protein: "150g chicken or dal", side: "vegetables + 1 small roti" },
}

const WEEKDAY_DINNER: Record<number, { protein: string; side: string }> = {
  1: { protein: "200g fish", side: "1 cup rice + vegetables" },
  2: { protein: "6 egg whites + 1 yolk", side: "2 roti + curd" },
  3: { protein: "200g chicken", side: "1 cup rice + vegetables" },
  4: { protein: "1.5 cup dal", side: "2 roti + salad" },
  5: { protein: "200g paneer", side: "vegetables + 1 cup rice" },
  6: { protein: "200g chicken", side: "1 cup rice + salad" },
  0: { protein: "200g chicken/fish/eggs", side: "roti or rice + vegetables" },
}

export function getMealsForDay(day = new Date()): MealSlot[] {
  const weekday = day.getDay()
  const lunch = WEEKDAY_LUNCH[weekday]
  const dinner = WEEKDAY_DINNER[weekday]

  return [
    {
      id: "breakfast",
      time: "8:00 AM",
      title: "Breakfast",
      calories: 450,
      items: [
        "2 egg whites + 1 whole egg omelette (onion/tomato)",
        "2 small multigrain roti or 4 tbsp oats with milk",
        "1 apple or orange",
      ],
    },
    {
      id: "lunch",
      time: "12:30 PM",
      title: "Lunch",
      calories: 550,
      items: [lunch.protein, lunch.side],
    },
    {
      id: "snack",
      time: "4:00 PM",
      title: "Pre-gym snack",
      calories: 200,
      items: ["1 banana + 10 almonds", "OR 1 slice bread + thin peanut butter"],
    },
    {
      id: "dinner",
      time: "10:15 PM",
      title: "Post-gym dinner",
      calories: 650,
      items: [dinner.protein, dinner.side, "Eat within 45 min after gym"],
    },
  ]
}

export const AVOID_LIST = [
  "Sugar in chai, cold drinks, sweets, biscuits",
  "Fried food (samosa, pakora, puri)",
  "Outside food more than 1–2× per week",
  "Late-night snacking after dinner",
  "Alcohol and liquid calories",
] as const

export const GYM_NOTES = [
  "Pre-gym (4 PM): carbs + little fat — banana + almonds",
  "During gym: water; electrolytes if sweating heavily",
  "Post-gym: 40–50g protein + 30–60g carbs within 45 minutes",
  "Don’t skip dinner after night gym — muscle loss risk",
] as const
