import type { TablerIcon } from "@tabler/icons-react";
import {
  IconArticle,
  IconBooks,
  IconBrain,
  IconCode,
  IconNotebook,
  IconPalette,
  IconPuzzle,
  IconRoad,
  IconSchool,
  IconTerminal2,
} from "@tabler/icons-react";

import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/components/ui/testimonial";
import { pageContentShellClassName } from "@/lib/page-content-shell";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

const navChakra = "[font-family:var(--font-chakra-petch)]" as const;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3275F8]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-background";

const featureSurfaceClass = cn(
  "overflow-hidden rounded-2xl border border-chrome-border bg-card/50 shadow-sm transition will-change-transform",
  "hover:-translate-y-0.5 hover:text-foreground dark:bg-card/40",
  focusRing,
);

type FeatureDef = {
  title: string;
  tagline: string;
  description: string;
  icon: TablerIcon;
  /** Responsive bento spans: dense 6-col layout at `lg`, 2-col at `md`. */
  bentoClass: string;
};

const features: FeatureDef[] = [
  {
    title: "Blogs",
    tagline: "Reading & depth",
    description:
      "Long-form articles when a topic deserves depth beyond a video.",
    icon: IconArticle,
    bentoClass:
      "md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[240px]",
  },
  {
    title: "Notes for DSA",
    tagline: "Interview-ready",
    description: "Structures, patterns, and interview-ready summaries.",
    icon: IconNotebook,
    bentoClass: "md:col-span-1 lg:col-span-2 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "AI / ML",
    tagline: "Projects & notebooks",
    description: "Foundations through notebooks and applied mini-projects.",
    icon: IconBrain,
    bentoClass: "md:col-span-1 lg:col-span-2 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "Web Dev",
    tagline: "Frontend to backend",
    description: "Frontend, backend, and full-stack paths in one place.",
    icon: IconCode,
    bentoClass:
      "md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[240px]",
  },
  {
    title: "Designing",
    tagline: "UI & product thinking",
    description: "UI craft, layout, and product thinking for builders.",
    icon: IconPalette,
    bentoClass: "md:col-span-1 lg:col-span-2 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "Upcoming courses",
    tagline: "Step-by-step tracks",
    description: "Structured tracks you can follow step by step.",
    icon: IconSchool,
    bentoClass: "md:col-span-1 lg:col-span-2 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "Roadmaps to learn",
    tagline: "Paths from zero to hire",
    description: "Clear paths from first concepts to job-ready skills.",
    icon: IconRoad,
    bentoClass: "md:col-span-2 lg:col-span-3 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "Playground to test code",
    tagline: "Snippets in-browser",
    description: "Try snippets and experiments without leaving the site.",
    icon: IconTerminal2,
    bentoClass: "md:col-span-2 lg:col-span-3 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "Problem sets to practice",
    tagline: "Hints & explanations",
    description: "Curated exercises with hints and worked explanations.",
    icon: IconPuzzle,
    bentoClass: "md:col-span-2 lg:col-span-3 lg:row-span-1 lg:min-h-[120px]",
  },
  {
    title: "CS concepts",
    tagline: "Systems & theory",
    description: "OS, networks, databases, and theory made practical.",
    icon: IconBooks,
    bentoClass: "md:col-span-2 lg:col-span-3 lg:row-span-1 lg:min-h-[120px]",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="w-screen max-w-full pb-12 pt-12 sm:pb-16 sm:pt-14"
    >
      <div className={`${pageContentShellClassName} text-left`}>
        <SectionHeading id="features-heading" className="mb-7 text-left sm:mb-8">
          Features
        </SectionHeading>

        <ul
          className={cn(
            "grid list-none gap-3 md:auto-rows-[minmax(112px,auto)] md:grid-cols-2 md:gap-3.5 lg:grid-cols-6 lg:gap-4 lg:auto-rows-[minmax(120px,auto)]",
            "grid-cols-1",
          )}
        >
          {features.map(
            ({ title, tagline, description, icon: Icon, bentoClass }) => (
              <li key={title} className={cn("min-h-0", bentoClass)}>
                <FeatureTestimonialCard
                  title={title}
                  tagline={tagline}
                  description={description}
                  icon={Icon}
                />
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

function FeatureTestimonialCard({
  title,
  tagline,
  description,
  icon: Icon,
}: {
  title: string;
  tagline: string;
  description: string;
  icon: TablerIcon;
}) {
  return (
    <Testimonial
      className={cn(featureSurfaceClass, "h-full")}
      aria-label={title}
    >
      <TestimonialQuote className="text-muted-foreground">
        <p className="leading-relaxed">{description}</p>
      </TestimonialQuote>
      <TestimonialAuthor className="bg-card/30 dark:bg-card/20">
        <TestimonialAvatar className="flex items-center justify-center rounded-full border border-chrome-border bg-background/90 text-muted-foreground dark:bg-background/50">
          <Icon className="size-4 shrink-0" aria-hidden />
          <TestimonialAvatarRing />
        </TestimonialAvatar>
        <TestimonialAuthorName className={cn(navChakra, "text-base")}>
          {title}
        </TestimonialAuthorName>
        <TestimonialAuthorTagline>{tagline}</TestimonialAuthorTagline>
      </TestimonialAuthor>
    </Testimonial>
  );
}
