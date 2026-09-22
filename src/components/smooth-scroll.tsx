"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion, scrollRef } from "@/lib/lenis"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 0.92,
      anchors: { offset: -72 },
    })

    scrollRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 400)
    window.addEventListener("load", refresh)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("load", refresh)
      gsap.ticker.remove(onTick)
      scrollRef.current = null
      lenis.destroy()
    }
  }, [])

  return children
}
