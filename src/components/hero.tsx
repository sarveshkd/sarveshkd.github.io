"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { heroFacts, profile } from "@/lib/content"
import { prefersReducedMotion } from "@/lib/lenis"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

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

        <figure className="hero-fade max-lg:order-first lg:justify-self-end">
          <div className="mx-auto w-full max-w-[26rem] border border-white/10 bg-[#121418] p-2.5 sm:p-3 lg:mx-0 lg:max-w-[32rem]">
            <img
              src={profile.portrait}
              alt="Sarvesh Kurhade standing outdoors in a blue blazer"
              width={1200}
              height={1707}
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mx-auto mt-3 flex max-w-[26rem] items-baseline justify-between gap-4 lg:max-w-[32rem]">
            <span className="text-sm text-[#f4f1ea]">{profile.name}</span>
            <span className="text-sm text-[#8e9892]">{profile.location}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
