import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ id, children, className }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        "mb-5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:mb-8 sm:text-xs dark:text-zinc-200/90",
        className,
      )}
    >
      {children}
    </h2>
  );
}
