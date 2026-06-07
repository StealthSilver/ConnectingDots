import Image from "next/image";

import { pageContentShellClassName } from "@/lib/page-content-shell";
import { SectionHeading } from "./section-heading";

const letterFont = "[font-family:var(--font-kalam)]" as const;

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-screen max-w-full pb-10 pt-4 sm:pb-16 sm:pt-6"
    >
      <div
        className={`${pageContentShellClassName} text-left`}
      >
        <SectionHeading id="about-heading" className="mb-6 text-left sm:mb-8">
          About
        </SectionHeading>
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-14">
          <div
            className={`${letterFont} min-w-0 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed lg:max-w-none`}
          >
            <p className="mb-5 sm:mb-8">
              I built this website as a companion to my teaching and learning
              journey a place to collect, organize, and share the ideas,
              lessons, and experiences I have gathered along the way.
            </p>
            <p className="mb-5 sm:mb-8">
              Over the years, I have learned from classrooms, projects,
              mentors, mistakes, experiments, and countless hours of
              exploration. This space is where I document those learnings in a
              form that is easier to revisit, reflect on, and build upon.
            </p>
            <p className="mb-5 sm:mb-8">
              You will find articles, notes, explanations, and practical
              insights drawn from real experiences. As this journey continues, I
              also plan to create structured courses for topics that deserve a
              more guided, step-by-step approach.
            </p>
            <p>
              This is not a destination with a finish line. It is an evolving
              record of continuous learning, teaching, and sharing. If you are
              curious, enjoy learning deeply, and believe that knowledge grows
              when it is shared, I am glad you are here.
            </p>
            <p className="mt-5 text-sm text-muted-foreground/80 sm:mt-8 sm:text-lg">
              — Rajat Saraswat
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-xs shrink-0 sm:max-w-md lg:mx-0 lg:max-w-none lg:justify-self-end">
            <Image
              src="/about.png"
              alt="About section illustration"
              width={1359}
              height={1158}
              sizes="(min-width: 1024px) min(50vw, 680px), min(100vw - 2rem, 24rem)"
              className="h-auto w-full rounded-lg object-contain object-center lg:object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
