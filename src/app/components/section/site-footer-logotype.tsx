"use client"

import { motion, useMotionValue, useSpring } from "motion/react"

const VIEWBOX_WIDTH = 1410
const DEFAULT_GRADIENT_X = 705

export function SiteFooterInteractiveLogotype() {
  const gradientX1Raw = useMotionValue(DEFAULT_GRADIENT_X)
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const containerRect = container.getBoundingClientRect()
    const mouseX = event.clientX - containerRect.left
    const containerWidth = containerRect.width

    const normalizedX = (mouseX / containerWidth) * VIEWBOX_WIDTH
    const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX))

    gradientX1Raw.set(clampedX)
  }

  const handleMouseLeave = () => {
    gradientX1Raw.set(DEFAULT_GRADIENT_X)
  }

  return (
    <div className="w-screen max-w-full overflow-hidden border-t border-border/40">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logotype SVG — "Connecting Dots" rendered with Chakra Petch (navbar font),
            partially clipped to peek out from the bottom */}
        <div className="flex w-full translate-y-[30%] items-center justify-center">
          <svg
            className="container size-full"
            viewBox="0 0 1410 258"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Connecting Dots"
            role="img"
          >
            {/* Subtle outline always visible */}
            <text
              x="705"
              y="232"
              textAnchor="middle"
              textLength="1380"
              lengthAdjust="spacingAndGlyphs"
              className="stroke-foreground/10 [font-family:var(--font-chakra-petch)]"
              fontSize="300"
              fontWeight="700"
              fill="none"
              strokeWidth="2"
            >
              Connecting Dots
            </text>
            {/* Gradient fill that follows the cursor */}
            <text
              x="705"
              y="232"
              textAnchor="middle"
              textLength="1380"
              lengthAdjust="spacingAndGlyphs"
              className="[font-family:var(--font-chakra-petch)]"
              fontSize="300"
              fontWeight="700"
              fill="url(#paint0_linear_1145_73)"
            >
              Connecting Dots
            </text>
            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="1"
                x2="705"
                y2="257"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
