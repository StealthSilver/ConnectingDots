import { AboutSection } from "./components/section/about-section";
import { CtaSection } from "./components/section/cta-section";
import { FeaturesSection } from "./components/section/features-section";
import { Hero } from "./components/section/hero";
import { Navbar } from "./components/section/navbar";
import { Footer } from "./components/section/site-footer";
import { TestimonialsSection } from "./components/section/testimonials-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0">
        <Hero />
        <TestimonialsSection />
        <AboutSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
