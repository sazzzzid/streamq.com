interface SectionIntroProps {
  eyebrow: string
  title: string
  description?: string
  className?: string
  sticker?: string
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  className,
  sticker,
}: SectionIntroProps) {
  return (
    <div className={className ?? "max-w-3xl space-y-5"}>
      <div className="flex flex-wrap items-center gap-3">
        <p className="eyebrow">{eyebrow}</p>
        {sticker ? <span className="sticker text-xs">{sticker}</span> : null}
      </div>
      <h2 className="section-title font-heading">{title}</h2>
      {description ? <p className="body-copy">{description}</p> : null}
    </div>
  )
}
