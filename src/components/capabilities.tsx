"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { capabilities } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export function Capabilities() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = root.current
    if (!section) return

    const rows = gsap.utils.toArray<HTMLElement>("[data-cap]", section)
    const triggers = rows.map((row) =>
      ScrollTrigger.create({
        trigger: row,
        start: "top 62%",
        end: "bottom 42%",
        onToggle: (self) => row.classList.toggle("is-active", self.isActive),
      })
    )

    const match = gsap.matchMedia()
    match.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(rows, {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      })
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
      match.revert()
    }
  }, [])

  return (
    <section id="capabilities" ref={root} className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-4 max-w-[12ch] text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.04em]">
            Technology, approach, purpose.
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-[#b7c0ba]">
            Grouped the way a recruiter scans: the tool, the way it is used, and the job it does.
          </p>
        </div>

        <div>
          <div className="hidden grid-cols-[1.1fr_1fr] gap-6 pb-4 text-[0.72rem] tracking-[0.16em] text-[#8e9892] uppercase sm:grid">
            <span>Technology / approach</span>
            <span>Purpose</span>
          </div>
          <div className="border-b border-white/10">
            {capabilities.map((item) => (
              <article
                key={item.index}
                data-cap
                tabIndex={0}
                className="cap-row grid gap-3 border-t border-white/10 py-6 sm:grid-cols-[1.1fr_1fr] sm:gap-6 sm:py-7"
              >
                <div>
                  <p className="font-mono text-[0.72rem] tracking-[0.14em] text-[#8fd0c8]">
                    {item.index}
                  </p>
                  <h3 className="cap-title mt-2 text-2xl tracking-tight text-[#f4f1ea] md:text-[1.7rem]">
                    {item.cluster}
                  </h3>
                  <p className="mt-2 text-sm text-[#c5cec8]">{item.approach}</p>
                </div>
                <p className="cap-purpose text-base leading-relaxed text-[#b7c0ba] sm:pt-7">
                  {item.purpose}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
