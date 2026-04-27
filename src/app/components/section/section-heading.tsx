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
        "mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/90",
        className,
      )}
    >
      {children}
    </h2>
  );
}
