import { cn } from "@/lib/utils";
import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from "react";

export function Testimonial({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-3 p-4", className)} {...props}>
      {children}
    </div>
  );
}

export function TestimonialQuote({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-sm leading-relaxed text-foreground/95", className)} {...props}>
      {children}
    </div>
  );
}

export function TestimonialAuthor({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-0.5 [&>*:first-child]:row-span-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TestimonialAvatar({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative h-9 w-9 shrink-0 self-center", className)} {...props}>
      {children}
    </div>
  );
}

export function TestimonialAvatarImg({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className={cn("h-9 w-9 rounded-full object-cover", className)}
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}

export function TestimonialAvatarRing({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-border/60", className)}
      aria-hidden
    >
      {children}
    </div>
  );
}

export function TestimonialAuthorName({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm font-medium leading-tight text-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function TestimonialAuthorTagline({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs leading-snug text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
