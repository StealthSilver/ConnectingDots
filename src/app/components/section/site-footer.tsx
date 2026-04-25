export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-card/30 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-brand text-sm font-medium text-foreground">Connecting Dots</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Learning computer science by wiring ideas together — notes and courses, one
              project at a time.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
            <a href="#tracks" className="text-muted transition hover:text-foreground">
              Tracks
            </a>
            <a href="#content" className="text-muted transition hover:text-foreground">
              Notes
            </a>
            <a href="#roadmap" className="text-muted transition hover:text-foreground">
              Roadmap
            </a>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-muted sm:text-left">
          © {new Date().getFullYear()} Connecting Dots. Built to teach and learn in
          public.
        </p>
      </div>
    </footer>
  );
}
