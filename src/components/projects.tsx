"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArchitectureMark } from "@/components/architecture-mark"
import { projects } from "@/lib/content"
import { prefersReducedMotion } from "@/lib/lenis"

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = root.current
    if (!section || prefersReducedMotion()) return

    const context = gsap.context(() => {
      gsap.from("[data-arch]", {
        strokeDashoffset: 1,
        duration: 1.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-arch-frame]", start: "top 75%" },
      })
      gsap.from("[data-project]", {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%" },
      })
    }, section)

    return () => context.revert()
  }, [])

  const [featured, supporting] = projects

  return (
    <section id="work" ref={root} className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.04em]">
              Project presentation
            </h2>
          </div>
          <p className="max-w-[36ch] text-lg leading-relaxed text-[#b7c0ba]">
            One generative case in front, with the enterprise delivery story beside it.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article
            data-project
            className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#101317]"
          >
            <div
              data-arch-frame
              className="relative h-72 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(143,208,200,0.16),transparent_42%),#0c0f12] md:h-80"
            >
              <div className="arch-drawing absolute inset-0 p-8 text-[#d7ebe6] transition-transform duration-700 group-hover:scale-[1.03]">
                <ArchitectureMark />
              </div>
              <p className="absolute bottom-5 left-6 font-mono text-[0.72rem] tracking-[0.16em] text-[#8fd0c8] uppercase">
                {featured.field}
              </p>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[0.72rem] tracking-[0.16em] text-[#8e9892] uppercase">
                {featured.meta}
              </p>
              <h3 className="mt-3 font-serif text-4xl italic tracking-tight md:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[58ch] leading-relaxed text-[#b7c0ba]">{featured.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article
            data-project
            className="flex flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-[#8fd0c8]/40 md:p-8"
          >
            <div>
              <p className="text-[0.72rem] tracking-[0.16em] text-[#8e9892] uppercase">
                {supporting.meta}
                <span className="mx-2 text-white/20">/</span>
                {supporting.field}
              </p>
              <h3 className="mt-4 text-3xl tracking-tight">{supporting.title}</h3>
              <p className="mt-4 leading-relaxed text-[#b7c0ba]">{supporting.body}</p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {supporting.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
