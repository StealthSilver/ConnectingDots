"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Position = {
  x: number;
  y: number;
};

export function TestimonialSpotlight({
  children,
  className,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onFocus" | "onBlur" | "onMouseEnter" | "onMouseLeave" | "onMouseMove"
> & {
  children: React.ReactNode;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [spotOpacity, setSpotOpacity] = useState(0);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleFocus = () => {
    setIsFocused(true);
    setSpotOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setSpotOpacity(0);
  };

  const handleMouseEnter = () => setSpotOpacity(1);
  const handleMouseLeave = () => setSpotOpacity(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!itemRef.current || isFocused) return;
    const rect = itemRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={itemRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-0.5",
        className,
      )}
      style={
        {
          background:
            "linear-gradient(var(--glow-card-fill) 0 0) padding-box, " +
            "radial-gradient(circle at 50% 0%, " +
            "rgba(255,255,255,0.9) 0%, rgba(200,200,200,0.5) 40%, rgba(120,120,120,0.15) 70%, transparent 90%) border-box",
          border: "1.5px solid transparent",
        } as React.CSSProperties
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Ambient inner glow — matches GlowCard, fades in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, " +
            "rgba(255,255,255,0.07) 0%, rgba(180,180,180,0.04) 45%, transparent 70%)",
        }}
      />

      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: spotOpacity * 0.5,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 60%)`,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
