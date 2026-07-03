import type { NextConfig } from "next"
import { assertProductionEnv } from "./lib/env"
import { securityHeaders } from "./lib/security-headers"

assertProductionEnv()

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/try",
        destination: "/#player",
        permanent: true,
      },
      {
        source: "/try/:path*",
        destination: "/#player",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
