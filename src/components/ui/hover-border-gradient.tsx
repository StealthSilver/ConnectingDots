"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTheme } from "@/lib/theme";
import React, { useCallback, useEffect, useState } from "react";

export type GradientDirection = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

const movingMapLight: Record<GradientDirection, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(82, 82, 91, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
  LEFT:
    "radial-gradient(16.6% 43.1% at 0% 50%, rgba(82, 82, 91, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, rgba(82, 82, 91, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, rgba(82, 82, 91, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
};

const movingMapDark: Record<GradientDirection, string> = {
  TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%)",
  LEFT:
    "radial-gradient(16.6% 43.1% at 0% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%)",
  BOTTOM:
    "radial-gradient(20.7% 50% at 50% 100%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%)",
  RIGHT:
    "radial-gradient(16.2% 41.2% at 100% 50%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 100%)",
};

const highlight =
  "radial-gradient(75% 181.15942028985506% at 50% 50%, rgb(113, 113, 122) 0%, rgba(255, 255, 255, 0) 100%)";

function useThemeMovingMap() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  return isDark ? movingMapDark : movingMapLight;
}

function useRotatingDirection(
  enabled: boolean,
  duration: number,
  clockwise: boolean,
) {
  const [direction, setDirection] = useState<GradientDirection>("TOP");

  const rotateDirection = useCallback(
    (currentDirection: GradientDirection): GradientDirection => {
      const directions: GradientDirection[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex]!;
    },
    [clockwise],
  );

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      setDirection((prev) => rotateDirection(prev));
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [enabled, duration, rotateDirection]);

  return direction;
}

export type GradientPillOwnProps = {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  /** When false, outer gradient ring / motion layer are off (plain pill until hover). */
  borderGlowActive?: boolean;
  /** Advance border sweep while true (e.g. CTA idle, or nav item hovered). */
  rotateEnabled?: boolean;
  /** Pulse border toward brand highlight while true (mouse over CTA / nav item). */
  emphasizeBorder?: boolean;
  duration?: number;
  clockwise?: boolean;
  children?: React.ReactNode;
};

/**
 * Shared chrome: animated gradient border ring + inner pill. Used by Sign up, theme toggle shell, nav links.
 */
export function GradientPill({
  as,
  containerClassName,
  className,
  borderGlowActive = true,
  rotateEnabled = false,
  emphasizeBorder = false,
  duration = 1,
  clockwise = true,
  children,
  ...rest
}: GradientPillOwnProps & Record<string, unknown>) {
  const Tag = (as ?? "div") as React.ElementType;
  const movingMap = useThemeMovingMap();
  const direction = useRotatingDirection(rotateEnabled, duration, clockwise);

  return (
    <Tag
      className={cn(
        "relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full transition duration-500",
        borderGlowActive
          ? "border border-black/15 bg-black/[0.06] p-px decoration-clone hover:bg-black/[0.09] dark:border-white/20 dark:bg-white/20 dark:hover:bg-white/15"
          : "border border-transparent bg-transparent p-0 hover:bg-black/[0.06] dark:hover:bg-white/10",
        containerClassName,
      )}
      {...(rest as React.HTMLAttributes<HTMLElement>)}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] leading-snug tracking-tight text-black dark:text-white",
          borderGlowActive
            ? "bg-white px-5 py-2.5 text-base font-semibold dark:bg-black"
            : "bg-transparent px-4 py-2 text-sm font-medium",
          className,
        )}
      >
        {children}
      </div>
      {borderGlowActive ? (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
            style={{
              filter: "blur(2px)",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            initial={{ background: movingMap[direction] }}
            animate={{
              background: emphasizeBorder
                ? [movingMap[direction], highlight]
                : movingMap[direction],
            }}
            transition={{ ease: "linear", duration: duration ?? 1 }}
          />
          <div className="pointer-events-none absolute inset-[2px] z-[1] flex-none rounded-[100px] bg-white dark:bg-black" />
        </>
      ) : null}
    </Tag>
  );
}

type HoverBorderGradientProps<C extends React.ElementType = "button"> = {
  as?: C;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "children">;

export function HoverBorderGradient<C extends React.ElementType = "button">({
  children,
  containerClassName,
  className,
  as,
  duration = 1,
  clockwise = true,
  onMouseEnter,
  onMouseLeave,
  ...props
}: HoverBorderGradientProps<C>) {
  const [hovered, setHovered] = useState(false);

  return (
    <GradientPill
      {...props}
      as={as ?? "button"}
      borderGlowActive
      containerClassName={cn(
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        containerClassName,
      )}
      className={className}
      duration={duration}
      clockwise={clockwise}
      rotateEnabled={!hovered}
      emphasizeBorder={hovered}
      onMouseEnter={(e: React.MouseEvent<Element>) => {
        onMouseEnter?.(e);
        setHovered(true);
      }}
      onMouseLeave={(e: React.MouseEvent<Element>) => {
        onMouseLeave?.(e);
        setHovered(false);
      }}
    >
      {children}
    </GradientPill>
  );
}
