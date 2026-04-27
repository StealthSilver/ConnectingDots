import { AboutSection } from "./components/section/about-section";
import { Hero } from "./components/section/hero";
import { Navbar } from "./components/section/navbar";
import { Footer } from "./components/section/site-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0">
        <Hero />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
