"use client";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
} from "@/app/components/section/resizable-navbar";
import {
  GradientPill,
  HoverBorderGradient,
} from "@/components/ui/hover-border-gradient";
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
  const [shellHovered, setShellHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-[3.75rem] shrink-0 rounded-full border border-black/15 bg-black/[0.06] dark:border-white/20 dark:bg-white/20"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <GradientPill
      as="div"
      containerClassName="shrink-0 cursor-default"
      className="!px-0.5 !py-0.5"
      rotateEnabled={false}
      emphasizeBorder={shellHovered}
      onMouseEnter={() => setShellHovered(true)}
      onMouseLeave={() => setShellHovered(false)}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group relative z-20 inline-flex h-8 w-[3.25rem] shrink-0 items-center rounded-full border-0 bg-transparent p-0.5 shadow-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3275F8]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5"
          aria-hidden
        >
          <SunGlyph
            className={`h-3.5 w-3.5 text-zinc-700 transition dark:text-zinc-400 ${isDark ? "opacity-50" : "opacity-100"}`}
          />
          <MoonGlyph
            className={`h-3.5 w-3.5 text-zinc-500 transition dark:text-zinc-100 ${isDark ? "opacity-100" : "opacity-50"}`}
          />
        </span>
        <span
          className={`pointer-events-none relative z-10 h-7 w-7 rounded-full border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-200 ease-out will-change-transform dark:border-zinc-600/60 dark:bg-zinc-200 dark:ring-white/10 ${isDark ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </GradientPill>
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
  const [hovered, setHovered] = useState(false);

  return (
    <GradientPill
      as={Link}
      href={href}
      onClick={onClick}
      borderGlowActive={hovered}
      rotateEnabled={hovered}
      emphasizeBorder={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      containerClassName="w-full cursor-pointer"
      className={`flex w-full justify-center !px-3 !py-2.5 text-sm font-medium tracking-tight !font-medium ${navChakra}`}
    >
      {children}
    </GradientPill>
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
            <HoverBorderGradient
              as={Link}
              href="/sign-up"
              className={navChakra}
            >
              Sign up
            </HoverBorderGradient>
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
                <HoverBorderGradient
                  as={Link}
                  href="/sign-up"
                  onClick={closeMobile}
                  containerClassName="w-full"
                  className={`flex w-full justify-center ${navChakra}`}
                >
                  Sign up
                </HoverBorderGradient>
              </div>
            </MobileNavMenu>
          </div>
        </MobileNav>
      </ResizableNavbar>
    </header>
  );
}
