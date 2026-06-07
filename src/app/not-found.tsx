import type { Metadata } from "next";

import { GlowCard } from "@/components/glow-card-grid";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { cn } from "@/lib/utils";

import { NotFoundCtaButtons } from "./components/not-found-cta-buttons";
import { Navbar } from "./components/section/navbar";
import { Footer } from "./components/section/site-footer";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

export const metadata: Metadata = {
  title: "404 — Connecting Dots",
  description: "The dot you’re looking for isn’t connected.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0">
        <section
          aria-labelledby="not-found-heading"
          className="w-full pb-10 pt-6 sm:pb-28 sm:pt-16"
        >
          <div className={pageContentShellClassName}>
            <GlowCard className="w-full">
              <div className="flex flex-col items-center gap-5 px-4 py-8 text-center sm:gap-10 sm:px-12 sm:py-20 lg:px-20">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-200/70">
                  404 — Lost in the network
                </p>

                <h1
                  id="not-found-heading"
                  className={cn(
                    navChakra,
                    "max-w-2xl text-xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
                  )}
                >
                  This dot isn&apos;t connected.
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg sm:text-balance">
                  The page you&apos;re looking for doesn&apos;t exist, or it
                  may have moved. Head back to the homepage, or wander
                  through the blogs while you&apos;re here.
                </p>

                <NotFoundCtaButtons />
              </div>
            </GlowCard>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
