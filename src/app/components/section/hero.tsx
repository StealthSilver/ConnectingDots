export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-border/60"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-hero-mesh"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gradient-start/25 blur-3xl dark:bg-gradient-start/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gradient-end/25 blur-3xl dark:bg-gradient-end/20"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 md:pt-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted ring-1 ring-inset ring-border/50 backdrop-blur sm:text-sm">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden
          />
          Computer science, taught through real projects
        </p>

        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]"
        >
          Connect the ideas.{" "}
          <span className="text-accent">Build the systems.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          <strong className="font-medium text-foreground">Connecting Dots</strong> is
          my learning space for DSA, web development, AI/ML, and system design — with
          notes growing every week and full courses on the way.
        </p>

        <div
          id="hero-cta"
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#tracks"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-6 text-sm font-medium text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-background"
          >
            Explore tracks
          </a>
          <a
            href="#content"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card/50 px-6 text-sm font-medium text-foreground transition hover:border-accent/40 hover:bg-accent-muted/30"
          >
            See what&apos;s live
          </a>
        </div>

        <p className="mt-8 text-sm text-muted">
          Notes for{" "}
          <span className="text-foreground/90">Web Dev</span> and{" "}
          <span className="text-foreground/90">DSA</span> are live; more areas roll out
          on the roadmap.
        </p>
      </div>
    </section>
  );
}
