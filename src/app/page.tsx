import { Navbar } from "./components/section/navbar";
import { Hero } from "./components/section/hero";
import { Footer } from "./components/section/site-footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
