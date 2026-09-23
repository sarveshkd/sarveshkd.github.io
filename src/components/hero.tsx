"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { heroFacts, profile } from "@/lib/content"
import { prefersReducedMotion } from "@/lib/lenis"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
)

type OrbitApi = { nudge: (direction: number) => void }

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const angleRef = useRef<HTMLSpanElement>(null)
  const apiRef = useRef<OrbitApi | null>(null)
  const [active, setActive] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const node = frame.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.08 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const context = gsap.context(() => {
      gsap.from(".hero-rise", {
        yPercent: 115,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.55,
      })
      gsap.from(".hero-fade", {
        autoAlpha: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.95,
        ease: "power3.out",
      })
      gsap.to(".hero-copy", {
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, root)
    return () => context.revert()
  }, [])

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    apiRef.current?.nudge(event.key === "ArrowRight" ? 1 : -1)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="top" ref={root} className="relative overflow-hidden px-5 pt-28 pb-16 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(143,208,200,0.16),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(215,196,164,0.08),transparent_28%)]" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hero-copy">
          <p className="hero-fade eyebrow">
            {profile.location}
            <span aria-hidden>·</span>
            {profile.availability}
          </p>
          <h1 className="mt-6 font-sans text-[clamp(4.2rem,11vw,8.4rem)] leading-[0.84] font-medium tracking-[-0.055em] text-[#f4f1ea]">
            <span className="block overflow-hidden">
              <span className="hero-rise block">Sarvesh</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-rise block font-medium tracking-[-0.045em] text-[#8fd0c8]">
                Kurhade
              </span>
            </span>
          </h1>
          <p className="hero-fade mt-7 max-w-[38rem] text-lg leading-relaxed text-[#b7c0ba] md:text-xl">
            {profile.summary}
          </p>
          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#work"
              data-cursor="grow"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-12 rounded-full px-6 text-[0.95rem]"
              )}
            >
              See selected work
              <ArrowUpRight />
            </a>
            <Button
              variant="outline"
              data-cursor="grow"
              className="h-12 rounded-full px-6 text-[0.95rem]"
              onClick={copyEmail}
            >
              {copied ? "Email copied" : "Copy email"}
            </Button>
          </div>
          <dl className="hero-fade mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[0.72rem] tracking-[0.16em] text-[#8e9892] uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base text-[#f4f1ea]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          ref={frame}
          tabIndex={0}
          role="application"
          aria-label="Orbital sculpture. Drag to rotate a full 360 degrees, or use the left and right arrow keys."
          data-cursor="grow"
          onKeyDown={onKeyDown}
          className="relative h-[72vw] min-h-[340px] max-h-[720px] outline-none focus-visible:ring-2 focus-visible:ring-[#8fd0c8] lg:h-full lg:min-h-[560px] lg:max-h-none"
        >
          <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(143,208,200,0.2),transparent_68%)]" />
          <span className="corner corner-tl" />
          <span className="corner corner-tr" />
          <span className="corner corner-bl" />
          <span className="corner corner-br" />
          <span className="chip pointer-events-none absolute top-[12%] left-[8%]">AWS</span>
          <span className="chip pointer-events-none absolute top-[22%] right-[8%]">Azure</span>
          <span className="chip pointer-events-none absolute bottom-[24%] left-[6%]">
            ServiceNow
          </span>
          <span className="chip pointer-events-none absolute right-[10%] bottom-[16%]">
            AI / ML
          </span>
          <div className="absolute inset-0">
            <HeroScene angleRef={angleRef} apiRef={apiRef} active={active} />
          </div>
          <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between font-mono text-[0.68rem] tracking-[0.16em] text-[#c9d4ce] uppercase">
            <span>
              Orbit <span ref={angleRef}>000°</span>
            </span>
            <span className="hidden sm:inline">Drag to rotate 360°</span>
          </div>
        </div>
      </div>
    </section>
  )
}
