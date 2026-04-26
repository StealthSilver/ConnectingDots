"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, type SVGProps } from "react";

function SunGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41" />
    </svg>
  );
}

function MoonGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className="ring-border/50 inline-block h-9 w-14 shrink-0 rounded-full bg-zinc-200/50 ring-1 ring-inset dark:bg-zinc-800/50"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="ring-border/60 focus-visible:ring-ring group relative inline-flex h-9 w-14 shrink-0 items-center rounded-full border border-zinc-300/80 bg-gradient-to-b from-zinc-50 to-zinc-100/90 p-0.5 shadow-sm ring-1 ring-inset transition hover:border-zinc-400/80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-offset-background dark:border-zinc-600/80 dark:from-zinc-800/90 dark:to-zinc-900/90 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] dark:hover:border-zinc-500/80"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5"
        aria-hidden
      >
        <SunGlyph
          className={`h-3.5 w-3.5 transition duration-200 ${isDark ? "text-zinc-400" : "text-amber-500"}`}
        />
        <MoonGlyph
          className={`h-3.5 w-3.5 transition duration-200 ${isDark ? "text-sky-300" : "text-zinc-400"}`}
        />
      </span>
      <span
        className={`pointer-events-none relative z-10 h-7 w-7 rounded-full border border-zinc-200/90 bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 ease-out will-change-transform dark:border-zinc-600/50 dark:bg-zinc-200 dark:ring-white/20 ${isDark ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
}

export function Navbar() {
  return (
    <header className="relative z-20 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="relative z-20 flex shrink-0 items-center"
          aria-label="Home"
        >
          <Image
            src="/cdlight.png"
            alt="Connecting Dots"
            width={160}
            height={40}
            className="h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src="/cddark.png"
            alt="Connecting Dots"
            width={160}
            height={40}
            className="hidden h-8 w-auto dark:block"
            priority
          />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
