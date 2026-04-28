"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport vertical guides: outer pair aligns with `max-w-7xl`; two inner
 * lines divide that width into thirds. Dotted mid-grey for contrast on both themes.
 *
 * When any element carries `data-grid-stop`, the lines are clipped so they stop
 * at that element's bottom edge (e.g. the site footer, above the logotype band).
 */
function DottedGuide({
  className,
  positionClass,
}: {
  className?: string;
  positionClass: string;
}) {
  return (
    <div
      className={`absolute top-0 bottom-0 w-px bg-[length:1px_14px] bg-repeat-y bg-[linear-gradient(to_bottom,rgb(113_113_122/0.28)_0_3px,transparent_3px_14px)] dark:bg-[linear-gradient(to_bottom,rgb(161_161_170/0.24)_0_3px,transparent_3px_14px)] ${positionClass} ${className ?? ""}`}
    />
  );
}

export function PageGridLines() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const startEl = document.querySelector<HTMLElement>("[data-grid-start]");
      const stopEl = document.querySelector<HTMLElement>("[data-grid-stop]");
      const container = containerRef.current;
      if (!container) return;

      const top = startEl ? Math.max(0, startEl.getBoundingClientRect().bottom) : 0;
      const bottom = stopEl ? Math.max(0, stopEl.getBoundingClientRect().bottom) : undefined;

      container.style.top = `${top}px`;
      container.style.height = bottom !== undefined ? `${Math.max(0, bottom - top)}px` : "";
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    const startEl = document.querySelector("[data-grid-start]");
    const stopEl = document.querySelector("[data-grid-stop]");
    if (startEl) ro.observe(startEl);
    if (stopEl) ro.observe(stopEl);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-x-0 z-[5] flex justify-center overflow-hidden"
      aria-hidden
    >
      <div className="relative h-full w-full max-w-7xl">
        <DottedGuide positionClass="left-0" />
        <DottedGuide positionClass="left-[33.333333%] -translate-x-1/2" />
        <DottedGuide positionClass="left-[66.666667%] -translate-x-1/2" />
        <DottedGuide positionClass="right-0" />
      </div>
    </div>
  );
}
