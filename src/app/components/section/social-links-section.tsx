import { socialConnectItems } from "@/lib/social-connect-items";
import { newTabProps } from "@/lib/site-links";
import { SectionHeading } from "./section-heading";

const shell =
  "group flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-full border border-zinc-200/90 bg-white/60 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow dark:border-zinc-700/80 dark:bg-zinc-900/50 dark:hover:border-zinc-600" as const;

export function SocialLinksSection() {
  return (
    <section
      aria-labelledby="social-heading"
      className="border-b border-zinc-200/60 px-4 py-10 dark:border-zinc-800/80 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading id="social-heading">Connect</SectionHeading>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {socialConnectItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...newTabProps}
              className={shell}
            >
              <Icon
                className="h-[1.1rem] w-[1.1rem] shrink-0 text-zinc-600 transition group-hover:text-foreground dark:text-zinc-400"
                aria-hidden
              />
              <span className="truncate">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
