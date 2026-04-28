import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import { TestimonialSpotlight } from "@/components/testimonial-spotlight";
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/components/ui/testimonial";

export type TestimonialType = {
  authorAvatar: string;
  authorName: string;
  authorTagline: string;
  url: string;
  quote: string;
};

export function TestimonialList({
  direction,
  data,
}: {
  direction?: "right" | "left";
  data: TestimonialType[];
}) {
  return (
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />

      <MarqueeContent direction={direction}>
        {data.map((item) => (
          <MarqueeItem key={item.url} className="mx-1.5 h-full w-72">
            <a
              className="block h-full"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TestimonialSpotlight className="h-full">
                <TestimonialItem {...item} />
              </TestimonialSpotlight>
            </a>
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
}

function TestimonialItem({
  authorAvatar,
  authorName,
  authorTagline,
  quote,
}: TestimonialType) {
  return (
    <Testimonial className="h-full">
      <TestimonialQuote className="min-h-16 px-4 pt-4 pb-3">
        <span className="mb-2 block text-lg font-serif leading-none text-muted-foreground/50 select-none">
          &ldquo;
        </span>
        <p className="text-sm leading-relaxed text-foreground/85">{quote}</p>
      </TestimonialQuote>

      <div className="mx-4 h-px bg-chrome-border/40" />

      <TestimonialAuthor className="px-4 py-3">
        <TestimonialAvatar>
          <TestimonialAvatarImg src={authorAvatar} alt={authorName} />
          <TestimonialAvatarRing />
        </TestimonialAvatar>

        <TestimonialAuthorName className="text-xs">{authorName}</TestimonialAuthorName>
        <TestimonialAuthorTagline className="text-[11px]">{authorTagline}</TestimonialAuthorTagline>
      </TestimonialAuthor>
    </Testimonial>
  );
}
