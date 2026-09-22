"use client"

import { useLayoutEffect, useState } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/lenis"

export function Intro() {
  const [visible, setVisible] = useState(true)

  useLayoutEffect(() => {
    if (!visible || prefersReducedMotion()) return

    let alive = true
    const timeline = gsap.timeline({
      onComplete: () => {
        if (alive) setVisible(false)
      },
    })

    timeline
      .fromTo(
        ".intro-mark",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }
      )
      .to(".intro-mark", { autoAlpha: 0, duration: 0.28, delay: 0.22 })
      .to(".intro-screen", { yPercent: -100, duration: 0.85, ease: "power4.inOut" })

    return () => {
      alive = false
      timeline.kill()
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className="intro-screen pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[#08090b]"
      aria-hidden
    >
      <p className="intro-mark font-serif text-5xl italic tracking-tight text-[#8fd0c8]">
        SK
      </p>
    </div>
  )
}
