"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { LoadingScreen } from "./loading-screen";

/** Minimum time (ms) the loader stays visible on initial page load. */
const INITIAL_DURATION = 700;
/** Fade-out animation duration — must match the `duration-300` in LoadingScreen. */
const FADE_DURATION = 300;

export function NavigationLoader() {
  const pathname = usePathname();

  // Start as `true` so Next.js SSR includes the loader in the initial HTML,
  // making it visible the instant the browser first paints the page.
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  const initialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstPathname = useRef(true);

  const hide = useCallback(() => {
    setFading(true);
    fadeTimerRef.current = setTimeout(() => {
      setLoading(false);
      setFading(false);
    }, FADE_DURATION);
  }, []);

  const show = useCallback(() => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setFading(false);
    setLoading(true);
  }, []);

  // Initial load: hide after minimum duration
  useEffect(() => {
    initialTimerRef.current = setTimeout(hide, INITIAL_DURATION);
    return () => {
      if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loader on internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      // Ignore: hash-only, external, mailto/tel, new-tab
      if (
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        anchor.target === "_blank"
      )
        return;

      // Ignore same-page navigation (same pathname, different hash)
      const targetPath = href.split("#")[0];
      if (targetPath === "" || targetPath === pathname) return;

      // Cancel initial load timer if still running
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current);
        initialTimerRef.current = null;
      }

      show();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, show]);

  // Hide loader once the new page is active (pathname has changed)
  useEffect(() => {
    if (isFirstPathname.current) {
      isFirstPathname.current = false;
      return;
    }
    hide();
  }, [pathname, hide]);

  if (!loading) return null;
  return <LoadingScreen className={fading ? "opacity-0" : "opacity-100"} />;
}
