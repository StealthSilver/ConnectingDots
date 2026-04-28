import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Pilled chrome: soft card fill, neutral border — hero “Connect” social links only.
 */
export const pillChromeClass = cn(
  "group inline-flex min-h-9 min-w-0 max-w-full items-center justify-center gap-1.5 rounded-full border border-chrome-border bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:text-foreground dark:bg-card/40",
  "sm:min-h-11 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm",
  focusRing,
);

/**
 * Nav + “Learn more”: identical capsule (semicircular ends) + soft hover tint; no border.
 */
export const subtleNavLinkClass = cn(
  "inline-flex min-h-9 items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors duration-200",
  "hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
  focusRing,
);

/** Mobile header menu trigger — icon only, same hover language as {@link subtleNavLinkClass}. */
export const mobileMenuButtonClass = cn(
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors duration-200",
  "bg-black/[0.06] hover:bg-black/[0.10] hover:text-foreground dark:bg-white/[0.08] dark:hover:bg-white/[0.14]",
  focusRing,
);

/**
 * Hero “Learn more” — same box + type scale as `HoverBorderGradient` / Sign up (`px-5 py-2.5 text-base font-semibold`).
 */
export const heroPairedCtaClass = cn(
  "inline-flex min-h-9 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-200",
  "sm:min-h-10 sm:px-5 sm:py-2.5 sm:text-base",
  "hover:bg-black/[0.04] hover:text-foreground dark:hover:bg-white/[0.06]",
  focusRing,
);
