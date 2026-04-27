import Link from "next/link";
import { newTabProps, siteLinks } from "@/lib/site-links";

const brandFont = "[font-family:var(--font-chakra-petch)]" as const;

const nav = [
  { href: "/blogs", label: "Blogs" },
  { href: "/learning", label: "Learning" },
  { href: "/courses", label: "Courses" },
  { href: "/#about", label: "About" },
] as const;

const external = [
  { href: siteLinks.x, label: "X" },
  { href: siteLinks.youtube, label: "YouTube" },
  { href: siteLinks.discord, label: "Discord" },
  { href: siteLinks.email, label: "Email" },
  { href: siteLinks.portfolio, label: "Portfolio" },
] as const;

const linkClass =
  "text-sm text-muted transition hover:text-foreground focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Footer() {
  return (
    <footer
      className="border-t border-zinc-200/70 bg-zinc-50/40 dark:border-zinc-800/80 dark:bg-zinc-950/40"
      role="contentinfo"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          <div className="max-w-sm">
            <p className={`${brandFont} text-xl font-semibold tracking-tight text-foreground`}>
              Connecting Dots
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Learn computer science by connecting the dots—notes, stories, and courses with room to
              think.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              On this site
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Connect
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {external.map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...newTabProps} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-zinc-200/60 pt-8 dark:border-zinc-800/70 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Connecting Dots. All rights reserved.
          </p>
          <p className="text-xs text-muted/90">
            Built with care·{" "}
            <a
              href={siteLinks.portfolio}
              {...newTabProps}
              className="underline decoration-zinc-400/50 underline-offset-2 transition hover:text-foreground dark:decoration-zinc-500"
            >
              silver-jer.vercel.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
