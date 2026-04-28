"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { mobileMenuButtonClass, subtleNavLinkClass } from "@/lib/pill-chrome";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/theme";
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

const navLinkClass = cn(navChakra, subtleNavLinkClass);

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
    return <div className="h-9 w-9 shrink-0" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(mobileMenuButtonClass, "shrink-0")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <SunGlyph className="h-[1.05rem] w-[1.05rem]" />
      ) : (
        <MoonGlyph className="h-[1.05rem] w-[1.05rem]" />
      )}
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
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Image
          src="/light.png"
          alt=""
          width={200}
          height={52}
          className="h-8 w-auto shrink-0 dark:hidden sm:h-11"
          priority
        />
        <Image
          src="/cddark.png"
          alt=""
          width={200}
          height={52}
          className="hidden h-8 w-auto shrink-0 dark:block sm:h-11"
          priority
        />
        <span
          className={`${navChakra} hidden truncate text-lg font-normal tracking-tight text-foreground sm:inline sm:text-2xl md:text-3xl`}
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
      className={cn(
        navChakra,
        subtleNavLinkClass,
        "w-full justify-start px-4 py-3 text-base text-left",
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-grid-start
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[color:var(--color-line)] transition-colors duration-200 relative",
        scrolled || mobileOpen
          ? "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
          : "bg-transparent",
      )}
    >
      <div className={cn(pageContentShellClassName, "py-3 sm:py-4")}>
        <div className="relative z-20 flex w-full min-h-12 items-center justify-between gap-3">
          <div className="min-w-0 shrink">
            <BrandLink className="inline-flex max-w-full" />
          </div>

          <nav
            aria-label="Main"
            className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex"
          >
            {navItems.map((item) => (
              <Link key={item.link} href={item.link} className={navLinkClass}>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="hidden lg:block">
              <HoverBorderGradient
                as={Link}
                href="/sign-up"
                className={navChakra}
              >
                Sign up
              </HoverBorderGradient>
            </div>
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                className={cn(
                  mobileMenuButtonClass,
                  "h-10 w-10 border border-[color:var(--color-line)] bg-background supports-[backdrop-filter]:bg-background/95 backdrop-blur-md text-foreground hover:text-foreground",
                  mobileOpen &&
                    "bg-background text-foreground",
                )}
                onClick={toggleMobile}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-panel"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      className="flex items-center justify-center"
                      initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    >
                      <IconX className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      className="flex items-center justify-center"
                      initial={{ rotate: 90, scale: 0.4, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      exit={{ rotate: -90, scale: 0.4, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    >
                      <IconMenu2 className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav-panel"
            className="absolute inset-x-0 top-full z-30 border-b border-[color:var(--color-line)] bg-background/92 backdrop-blur-md supports-[backdrop-filter]:bg-background/78 lg:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.8 }}
          >
            <div className={cn(pageContentShellClassName, "pb-3 pt-3")}>
              <nav aria-label="Main" className="flex flex-col gap-1">
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
              <div className="mt-3 border-t border-[color:var(--color-line)] pt-4">
                <HoverBorderGradient
                  as={Link}
                  href="/sign-up"
                  onClick={closeMobile}
                  containerClassName="w-full"
                  className={`${navChakra} flex w-full justify-center`}
                >
                  Sign up
                </HoverBorderGradient>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
