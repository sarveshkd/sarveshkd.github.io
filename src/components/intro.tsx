"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/lenis"

export function Intro() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.remove()
      return
    }

    const timeline = gsap.timeline({
      onComplete: () => el.remove(),
    })

    timeline
      .fromTo(
        ".intro-mark",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }
      )
      .to(".intro-mark", { autoAlpha: 0, duration: 0.28, delay: 0.22 })
      .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#08090b]"
      aria-hidden
    >
      <p className="intro-mark font-serif text-5xl italic tracking-tight text-[#8fd0c8]">
        SK
      </p>
    </div>
  )
}
