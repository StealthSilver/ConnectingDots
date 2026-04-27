import { Hero01CtaButtons } from "@/components/hero-01-cta-buttons";

export function Hero01() {
  return (
    <div className="w-screen max-w-full pb-8 pt-6 sm:pt-10">
      <div className="container mx-auto max-sm:px-2">
        <div className="relative w-full max-w-6xl px-4 py-10 text-left sm:px-6 sm:py-14 lg:px-8 lg:py-16 ms-0 me-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex flex-col justify-center">
      <h1
        id="hero-heading"
        className="mb-4 font-heading text-[2.5rem] leading-none font-semibold tracking-tight text-foreground sm:mb-6 sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl"
      >
        Connect what you learn.
      </h1>

      <p className="mb-6 !leading-normal text-base text-muted-foreground sm:mb-8 sm:text-xl sm:text-balance md:text-lg lg:text-xl">
        Connecting Dots is the written companion to the channel—blogs and notes
        when a topic needs room to breathe, and courses when it helps to learn
        step by step.
      </p>

      <Hero01CtaButtons />
    </div>
  );
}
