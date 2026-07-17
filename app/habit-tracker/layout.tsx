import { HabitTrackerChrome } from "@/components/habit-tracker/habit-tracker-chrome"
import "./habit-tracker.css"

export default function HabitTrackerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="ht-shell">
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add("habit-tracker-route")`,
        }}
      />
      <HabitTrackerChrome />
      {children}
    </div>
  )
}
