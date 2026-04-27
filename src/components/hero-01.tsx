import { Hero01CtaButtons } from "@/components/hero-01-cta-buttons";
import { newTabProps } from "@/lib/site-links";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { pillChromeClass } from "@/lib/pill-chrome";
import { socialConnectItems } from "@/lib/social-connect-items";

export function Hero01() {
  return (
    <div className="w-screen max-w-full pb-12 pt-8 sm:pb-16 sm:pt-10">
      <div
        className={`${pageContentShellClassName} flex min-h-[min(70vh,52rem)] flex-col justify-center py-14 text-left sm:py-16 lg:py-20`}
      >
        <MainContent />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex flex-col justify-center gap-7 sm:gap-9">
      <h1
        id="hero-heading"
        className="font-heading text-[2.5rem] leading-tight font-semibold tracking-tight text-foreground sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl"
      >
        Connect what you learn.
      </h1>

      <p className="!leading-relaxed text-base text-muted-foreground sm:text-xl sm:text-balance md:text-lg lg:text-xl">
        Connecting Dots is the written companion to the channel—blogs and notes
        when a topic needs room to breathe, and courses when it helps to learn
        step by step.
      </p>

      <Hero01CtaButtons />

      <div
        className="mt-20 flex flex-col gap-5 text-left sm:mt-28"
        aria-label="Connect"
      >
        <h2
          className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
          id="hero-connect-heading"
        >
          Connect
        </h2>
        <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
          {socialConnectItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...newTabProps}
              className={pillChromeClass}
            >
              <Icon
                className="h-[1.1rem] w-[1.1rem] shrink-0 text-muted-foreground transition group-hover:text-foreground"
                aria-hidden
              />
              <span className="truncate">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
