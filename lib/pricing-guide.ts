/** One production deployment = one customer-facing app (domain/product). */
export const licenseScopeNote =
  "Each production sq_live_* key covers one production deployment — typically one customer-facing app or domain. Staging or preview environments for the same app usually share that key."

export const studioVolumeNote =
  "Studio is volume pricing: five production keys on one subscription (~$40/key/mo vs $49 for a single Player license)."

/** Premium unlocks DRM playback; StreamQ backend handles license servers and entitlements. */
export const drmPlaybackNote =
  "Premium unlocks DRM playback (Widevine, PlayReady, FairPlay). StreamQ backend provides license servers and configuration — the player SDK handles encrypted stream playback in your React app."

export const drmPlaybackShort = "DRM playback — Widevine, PlayReady, FairPlay (StreamQ backend)"
