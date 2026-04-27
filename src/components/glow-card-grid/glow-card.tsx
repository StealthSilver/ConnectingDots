import { cn } from "@/lib/utils";

const cardSurface =
  "relative flex h-full min-h-0 w-full min-w-0 flex-col justify-center overflow-hidden rounded-2xl border " +
  "border-zinc-200/80 bg-zinc-50/90 p-4 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)] " +
  "dark:border-zinc-700/70 dark:bg-zinc-950/50 dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.35)] " +
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 " +
  "before:bg-gradient-to-br before:from-[#ffb21a]/20 before:via-[#f4420c]/8 before:to-[#230c36]/15 " +
  "before:transition-opacity before:duration-500 group-hover:before:opacity-100";

const cornerGlow =
  "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full " +
  "bg-gradient-to-br from-[#ffb21a]/35 via-[#f4420c]/20 to-[#230c36]/25 blur-2xl " +
  "opacity-0 transition-opacity duration-500 group-hover:opacity-100 " +
  "dark:from-[#ffb21a]/25 dark:via-[#f4420c]/12";

export type GlowCardProps = {
  name: string;
  handle: string;
  /** Image URL (e.g. from unavatar.io or any HTTPS avatar). */
  avatar: string;
  className?: string;
  /** Wider or taller cells: show longer handle text with wrapping. */
  size?: "default" | "prominent";
};

export function GlowCard({ name, handle, avatar, className, size = "default" }: GlowCardProps) {
  const prominent = size === "prominent";

  return (
    <div
      className={cn(
        "group h-full w-full min-w-0 flex-1",
        prominent ? "min-h-[min(100%,12rem)]" : "min-h-[5.5rem]",
        className,
      )}
    >
      <div
        className={cn(
          cardSurface,
          prominent ? "min-h-0 flex-1 justify-center gap-4 p-5 sm:p-6" : "min-h-0 sm:min-h-[5.5rem]",
        )}
      >
        <span className={cornerGlow} aria-hidden />
        <div
          className={cn(
            "relative flex w-full min-w-0 items-center gap-3",
            prominent && "sm:gap-4",
          )}
        >
          <div
            className={cn(
              "relative shrink-0 overflow-hidden rounded-full border border-zinc-200/80 bg-zinc-100 ring-2 ring-white/60 dark:border-zinc-600/50 dark:bg-zinc-800 dark:ring-zinc-900/80",
              prominent ? "h-14 w-14 sm:h-16 sm:w-16" : "h-12 w-12",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- remote avatar URLs; avoids image config. */}
            <img
              src={avatar}
              alt=""
              width={64}
              height={64}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="min-w-0 flex-1 py-0.5">
            <p
              className={cn(
                "font-semibold leading-snug tracking-tight text-foreground",
                prominent ? "text-base sm:text-lg" : "text-sm sm:text-base",
              )}
            >
              {name}
            </p>
            <p
              className={cn(
                "text-zinc-600 dark:text-zinc-400",
                prominent
                  ? "mt-1.5 text-pretty text-sm leading-relaxed sm:text-[0.9375rem]"
                  : "mt-0.5 line-clamp-2 text-sm leading-snug",
              )}
            >
              {handle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
