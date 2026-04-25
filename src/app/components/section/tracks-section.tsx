const tracks = [
  {
    title: "Data structures & algorithms",
    blurb: "Problem patterns, complexity, and interview-ready thinking — built from fundamentals up.",
    status: "Notes live" as const,
  },
  {
    title: "Web development",
    blurb: "Front to back: modern JavaScript, React, APIs, and shipping real interfaces.",
    status: "Notes live" as const,
  },
  {
    title: "AI & machine learning",
    blurb: "Models, training intuition, and applied ML for builders who care about the stack end to end.",
    status: "Coming soon" as const,
  },
  {
    title: "System design",
    blurb: "Scalable services, data flows, and tradeoffs — how systems stay coherent at scale.",
    status: "Coming soon" as const,
  },
];

function statusStyles(s: (typeof tracks)[0]["status"]) {
  if (s === "Notes live") {
    return "bg-accent/12 text-foreground ring-accent/25 dark:bg-accent/10";
  }
  return "bg-muted/40 text-muted ring-border";
}

export function TracksSection() {
  return (
    <section
      id="tracks"
      className="border-b border-border/60 py-20 sm:py-24"
      aria-labelledby="tracks-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2
            id="tracks-heading"
            className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            What you can learn here
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Four pillars I teach through this site — each track is built around projects
            and clear explanations, not just theory.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {tracks.map((t) => (
            <li key={t.title}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-accent/30 hover:shadow-sm hover:shadow-accent/5">
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusStyles(t.status)}`}
                >
                  {t.status}
                </span>
                <h3 className="mt-4 text-lg font-medium text-foreground group-hover:text-accent">
                  {t.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t.blurb}
                </p>
                <div
                  className="mt-5 flex items-center gap-1 text-sm font-medium text-accent opacity-0 transition group-hover:opacity-100"
                  aria-hidden
                >
                  <span>Details in notes</span>
                  <span aria-hidden>→</span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
