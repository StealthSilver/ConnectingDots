import { Navbar } from "./components/section/navbar";
import { Hero } from "./components/section/hero";
import { TracksSection } from "./components/section/tracks-section";
import { ContentSection } from "./components/section/content-section";
import { RoadmapSection } from "./components/section/roadmap-section";
import { SiteFooter } from "./components/section/site-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TracksSection />
        <ContentSection />
        <RoadmapSection />
      </main>
      <SiteFooter />
    </>
  );
}
