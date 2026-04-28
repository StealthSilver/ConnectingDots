"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

export function GlowCardGrid({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!gridRef.current) return
      const cards = gridRef.current.querySelectorAll<HTMLElement>(
        "[data-slot='glow-card']",
      )
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x =
          (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
        const y =
          (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
        card.style.setProperty("--pointer-x", x.toFixed(3))
        card.style.setProperty("--pointer-y", y.toFixed(3))
      })
    }

    document.addEventListener("pointermove", handlePointerMove)
    return () => document.removeEventListener("pointermove", handlePointerMove)
  }, [])

  return (
    <div
      ref={gridRef}
      className={cn("grid w-full gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function GlowCard({
  className,
  children,
  style,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="glow-card"
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
      style={
        {
          "--glow-x": "calc(50% + var(--pointer-x, 0) * 50%)",
          "--glow-y": "calc(50% + var(--pointer-y, 0) * 50%)",
          background:
            "linear-gradient(var(--glow-card-fill) 0 0) padding-box, " +
            "radial-gradient(circle at var(--glow-x) var(--glow-y), " +
            "rgba(255,255,255,0.9) 0%, rgba(200,200,200,0.5) 40%, rgba(120,120,120,0.15) 70%, transparent 90%) border-box",
          border: "1.5px solid transparent",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Ambient inner glow — fades in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), " +
            "rgba(255,255,255,0.07) 0%, rgba(180,180,180,0.04) 45%, transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
