import Image from "next/image";
import Link from "next/link";
import { newTabProps, siteLinks } from "@/lib/site-links";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { heroPairedCtaClass, pillChromeClass } from "@/lib/pill-chrome";
import { socialConnectItems } from "@/lib/social-connect-items";
import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

const navItems = [
  { href: "/blogs", label: "Blogs" },
  { href: "/learning", label: "Learning" },
  { href: "/courses", label: "Courses" },
  { href: "/#about", label: "About" },
] as const;

export function Footer() {
  return (
      <footer role="contentinfo" data-grid-stop className="w-screen max-w-full">
      <div className={`${pageContentShellClassName} flex flex-col gap-10 py-12 sm:py-8`}>

        {/* Top row: brand + nav */}
        <div className="flex w-full min-w-0 flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:gap-12">

          {/* Brand + tagline */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <Link
              href="/"
              className="inline-flex max-w-full"
              aria-label="Home — Connecting Dots"
            >
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <Image
                  src="/light.png"
                  alt=""
                  width={200}
                  height={52}
                  className="h-9 w-auto shrink-0 dark:hidden sm:h-10"
                />
                <Image
                  src="/cddark.png"
                  alt=""
                  width={200}
                  height={52}
                  className="hidden h-9 w-auto shrink-0 dark:block sm:h-10"
                />
                <span
                  className={cn(
                    navChakra,
                    "truncate text-lg font-normal tracking-tight text-foreground sm:text-xl md:text-2xl",
                  )}
                >
                  Connecting Dots
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Learn computer science by connecting the dots — notes, stories,
              and courses with room to think.
            </p>
          </div>

          {/* Site nav */}
          <div className="shrink-0 sm:text-right">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              On this site
            </p>
            <nav
              aria-label="Footer"
              className="flex flex-row flex-wrap gap-0.5 sm:flex-col sm:items-end sm:gap-1"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(navChakra, heroPairedCtaClass, "tracking-tight sm:justify-end")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Social links row */}
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Connect
          </p>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
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

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Connecting Dots. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with care ·{" "}
            <a
              href={siteLinks.portfolio}
              {...newTabProps}
              className={cn(
                navChakra,
                "underline decoration-border underline-offset-2 transition hover:text-foreground",
              )}
            >
              silver-jet.vercel.app
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
