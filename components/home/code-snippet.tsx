"use client"

import { Highlight, themes } from "prism-react-renderer"

interface CodeSnippetProps {
  code: string
  language?: string
}

export function CodeSnippet({ code, language = "tsx" }: CodeSnippetProps) {
  return (
    <div className="card-shell">
      <div className="code-snippet-header">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-light">
          Example
        </p>
        <span className="sticker text-xs">{language.toUpperCase()}</span>
      </div>

      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="code-snippet-body"
            style={{ ...style, background: "var(--color-paper)", margin: 0 }}
          >
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
