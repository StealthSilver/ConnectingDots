import { Testimonials01 } from "@/components/testimonials-01";

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="max-w-screen overflow-x-hidden"
      aria-label="Testimonials"
    >
      <div className="container mx-auto px-4 py-8">
        <Testimonials01 />
      </div>
    </section>
  );
}
