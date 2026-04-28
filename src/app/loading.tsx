import Image from "next/image";

import { cn } from "@/lib/utils";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Connecting Dots"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-7 px-6 text-center">
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
            className={cn(
              navChakra,
              "truncate text-xl font-normal tracking-tight text-foreground sm:text-2xl md:text-3xl",
            )}
          >
            Connecting Dots
          </span>
        </div>

        <ConnectingDotsIndicator />

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
          Connecting the dots
        </p>
      </div>
    </div>
  );
}

function ConnectingDotsIndicator() {
  return (
    <div
      aria-hidden
      className="relative flex h-3 items-center gap-2.5"
    >
      <span className="absolute inset-x-1.5 top-1/2 h-px -translate-y-1/2 bg-line" />
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="relative h-2.5 w-2.5 rounded-full bg-foreground/80 [animation:cd-pulse_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}

      <style>{`
        @keyframes cd-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
