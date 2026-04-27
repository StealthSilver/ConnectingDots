import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type GlowCardGridProps = ComponentProps<"div">;

export function GlowCardGrid({ className, style, children, ...props }: GlowCardGridProps) {
  return (
    <div
      className={cn("grid", className)}
      style={{ gridAutoRows: "minmax(0, auto)", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
