import { socialConnectItems } from "@/lib/social-connect-items"
import { newTabProps } from "@/lib/site-links"
import { pillChromeClass } from "@/lib/pill-chrome"

export function ConnectContent() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
        Follow along on social, reach out by email, or jump into Discord. Pick
        whichever channel fits how you like to learn and stay in touch.
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {socialConnectItems.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} {...newTabProps} className={pillChromeClass}>
            <Icon
              className="h-[0.9rem] w-[0.9rem] shrink-0 text-muted-foreground transition group-hover:text-foreground sm:h-[1.1rem] sm:w-[1.1rem]"
              aria-hidden
            />
            <span className="truncate">{label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
