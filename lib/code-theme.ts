import type { PrismTheme } from "prism-react-renderer"

/** Light syntax theme aligned with streamq.in paper / ink palette. */
export const streamqCodeTheme: PrismTheme = {
  plain: {
    color: "var(--color-ink)",
    backgroundColor: "var(--color-paper)",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "var(--color-ink-light)", fontStyle: "italic" },
    },
    {
      types: ["namespace"],
      style: { opacity: 0.7 },
    },
    {
      types: ["string", "char", "attr-value", "regex", "inserted"],
      style: { color: "#059669" },
    },
    {
      types: ["punctuation", "operator"],
      style: { color: "var(--color-ink-soft)" },
    },
    {
      types: ["boolean", "number", "constant", "symbol"],
      style: { color: "#9333ea" },
    },
    {
      types: ["keyword", "builtin", "atrule", "important"],
      style: { color: "var(--color-orange)", fontWeight: "600" },
    },
    {
      types: ["function", "class-name", "tag"],
      style: { color: "#2563eb", fontWeight: "600" },
    },
    {
      types: ["property", "attr-name", "selector"],
      style: { color: "#0d9488" },
    },
    {
      types: ["deleted"],
      style: { color: "#dc2626" },
    },
  ],
}
