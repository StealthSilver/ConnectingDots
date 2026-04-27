import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

export function NavbarButton({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & Record<string, unknown>) {
  const baseStyles =
    "relative z-30 inline-flex min-h-10 min-w-[5.5rem] cursor-pointer items-center justify-center rounded-full border border-transparent bg-transparent px-5 py-2.5 text-center text-base font-semibold leading-snug tracking-tight transition will-change-transform hover:-translate-y-px focus-visible:outline focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-white/30 dark:focus-visible:ring-offset-black";

  const variantStyles = {
    primary: cn(
      "border-black/20 bg-white !text-black shadow-sm dark:border-white/25 dark:bg-white dark:!text-black",
    ),
    secondary:
      "border border-black/20 bg-transparent text-black dark:border-white/20 dark:text-white",
    dark: "border border-black bg-black text-white shadow-sm dark:border-white dark:bg-white dark:text-black",
    gradient:
      "border border-black bg-black text-white shadow-sm dark:border-white dark:bg-white dark:text-black",
  } as const;

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      <span className="pointer-events-none relative z-[1] text-inherit">
        {children}
      </span>
    </Tag>
  );
}
