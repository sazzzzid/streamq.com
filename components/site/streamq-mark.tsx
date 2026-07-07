import { cn } from "@/lib/utils"

export interface StreamqMarkProps {
  className?: string
  title?: string
  decorative?: boolean
}

export function StreamqMark({
  className,
  title = "StreamQ",
  decorative = false,
}: StreamqMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      className={cn("shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill="#e85a24" />
      <path d="M12 9.5v13l11-6.5z" fill="#fff9f0" />
    </svg>
  )
}
