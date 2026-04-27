import Image from "next/image";
import Link from "next/link";
import { newTabProps, siteLinks } from "@/lib/site-links";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { pillChromeClass, subtleNavLinkClass } from "@/lib/pill-chrome";
import { socialConnectItems } from "@/lib/social-connect-items";
import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

const navItems = [
  { href: "/blogs", label: "Blogs" },
  { href: "/learning", label: "Learning" },
  { href: "/courses", label: "Courses" },
  { href: "/#about", label: "About" },
] as const;

const portfolioHost = siteLinks.portfolio.replace(/^https?:\/\//, "");

export function Footer() {
  return (
    <footer role="contentinfo">
      <div
        className={`${pageContentShellClassName} flex flex-col gap-8 py-10 sm:gap-10 sm:py-12`}
      >
        <div className="flex w-full min-w-0 flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:gap-12">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
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
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base sm:text-balance">
              Learn computer science by connecting the dots notes, stories, and
              courses with room to think.
            </p>
            <div className="text-left">
             
              <div className="mt-4 flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
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
          <div className="shrink-0 text-right sm:ml-8">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              On this site
            </h2>
            <nav
              aria-label="Footer"
              className="mt-4 flex flex-col items-end gap-0.5 sm:gap-1"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    navChakra,
                    subtleNavLinkClass,
                    "justify-end",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Connecting Dots. All rights
            reserved.
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
              {portfolioHost}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
