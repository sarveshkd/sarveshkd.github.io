"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { credentials, experience } from "@/lib/content"
import { prefersReducedMotion } from "@/lib/lenis"

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const root = useRef<HTMLElement>(null)
  const line = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const section = root.current
    if (!section || prefersReducedMotion()) return

    const context = gsap.context(() => {
      gsap.from(line.current, {
        scaleY: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      })
      gsap.from("[data-exp]", {
        y: 32,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-exp-list]", start: "top 80%" },
      })
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="experience" ref={root} className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Experience</p>
          <h2 className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.04em]">
            Professional timeline
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-[#b7c0ba]">
            Platform work leads. Operations leadership stays visible as supporting evidence.
          </p>
        </div>

        <div className="relative pl-8" data-exp-list>
          <span className="absolute top-1 bottom-1 left-0 w-px bg-white/10" aria-hidden />
          <span
            ref={line}
            className="absolute top-1 bottom-1 left-0 w-px origin-top bg-[#8fd0c8]"
            aria-hidden
          />
          <div className="grid gap-10">
            {experience.map((item) => (
              <article key={item.org} data-exp>
                <p className="flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] tracking-[0.14em] text-[#8e9892] uppercase">
                  <span>{item.org}</span>
                  <span>{item.dates}</span>
                </p>
                <h3 className="mt-3 text-2xl tracking-tight">{item.role}</h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-[#b7c0ba]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1400px]">
        <p className="eyebrow">Education and credentials</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {credentials.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-5 transition-colors duration-300 hover:border-[#8fd0c8]/40"
            >
              <p className="text-[0.72rem] tracking-[0.14em] text-[#8fd0c8] uppercase">
                {item.kind}
              </p>
              <h3 className="mt-3 text-xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b7c0ba]">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
