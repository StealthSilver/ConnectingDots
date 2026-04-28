import type { Metadata } from "next"
import {
  IconBook,
  IconBulb,
  IconCode,
  IconListCheck,
} from "@tabler/icons-react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

import { AppPageShell } from "../components/app-layout/app-page-shell"

export const metadata: Metadata = {
  title: "Learning — Connecting Dots",
  description:
    "Pattern-first DSA notes and structured learning material to crack any technical interview.",
}

const navChakra = "[font-family:var(--font-chakra-petch)]" as const
const letterFont = "[font-family:var(--font-kalam)]" as const
const monoFont = "[font-family:var(--font-mono)]" as const

type NoteSection = {
  heading: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
  body: React.ReactNode
}

const twoPointersSections: NoteSection[] = [
  {
    heading: "The Idea",
    icon: IconBulb,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        Use two index variables — usually called <InlineCode>left</InlineCode>{" "}
        and <InlineCode>right</InlineCode> — that start at opposite ends of an
        array (or both at the start) and move toward each other based on a
        condition. This avoids the O(n²) brute-force nested loop and brings many
        problems down to <strong className="font-semibold text-foreground">O(n)</strong>.
      </p>
    ),
  },
  {
    heading: "When to use it",
    icon: IconListCheck,
    body: (
      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {[
          "Array is sorted (or can be sorted first).",
          "You need to find a pair / triplet that sums to a target.",
          "Removing duplicates or partitioning in-place.",
          'Checking palindromes — compare chars from both ends.',
          "Squaring a sorted array (negative numbers need care).",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    heading: "Template",
    icon: IconCode,
    body: (
      <div
        className={cn(
          monoFont,
          "overflow-x-auto rounded-xl border border-chrome-border bg-background/70 px-4 py-4 text-xs leading-relaxed text-foreground sm:text-sm",
        )}
      >
        <pre>{`function twoSum(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) return [left, right];
    if (sum < target)  left++;
    else               right--;
  }

  return []; // no pair found
}`}</pre>
      </div>
    ),
  },
  {
    heading: "Complexity",
    icon: IconBook,
    body: (
      <div className="flex flex-wrap gap-3 text-sm">
        <ComplexityBadge label="Time" value="O(n)" />
        <ComplexityBadge label="Space" value="O(1)" />
        <p className="w-full text-muted-foreground">
          One pass through the array; the two pointers together advance at most{" "}
          <InlineCode>n</InlineCode> steps total.
        </p>
      </div>
    ),
  },
]

export default function LearningPage() {
  return (
    <AppPageShell>
      {/* Page header */}
      <section
        aria-labelledby="learning-heading"
        className="px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-12"
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
          DSA Notes
        </p>
        <h1
          id="learning-heading"
          className={cn(
            navChakra,
            "mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
          )}
        >
          Learning
        </h1>
        <p
          className={cn(
            letterFont,
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl",
          )}
        >
          Pattern-first notes for technical interviews. Understand the
          shape of a problem before you solve it.
        </p>
      </section>

      {/* Divider */}
      <div className="mb-8 px-5 sm:mb-12 sm:px-8">
        <div className="h-px w-full bg-[color:var(--color-line)]" />
      </div>

      {/* DSA topic note */}
      <section
        aria-labelledby="two-pointers-heading"
        className="px-5 pb-14 sm:px-8 sm:pb-20"
      >
        {/* Topic label */}
        <div className="mb-7 flex items-center gap-3 sm:mb-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border bg-background/70 shadow-sm sm:h-11 sm:w-11">
            <IconBook className="size-4 shrink-0 text-muted-foreground sm:size-5" aria-hidden />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
              Pattern 01
            </p>
            <h2
              id="two-pointers-heading"
              className={cn(
                navChakra,
                "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
              )}
            >
              Two Pointers
            </h2>
          </div>
        </div>

        {/* Note sections in a bento grid */}
        <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {twoPointersSections.map((section) => (
            <NoteCard key={section.heading} section={section} />
          ))}
        </GlowCardGrid>

        <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          More patterns coming soon
        </p>
      </section>
    </AppPageShell>
  )
}

function NoteCard({ section }: { section: NoteSection }) {
  const Icon = section.icon
  return (
    <GlowCard>
      <div className="flex h-full flex-col p-5 sm:p-7">
        <div className="mb-3 flex items-center gap-2.5 sm:mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-chrome-border bg-background/70 shadow-sm">
            <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </div>
          <h3
            className={cn(
              navChakra,
              "text-base font-semibold tracking-tight text-foreground",
            )}
          >
            {section.heading}
          </h3>
        </div>
        <div className="flex-1">{section.body}</div>
      </div>
    </GlowCard>
  )
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className={cn(
        monoFont,
        "rounded-md border border-chrome-border bg-background/70 px-1.5 py-0.5 text-[0.8em] text-foreground",
      )}
    >
      {children}
    </code>
  )
}

function ComplexityBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-chrome-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className="text-muted-foreground/60">{label}:</span>
      <span
        className={cn(
          monoFont,
          "font-semibold text-foreground",
        )}
      >
        {value}
      </span>
    </span>
  )
}
