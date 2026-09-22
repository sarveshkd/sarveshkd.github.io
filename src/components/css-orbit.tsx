"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/lenis"

type OrbitApi = { nudge: (direction: number) => void }

export function CssOrbit({
  angleRef,
  apiRef,
}: {
  angleRef: React.RefObject<HTMLSpanElement | null>
  apiRef: React.MutableRefObject<OrbitApi | null>
}) {
  const spin = useRef<HTMLDivElement>(null)
  const angle = useRef(24)
  const dragging = useRef(false)
  const lastX = useRef(0)

  useEffect(() => {
    apiRef.current = {
      nudge(direction) {
        angle.current = (angle.current + direction * 16 + 360) % 360
      },
    }

    const reduced = prefersReducedMotion()
    let frame = 0

    const paint = () => {
      if (spin.current) {
        spin.current.style.transform = `rotateX(68deg) rotateZ(${angle.current}deg)`
      }
      if (angleRef.current) {
        angleRef.current.textContent = `${Math.round(angle.current)
          .toString()
          .padStart(3, "0")}°`
      }
    }

    const loop = () => {
      if (!dragging.current && !reduced) {
        angle.current = (angle.current + 0.14) % 360
      }
      paint()
      frame = window.requestAnimationFrame(loop)
    }

    frame = window.requestAnimationFrame(loop)
    return () => {
      window.cancelAnimationFrame(frame)
      apiRef.current = null
    }
  }, [angleRef, apiRef])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    lastX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const delta = event.clientX - lastX.current
    lastX.current = event.clientX
    angle.current = (angle.current + delta * 0.5 + 360) % 360
  }

  return (
    <div
      className="grid h-full w-full place-items-center [perspective:1100px]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={() => {
        dragging.current = false
      }}
      onPointerCancel={() => {
        dragging.current = false
      }}
    >
      <div ref={spin} className="relative size-[min(78%,340px)] [transform-style:preserve-3d]">
        <span className="orbit-ring orbit-ring-a" />
        <span className="orbit-ring orbit-ring-b" />
        <span className="orbit-ring orbit-ring-c" />
        <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e7fffb,#1a4a46_45%,#07110f_78%)] shadow-[0_0_40px_rgba(143,208,200,0.45)]" />
      </div>
    </div>
  )
}
