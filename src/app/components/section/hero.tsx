import { HeroSignUpCta } from "@/app/components/section/hero-sign-up-cta";

const brandFont = "[font-family:var(--font-chakra-petch)]" as const;

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center gap-8 px-4 pb-16 pt-8 text-center sm:min-h-[calc(100svh-5rem)] sm:gap-10 sm:pb-24 sm:pt-12"
      aria-labelledby="hero-heading"
    >
      <h1
        id="hero-heading"
        className={`${brandFont} max-w-5xl text-5xl font-semibold leading-[1.08] tracking-tight text-foreground dark:text-white sm:text-6xl md:text-7xl`}
      >
        Connecting the dots and finding the patterns
      </h1>
      <p className="max-w-3xl text-lg leading-[1.75] text-muted dark:text-white sm:text-xl sm:leading-[1.7] md:text-2xl">
      Learn DSA, Web Development, AI/ML, and System Design with notes and courses. Sharing different stuff that I learn.
      </p>
     
      <div>
        <HeroSignUpCta />
      </div>
    </section>
  );
}
