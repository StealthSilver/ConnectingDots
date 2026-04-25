export function ContentSection() {
  return (
    <section
      id="content"
      className="border-b border-border/60 py-20 sm:py-24"
      aria-labelledby="content-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2
          id="content-heading"
          className="font-brand text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          On the site today
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
          I’m publishing and refining material continuously — start with the tracks that
          already have full note sets, and watch this space for structured courses.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
              Notes
            </h3>
            <ul className="mt-4 space-y-4 text-sm sm:text-base">
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <div>
                  <p className="font-medium text-foreground">Web development</p>
                  <p className="text-muted">Guides and deep dives — live now; more pages added often.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden
                />
                <div>
                  <p className="font-medium text-foreground">DSA</p>
                  <p className="text-muted">Structured notes to pair code practice with clear theory.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-dashed border-border/80 bg-background/50 p-6 sm:p-8">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
              Next on the list
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-foreground/50" aria-hidden>
                  ○
                </span>
                <span>AI/ML — intuition + practical notebooks and project walkthroughs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/50" aria-hidden>
                  ○
                </span>
                <span>System design — case studies, diagrams, and how to reason under constraints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/50" aria-hidden>
                  ○
                </span>
                <span>Design principles — clarity, structure, and taste for software and interfaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/50" aria-hidden>
                  ○
                </span>
                <span>Full courses — end-to-end paths with projects and exercises</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
