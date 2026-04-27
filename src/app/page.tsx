import { AboutSection } from "./components/section/about-section";
import { CtaSection } from "./components/section/cta-section";
import { FeaturesBentoSection } from "./components/section/features-bento-section";
import { Hero } from "./components/section/hero";
import { Navbar } from "./components/section/navbar";
import { SocialLinksSection } from "./components/section/social-links-section";
import { TestimonialsSection } from "./components/section/testimonials-section";
import { Footer } from "./components/section/site-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0">
        <Hero />
        <SocialLinksSection />
        <AboutSection />
        <FeaturesBentoSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
