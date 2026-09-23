"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { nav, profile } from "@/lib/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("top")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const height = document.documentElement.scrollHeight - window.innerHeight
      setProgress(height > 0 ? window.scrollY / height : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const nodes = ["top", ...nav.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open ? "border-b border-white/10 bg-[#08090b]/80 backdrop-blur-xl" : ""
      )}
    >
      <div
        className="h-px w-full origin-left bg-[#8fd0c8]"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
      <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-3" data-cursor="grow">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt=""
              width={48}
              height={48}
              className="size-12 shrink-0 rounded-full object-cover object-center ring-1 ring-white/15"
            />
          ) : null}
          <span className="truncate text-[0.95rem] font-medium tracking-[-0.02em] text-[#f4f1ea]">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="grow"
              className={cn(
                "text-sm text-[#a7b0aa] transition-colors hover:text-[#f4f1ea]",
                active === item.href.slice(1) && "text-[#8fd0c8]"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            data-cursor="grow"
            className="hidden h-10 items-center rounded-full bg-[#8fd0c8] px-4 text-sm font-medium text-[#081211] transition-colors hover:bg-[#b7ebe4] md:inline-flex"
          >
            Contact
          </a>
          <Button
            variant="outline"
            size="icon"
            className="size-11 rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="grid gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-12 items-center text-lg text-[#f4f1ea]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
