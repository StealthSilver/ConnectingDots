"use client"

import {
  IconBook,
  IconBulb,
  IconCode,
  IconListCheck,
} from "@tabler/icons-react"
import { useSearchParams } from "next/navigation"
import { useMemo, type ReactNode } from "react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const
const monoFont = "[font-family:var(--font-mono)]" as const

type NoteSection = {
  heading: string
  /** Plaintext content used to match search queries against the section. */
  searchText: string
  icon: React.ComponentType<{
    className?: string
    "aria-hidden"?: boolean | "true" | "false"
  }>
  body: ReactNode
}

const twoPointersSections: NoteSection[] = [
  {
    heading: "The Idea",
    searchText:
      "Use two index variables — usually called left and right — that start at opposite ends of an array (or both at the start) and move toward each other based on a condition. This avoids the O(n²) brute-force nested loop and brings many problems down to O(n).",
    icon: IconBulb,
    body: (
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        Use two index variables — usually called <InlineCode>left</InlineCode>{" "}
        and <InlineCode>right</InlineCode> — that start at opposite ends of an
        array (or both at the start) and move toward each other based on a
        condition. This avoids the O(n²) brute-force nested loop and brings many
        problems down to{" "}
        <strong className="font-semibold text-foreground">O(n)</strong>.
      </p>
    ),
  },
  {
    heading: "When to use it",
    searchText:
      "Array is sorted (or can be sorted first). You need to find a pair / triplet that sums to a target. Removing duplicates or partitioning in-place. Checking palindromes — compare chars from both ends. Squaring a sorted array (negative numbers need care).",
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
    searchText:
      "function twoSum nums target left right while sum left right return code template",
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
    searchText:
      "Time O(n) Space O(1) One pass through the array; the two pointers together advance at most n steps total.",
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

const topicTitle = "Two Pointers"
const topicLabel = "Pattern 01"

export function LearningContent() {
  const searchParams = useSearchParams()
  const q = (searchParams.get("q") ?? "").trim().toLowerCase()

  const matchesTopic = useMemo(() => {
    if (!q) return true
    return (
      topicTitle.toLowerCase().includes(q) ||
      topicLabel.toLowerCase().includes(q)
    )
  }, [q])

  const filteredSections = useMemo(() => {
    if (!q || matchesTopic) return twoPointersSections
    return twoPointersSections.filter((section) => {
      return (
        section.heading.toLowerCase().includes(q) ||
        section.searchText.toLowerCase().includes(q)
      )
    })
  }, [q, matchesTopic])

  if (q && filteredSections.length === 0 && !matchesTopic) {
    return (
      <p className="mt-2 text-center text-sm text-muted-foreground">
        No notes match{" "}
        <span className={cn(navChakra, "text-foreground")}>“{q}”</span>.
      </p>
    )
  }

  return (
    <>
      <div className="mb-7 flex items-center gap-3 sm:mb-10">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border bg-background/70 shadow-sm sm:h-11 sm:w-11">
          <IconBook
            className="size-4 shrink-0 text-muted-foreground sm:size-5"
            aria-hidden
          />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
            {topicLabel}
          </p>
          <h2
            className={cn(
              navChakra,
              "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
            )}
          >
            {topicTitle}
          </h2>
        </div>
      </div>

      <GlowCardGrid className="grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        {filteredSections.map((section) => (
          <NoteCard key={section.heading} section={section} />
        ))}
      </GlowCardGrid>

      {!q && (
        <p className="mt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
          More patterns coming soon
        </p>
      )}
    </>
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

function InlineCode({ children }: { children: ReactNode }) {
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
      <span className={cn(monoFont, "font-semibold text-foreground")}>
        {value}
      </span>
    </span>
  )
}
