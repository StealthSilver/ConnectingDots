import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
};

const variantClass = {
  default:
    "border border-transparent bg-accent text-white shadow hover:bg-accent/90 dark:text-white",
  outline:
    "border border-border bg-background shadow-sm hover:bg-accent/10 dark:hover:bg-accent/15",
  ghost: "hover:bg-muted/20",
} as const;

const sizeClass = {
  default: "h-9 min-h-9 px-4 py-2",
  sm: "h-8 min-h-8 rounded-md px-3 text-sm",
  lg: "h-11 min-h-11 rounded-md px-4 text-base sm:px-8",
  icon: "h-9 w-9 p-0",
} as const;

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        "rounded-md",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
}
