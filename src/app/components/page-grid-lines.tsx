/**
 * Full-viewport vertical guides: outer pair aligns with `max-w-6xl`; two inner
 * lines divide that width into thirds. Dotted mid-grey for contrast on both themes.
 */
function DottedGuide({
  className,
  positionClass,
}: {
  className?: string;
  positionClass: string;
}) {
  return (
    <div
      className={`border-zinc-500/55 absolute top-0 bottom-0 w-0 border-l border-dotted dark:border-zinc-400/50 ${positionClass} ${className ?? ""}`}
    />
  );
}

export function PageGridLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] flex justify-center"
      aria-hidden
    >
      <div className="relative h-full w-full max-w-6xl">
        <DottedGuide positionClass="left-0" />
        <DottedGuide positionClass="left-[33.333333%] -translate-x-1/2" />
        <DottedGuide positionClass="left-[66.666667%] -translate-x-1/2" />
        <DottedGuide positionClass="right-0" />
      </div>
    </div>
  );
}
