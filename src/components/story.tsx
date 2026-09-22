"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { chapters } from "@/lib/content"

gsap.registerPlugin(ScrollTrigger)

export function Story() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = root.current
    if (!section) return

    const match = gsap.matchMedia()
    match.add("(min-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-story]", section)
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", section)
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(panels.length - 1, Math.floor(self.progress * panels.length))
            dots.forEach((dot, dotIndex) => {
              dot.classList.toggle("is-on", dotIndex === index)
            })
          },
        },
      })

      timeline.to({}, { duration: 0.4 })
      timeline.to(panels[0], { autoAlpha: 0, y: -36, duration: 0.45 })
      timeline.fromTo(
        panels[1],
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        "<"
      )
      timeline.to({}, { duration: 0.4 })
      timeline.to(panels[1], { autoAlpha: 0, y: -36, duration: 0.45 })
      timeline.fromTo(
        panels[2],
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        "<"
      )
      timeline.to({}, { duration: 0.35 })
    })

    return () => match.revert()
  }, [])

  return (
    <section id="about" ref={root} className="relative border-t border-white/10">
      <div className="story-stage relative mx-auto max-w-[1400px] px-5 md:px-8">
        {chapters.map((chapter) => (
          <article
            key={chapter.index}
            data-story
            className="story-panel flex items-center py-20 lg:py-0"
          >
            <div className="grid w-full items-end gap-6 lg:grid-cols-[minmax(0,0.8fr)_1.2fr] lg:gap-16">
              <p className="font-serif text-[clamp(5.5rem,14vw,10rem)] leading-none text-[#8fd0c8]/25 italic">
                {chapter.index}
              </p>
              <div className="max-w-[40rem] pb-4">
                <p className="eyebrow">{chapter.kicker}</p>
                <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-[#f4f1ea]">
                  {chapter.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#b7c0ba]">{chapter.body}</p>
              </div>
            </div>
          </article>
        ))}
        <div className="pointer-events-none absolute top-1/2 right-8 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {chapters.map((chapter, index) => (
            <span
              key={chapter.index}
              data-dot
              className={index === 0 ? "story-dot is-on" : "story-dot"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
