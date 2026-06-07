import { Hero01CtaButtons } from "@/components/hero-01-cta-buttons";
import { NeuronsBackground } from "@/components/neurons-background";
import { newTabProps } from "@/lib/site-links";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { pillChromeClass } from "@/lib/pill-chrome";
import { socialConnectItems } from "@/lib/social-connect-items";

export function Hero01() {
  return (
    <div className="w-full pb-8 pt-4 sm:pb-16 sm:pt-10">
      <div
        className={`${pageContentShellClassName} grid grid-cols-1 items-center gap-8 py-6 text-left sm:gap-12 sm:py-12 lg:min-h-[min(70vh,52rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:py-20 xl:gap-14`}
      >
        <div className="min-w-0 max-w-[min(100%,38rem)] xl:max-w-[42rem]">
          <MainContent />
        </div>

        <NeuronsVisual variant="desktop" />
        <NeuronsVisual variant="mobile" />
      </div>
    </div>
  );
}

function NeuronsVisual({ variant }: { variant: "desktop" | "mobile" }) {
  const isDesktop = variant === "desktop";

  return (
    <div
      aria-hidden
      className={
        isDesktop
          ? "pointer-events-none relative hidden h-full min-h-[28rem] w-full overflow-hidden lg:block"
          : "pointer-events-none relative -mx-2 h-44 w-[calc(100%+1rem)] overflow-hidden rounded-2xl sm:mx-0 sm:h-56 sm:w-full lg:hidden"
      }
    >
      <NeuronsBackground className="absolute inset-0" />
      <div
        className={
          isDesktop
            ? "absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/60 to-transparent"
            : "absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/70 to-transparent"
        }
      />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex flex-col justify-center gap-5 sm:gap-9">
      <h1
        id="hero-heading"
        className="font-heading text-3xl leading-[1.08] font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
      >
        Connect what you learn.
      </h1>

      <p className="!leading-relaxed text-[0.9375rem] text-muted-foreground sm:text-lg sm:text-balance lg:text-xl">
        Connecting Dots is the written companion to the channel blogs and notes
        when a topic needs room to breathe, and courses when it helps to learn
        step by step.
      </p>

      <Hero01CtaButtons />

      <div
        className="mt-6 flex flex-col gap-3 text-left sm:mt-16 sm:gap-5 lg:mt-28"
        aria-label="Connect"
      >
        <h2
          className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70"
          id="hero-connect-heading"
        >
          Connect
        </h2>
        <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3">
          {socialConnectItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              {...newTabProps}
              className={pillChromeClass}
            >
              <Icon
                className="h-[0.9rem] w-[0.9rem] shrink-0 text-muted-foreground transition group-hover:text-foreground sm:h-[1.1rem] sm:w-[1.1rem]"
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
