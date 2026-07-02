import { ImageResponse } from "next/og"
import { DEFAULT_OG_DESCRIPTION, SITE_NAME } from "@/lib/seo"

export const alt = "StreamQ Player — React video SDK for HLS, DASH, and live streaming"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff9f0",
          color: "#141414",
          padding: "72px",
          border: "8px solid #141414",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "88px",
              height: "88px",
              borderRadius: "24px",
              background: "#e85a24",
            }}
          >
            <div
              style={{
                marginLeft: "8px",
                width: 0,
                height: 0,
                borderTop: "22px solid transparent",
                borderBottom: "22px solid transparent",
                borderLeft: "34px solid #fff9f0",
              }}
            />
          </div>
          <p style={{ fontSize: 42, fontWeight: 700 }}>{SITE_NAME}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "920px" }}>
          <p
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            React video SDK for HLS, DASH & live
          </p>
          <p style={{ fontSize: 30, lineHeight: 1.4, color: "#4a4a4a" }}>
            {DEFAULT_OG_DESCRIPTION}
          </p>
        </div>

        <p style={{ fontSize: 28, fontWeight: 700, color: "#e85a24" }}>
          npm install @streamq/player
        </p>
      </div>
    ),
    size,
  )
}
