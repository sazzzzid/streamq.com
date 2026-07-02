interface JsonLdProps {
  data: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface JsonLdGraphProps {
  graphs: ReadonlyArray<Record<string, unknown>>
}

export function JsonLdGraph({ graphs }: JsonLdGraphProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graphs,
        }),
      }}
    />
  )
}
