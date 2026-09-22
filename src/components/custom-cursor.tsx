"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/lenis"

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    if (!fine || prefersReducedMotion()) return

    const ringEl = ring.current
    const dotEl = dot.current
    if (!ringEl || !dotEl) return

    document.documentElement.classList.add("has-cursor")

    const xTo = gsap.quickTo(ringEl, "left", { duration: 0.4, ease: "power3.out" })
    const yTo = gsap.quickTo(ringEl, "top", { duration: 0.4, ease: "power3.out" })

    const onMove = (event: PointerEvent) => {
      xTo(event.clientX)
      yTo(event.clientY)
      gsap.set(dotEl, { left: event.clientX, top: event.clientY })
      ringEl.classList.add("is-visible")
      dotEl.classList.add("is-visible")
      const target = event.target
      const grow =
        target instanceof Element &&
        Boolean(target.closest("a, button, [data-cursor='grow']"))
      ringEl.classList.toggle("is-grow", grow)
    }

    window.addEventListener("pointermove", onMove)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.classList.remove("has-cursor")
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  )
}
