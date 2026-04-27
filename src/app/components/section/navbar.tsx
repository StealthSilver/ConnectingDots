"use client";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar as ResizableNavbar,
  NavbarButton,
  NavBody,
  NavItems,
} from "@/app/components/section/resizable-navbar";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

const navItems = [
  { name: "Blogs", link: "/blogs" },
  { name: "Learning", link: "/learning" },
  { name: "Courses", link: "/courses" },
] as const;

function SunGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M19.07 19.07l-1.41-1.41" />
    </svg>
  );
}

function MoonGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
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
        className="inline-block h-9 w-14 shrink-0 rounded-full border border-zinc-300/50 bg-zinc-100 dark:border-zinc-600/50 dark:bg-zinc-800/80"
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
      className="group relative inline-flex h-9 w-14 shrink-0 items-center rounded-full border border-zinc-300/90 bg-zinc-100 p-0.5 shadow-sm transition hover:border-zinc-400/90 focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-2 focus-visible:outline-none focus-visible:ring-offset-background dark:border-zinc-600/80 dark:bg-zinc-900/90 dark:hover:border-zinc-500/80"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5"
        aria-hidden
      >
        <SunGlyph
          className={`h-3.5 w-3.5 text-zinc-800 transition dark:text-zinc-500 ${isDark ? "opacity-50" : "opacity-100"}`}
        />
        <MoonGlyph
          className={`h-3.5 w-3.5 text-zinc-400 transition dark:text-zinc-100 ${isDark ? "opacity-100" : "opacity-50"}`}
        />
      </span>
      <span
        className={`pointer-events-none relative z-10 h-7 w-7 rounded-full border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ease-out will-change-transform dark:border-zinc-600/60 dark:bg-zinc-200 dark:ring-white/10 ${isDark ? "translate-x-6" : "translate-x-0"}`}
      />
    </button>
  );
}

function BrandLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={className}
      aria-label="Home — Connecting Dots"
    >
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <Image
          src="/light.png"
          alt=""
          width={200}
          height={52}
          className="h-10 w-auto shrink-0 dark:hidden sm:h-11"
          priority
        />
        <Image
          src="/cddark.png"
          alt=""
          width={200}
          height={52}
          className="hidden h-10 w-auto shrink-0 dark:block sm:h-11"
          priority
        />
        <span
          className={`${navChakra} truncate text-xl font-normal tracking-tight text-black sm:text-2xl md:text-3xl dark:text-white`}
        >
          Connecting Dots
        </span>
      </div>
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-xl px-3 py-2.5 text-sm font-medium tracking-tight text-black transition hover:bg-black/5 active:bg-black/10 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/[0.14]"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  return (
    <header className="px-3 sm:px-4">
      <ResizableNavbar>
        <NavBody>
          <div className="relative z-20 min-w-0 shrink pl-0.5">
            <BrandLink className="inline-flex max-w-full" />
          </div>
          <NavItems
            className={navChakra}
            items={[...navItems]}
            onItemClick={() => {}}
          />
          <div className="relative z-20 flex shrink-0 items-center gap-2 pl-1">
            <ThemeToggle />
            <NavbarButton
              as={Link}
              href="/sign-up"
              variant="primary"
              className={navChakra}
            >
              Sign up
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <div className="relative w-full">
            <MobileNavHeader>
              <div className="min-w-0 pr-1">
                <BrandLink className="inline-flex min-w-0" />
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <ThemeToggle />
                <MobileNavToggle
                  isOpen={mobileOpen}
                  onClick={toggleMobile}
                />
              </div>
            </MobileNavHeader>
            <MobileNavMenu
              isOpen={mobileOpen}
              onClose={closeMobile}
            >
              <nav aria-label="Main" className="flex flex-col">
                {navItems.map((item) => (
                  <MobileLink
                    key={item.link}
                    href={item.link}
                    onClick={closeMobile}
                  >
                    {item.name}
                  </MobileLink>
                ))}
              </nav>
              <div className="mt-1 border-t border-black/10 pt-3 dark:border-white/10">
                <NavbarButton
                  as={Link}
                  href="/sign-up"
                  onClick={closeMobile}
                  variant="primary"
                  className={`w-full ${navChakra}`}
                >
                  Sign up
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </div>
        </MobileNav>
      </ResizableNavbar>
    </header>
  );
}
