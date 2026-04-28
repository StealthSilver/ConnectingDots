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
              I built this site as a quiet companion to my YouTube channel somewhere
              the same ideas can settle into words, with a little more room to breathe
              than a video title or a comment box allows.
            </p>
            <p className="mb-5 sm:mb-8">
              Here, I want to share what I learn in a more formal, lasting way: articles
              and notes when a topic needs depth, and down the line structured courses
              when it helps to learn step by step. The channel starts the conversation;
              this place is for the slower, written half of that story.
            </p>
            <p>
              I am not promising a flood of posts overnight. This is a commitment in
              small pieces over time: show up, write clearly, and add what is useful
              as I go. If that sounds like your pace too, I am glad you are here.
            </p>
            <p className="mt-5 text-sm text-muted-foreground/80 sm:mt-8 sm:text-lg">
              — Silver
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
