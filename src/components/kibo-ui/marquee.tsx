"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Rfm from "react-fast-marquee";

export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative w-full overflow-hidden", className)}>{children}</div>;
}

export function MarqueeFade({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 z-20 w-12 to-transparent from-background sm:w-28",
        side === "left" ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l",
      )}
      aria-hidden
    />
  );
}

export function MarqueeContent({
  children,
  direction = "left",
  pauseOnHover = true,
}: {
  children: ReactNode;
  direction?: "right" | "left";
  pauseOnHover?: boolean;
}) {
  return (
    <Rfm
      direction={direction}
      gradient={false}
      className="relative z-0 w-full"
      play
      pauseOnHover={pauseOnHover}
    >
      {children}
    </Rfm>
  );
}

export function MarqueeItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
