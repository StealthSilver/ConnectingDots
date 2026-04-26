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
      className={`absolute top-0 bottom-0 w-px bg-[length:1px_14px] bg-repeat-y bg-[linear-gradient(to_bottom,rgb(113_113_122/0.28)_0_3px,transparent_3px_14px)] dark:bg-[linear-gradient(to_bottom,rgb(161_161_170/0.24)_0_3px,transparent_3px_14px)] ${positionClass} ${className ?? ""}`}
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
