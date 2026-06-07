"use client";

import { AuthCtaLink } from "@/components/auth-cta-link";
import { landingNavItems } from "@/lib/app-routes";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { mobileMenuButtonClass, subtleNavLinkClass } from "@/lib/pill-chrome";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useTheme } from "@/lib/theme";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

const navInter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

const signUpButtonClass = cn(
  navInter.className,
  "px-3.5 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm",
);

const navItems = landingNavItems;

const navLinkClass = cn(
  navChakra,
  subtleNavLinkClass,
  "relative z-10 min-h-9 px-3.5 py-2 hover:bg-transparent dark:hover:bg-transparent",
);

function DesktopNavLinks() {
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [slider, setSlider] = useState({ left: 0, width: 0, opacity: 0 });

  const updateSlider = useCallback((index: number) => {
    const el = itemRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setSlider({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, []);

  const handleMouseEnter = useCallback(
    (index: number) => {
      setHoveredIndex(index);
      updateSlider(index);
    },
    [updateSlider],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setSlider((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  useEffect(() => {
    if (hoveredIndex === null) return;

    const onResize = () => updateSlider(hoveredIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredIndex, updateSlider]);

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative hidden min-w-0 items-center justify-center gap-0.5 lg:flex"
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-black/[0.04] dark:bg-white/[0.06]"
        initial={false}
        animate={{
          left: slider.left,
          width: slider.width,
          opacity: slider.opacity,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.75 }}
      />
      {navItems.map((item, index) => (
        <Link
          key={item.link}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          href={item.link}
          className={navLinkClass}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

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
      className={cn(mobileMenuButtonClass, "h-9 w-9 shrink-0")}
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
      <div className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
        <Image
          src="/light.png"
          alt=""
          width={200}
          height={52}
          className="h-6 w-auto shrink-0 dark:hidden sm:h-8"
          priority
        />
        <Image
          src="/cddark.png"
          alt=""
          width={200}
          height={52}
          className="hidden h-6 w-auto shrink-0 dark:block sm:h-8"
          priority
        />
        <span
          className={`${navChakra} hidden truncate text-sm font-normal tracking-tight text-foreground sm:inline sm:text-lg md:text-xl`}
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
        "w-full justify-center px-4 py-3 text-base text-center",
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
      <div className={cn(pageContentShellClassName, "py-2 sm:py-2.5")}>
        <div className="relative z-20 grid w-full min-h-10 grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="min-w-0 justify-self-start">
            <BrandLink className="inline-flex max-w-full" />
          </div>

          <div className="justify-self-center">
            <DesktopNavLinks />
          </div>

          <div className="flex shrink-0 items-center justify-end justify-self-end gap-2">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="hidden lg:block">
              <AuthCtaLink className={signUpButtonClass} />
            </div>
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                className={cn(
                  mobileMenuButtonClass,
                  "h-9 w-9 border border-[color:var(--color-line)] bg-background supports-[backdrop-filter]:bg-background/95 backdrop-blur-md text-foreground hover:text-foreground",
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
              <nav aria-label="Main" className="flex flex-col items-center gap-1">
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
                <AuthCtaLink
                  onClick={closeMobile}
                  containerClassName="w-full"
                  className={cn(signUpButtonClass, "flex w-full justify-center")}
                />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
