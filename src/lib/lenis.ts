import type Lenis from "lenis"

export const scrollRef: { current: Lenis | null } = { current: null }

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}
