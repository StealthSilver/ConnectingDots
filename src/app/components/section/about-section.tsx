import { SectionHeading } from "./section-heading";

const letterFont = "[font-family:var(--font-caveat)]" as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative px-4 pb-20 pt-4 sm:px-6 sm:pb-28"
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="about-heading">About</SectionHeading>
        <div
          className={[
            "rounded-sm border",
            "border-zinc-200/90 bg-zinc-50/95 shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]",
            "dark:border-zinc-700/50 dark:bg-zinc-950/50 dark:shadow-[0_1px_0_rgba(255,255,255,0.04),0_8px_24px_rgba(0,0,0,0.3)]",
            "px-6 py-8 sm:px-10 sm:py-10",
            "[background-image:repeating-linear-gradient(transparent,transparent_2rem,rgba(24,24,27,0.08)_2rem,rgba(24,24,27,0.08)_calc(2rem+1px))]",
            "dark:[background-image:repeating-linear-gradient(transparent,transparent_2rem,rgba(255,255,255,0.06)_2rem,rgba(255,255,255,0.06)_calc(2rem+1px))]",
          ].join(" ")}
        >
          <div
            className={`${letterFont} text-xl leading-8 text-zinc-700 sm:text-2xl sm:leading-9 dark:text-zinc-200`}
            style={{ textShadow: "0.5px 0.5px 0 rgba(0,0,0,0.04)" }}
          >
            <p className="mb-8">
              I built this site as a quiet companion to my YouTube channel—somewhere
              the same ideas can settle into words, with a little more room to breathe
              than a video title or a comment box allows.
            </p>
            <p className="mb-8">
              Here, I want to share what I learn in a more formal, lasting way: articles
              and notes when a topic needs depth, and—down the line—structured courses
              when it helps to learn step by step. The channel starts the conversation;
              this place is for the slower, written half of that story.
            </p>
            <p>
              I am not promising a flood of posts overnight. This is a commitment in
              small pieces over time: show up, write clearly, and add what is useful
              as I go. If that sounds like your pace too, I am glad you are here.
            </p>
            <p className="mt-8 text-right text-lg text-zinc-500 dark:text-zinc-400 sm:text-xl">
              — Silver
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
