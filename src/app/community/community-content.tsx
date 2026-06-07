import { IconBrandDiscord, IconUsersGroup } from "@tabler/icons-react"

import { GlowCard, GlowCardGrid } from "@/components/glow-card-grid"
import { newTabProps, siteLinks } from "@/lib/site-links"
import { pillChromeClass } from "@/lib/pill-chrome"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

export function CommunityContent() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-3">
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          A place to study together, ask questions, and share what you&apos;re
          building. Discussions, study groups, and community threads are on the
          way.
        </p>
      </div>

      <GlowCardGrid className="grid-cols-1 sm:grid-cols-2">
        <GlowCard className="flex h-full flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-background/60">
              <IconUsersGroup className="size-5 text-foreground" aria-hidden />
            </span>
            <h2 className={`${navChakra} text-lg font-semibold tracking-tight text-foreground`}>
              Discussions
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Comment threads on posts and notes, plus study groups around shared
            topics — coming soon.
          </p>
        </GlowCard>

        <GlowCard className="flex h-full flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-[color:var(--color-line)] bg-background/60">
              <IconBrandDiscord className="size-5 text-foreground" aria-hidden />
            </span>
            <h2 className={`${navChakra} text-lg font-semibold tracking-tight text-foreground`}>
              Discord
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Join the server for daily problem drops, study reminders, and live
            conversations while community features ship.
          </p>
          <a
            href={siteLinks.discord}
            {...newTabProps}
            className={`${pillChromeClass} mt-auto self-start`}
          >
            <IconBrandDiscord
              className="h-[0.9rem] w-[0.9rem] shrink-0 text-muted-foreground transition group-hover:text-foreground sm:h-[1.1rem] sm:w-[1.1rem]"
              aria-hidden
            />
            <span className="truncate">Open Discord</span>
          </a>
        </GlowCard>
      </GlowCardGrid>
    </div>
  )
}
