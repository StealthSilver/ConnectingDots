import { Testimonials01 } from "@/components/testimonials-01";
import { pageContentShellClassName } from "@/lib/page-content-shell";

import { SectionHeading } from "./section-heading";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-10 sm:py-16"
    >
      <div className={pageContentShellClassName}>
        <SectionHeading
          id="testimonials-heading"
          className="mb-6 text-left sm:mb-10"
        >
          Testimonials
        </SectionHeading>
      </div>
      <Testimonials01 />
    </section>
  );
}
