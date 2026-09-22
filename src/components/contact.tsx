"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { nav, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Contact() {
  const [copied, setCopied] = useState(false)

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
    <section id="contact" className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-5 max-w-[14ch] text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-medium tracking-[-0.05em]">
          Let us talk about the next system.
        </h2>
        <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-[#b7c0ba]">
          {profile.location}. {profile.availability}. Cloud engineering, ServiceNow workflows, and applied AI, presented as one practice.
        </p>

        <a
          href={`mailto:${profile.email}`}
          data-cursor="grow"
          className="mt-10 inline-block text-[clamp(1.4rem,3vw,2.4rem)] text-[#8fd0c8] underline decoration-white/15 underline-offset-8 transition-colors hover:text-[#d8f5f1]"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            data-cursor="grow"
            className="h-12 rounded-full px-6"
            onClick={copyEmail}
          >
            {copied ? "Copied" : "Copy email"}
          </Button>
          <a
            href="#work"
            data-cursor="grow"
            className={cn(buttonVariants({ variant: "outline" }), "h-12 rounded-full px-6")}
          >
            Back to work
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1400px] flex-col gap-4 border-t border-white/10 pt-6 text-sm text-[#8e9892] sm:flex-row sm:items-center sm:justify-between">
        <p>Sarvesh Kurhade · Cloud & ServiceNow</p>
        <nav className="flex flex-wrap gap-4" aria-label="Footer">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[#f4f1ea]">
              {item.label}
            </a>
          ))}
        </nav>
      </footer>
    </section>
  )
}
