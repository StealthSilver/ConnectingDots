import { IconArrowLeft, IconCalendar, IconClock } from "@tabler/icons-react"
import Link from "next/link"

import type { BlogContentBlock, BlogPost } from "@/lib/blog-types"
import { appRoutes } from "@/lib/app-routes"
import { cn } from "@/lib/utils"

const navChakra = "[font-family:var(--font-chakra-petch)]" as const

function BlogContent({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="blog-prose space-y-5 sm:space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 2 ? "h2" : "h3"
          return (
            <Tag
              key={`${block.type}-${index}`}
              className={cn(
                navChakra,
                "scroll-mt-24 font-semibold tracking-tight text-foreground",
                block.level === 2
                  ? "pt-2 text-xl sm:pt-4 sm:text-2xl"
                  : "pt-1 text-lg sm:text-xl",
              )}
            >
              {block.text}
            </Tag>
          )
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul"
          return (
            <ListTag
              key={`${block.type}-${index}`}
              className={cn(
                "space-y-2 pl-5 text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base sm:leading-[1.8]",
                block.ordered ? "list-decimal" : "list-disc",
              )}
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ListTag>
          )
        }

        return (
          <p
            key={`${block.type}-${index}`}
            className="text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base sm:leading-[1.8]"
          >
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 pb-14 pt-5 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
      <Link
        href={appRoutes.blog}
        className={cn(
          navChakra,
          "mb-6 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:mb-8 sm:text-sm",
        )}
      >
        <IconArrowLeft className="size-4 shrink-0" aria-hidden />
        Back to blog
      </Link>

      <header className="mb-8 border-b border-[color:var(--color-line)] pb-8 sm:mb-10 sm:pb-10">
        {post.tags.length > 0 && (
          <ul
            className="mb-4 flex flex-wrap gap-2"
            aria-label="Tags"
          >
            {post.tags.map((tag) => (
              <li key={tag}>
                <span
                  className={cn(
                    navChakra,
                    "inline-flex rounded-full border border-[color:var(--color-line)] bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:px-3 sm:text-[11px]",
                  )}
                >
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}

        <h1
          className={cn(
            navChakra,
            "max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-[1.15]",
          )}
        >
          {post.title}
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg sm:leading-relaxed">
          {post.subheading}
        </p>

        <dl className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:mt-6 sm:gap-x-5 sm:text-sm">
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Published</dt>
            <IconCalendar className="size-3.5 shrink-0 opacity-70" aria-hidden />
            <dd>{post.date}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Reading time</dt>
            <IconClock className="size-3.5 shrink-0 opacity-70" aria-hidden />
            <dd>{post.readingTime}</dd>
          </div>
        </dl>
      </header>

      <BlogContent blocks={post.content} />
    </article>
  )
}
