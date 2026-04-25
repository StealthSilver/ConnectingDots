const phases = [
  {
    label: "Now",
    title: "Notes & quality",
    desc: "Web Dev and DSA notes are the current focus: polish, more topics, and cross-links.",
  },
  {
    label: "Next",
    title: "New subject areas",
    desc: "AI/ML and system design will get the same project-led treatment as the rest.",
  },
  {
    label: "Later",
    title: "Courses & depth",
    desc: "Full courses for each pillar — with assignments, codebases, and clear milestones.",
  },
];

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="py-20 sm:py-24"
      aria-labelledby="roadmap-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2
          id="roadmap-heading"
          className="font-brand text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          How this place grows
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
          A small roadmap — honest about what exists today and what I&apos;m building
          toward. Nothing flashy; just a clear path.
        </p>

        <ol className="mt-12 space-y-0 border-l border-border pl-6 sm:pl-8">
          {phases.map((p) => (
            <li key={p.label} className="relative pb-12 last:pb-0">
              <span
                className="absolute -left-6 top-0 flex h-3 w-3 -translate-x-[6px] items-center justify-center sm:-left-8 sm:-translate-x-[2px]"
                aria-hidden
              >
                <span className="h-2.5 w-2.5 rounded-full border-2 border-background bg-accent ring-2 ring-accent/30" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {p.label}
              </p>
              <h3 className="font-brand mt-1 text-lg font-medium text-foreground">{p.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {p.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
