import type { BlogPost } from "@/lib/blog-types"

/** Default blog posts used when seeding or when DB documents omit full content. */
export const blogSeedData: BlogPost[] = [
  {
    slug: "what-is-flat-design",
    title: "What Is Flat Design?",
    subheading:
      "The design approach that aged better than almost anything else in UI — and what it takes to get it right.",
    excerpt:
      "The design approach that aged better than almost anything else in UI. Here's why, and what it takes to get it right.",
    date: "June 7, 2026",
    readingTime: "8 min read",
    tags: ["Design", "UI", "Frontend"],
    content: [
      {
        type: "paragraph",
        text: "Flat design strips away the ornamental layers that once dominated the web — gradients, drop shadows, skeuomorphic textures — and asks a simpler question: can the interface communicate clearly without pretending to be something physical?",
      },
      {
        type: "paragraph",
        text: "When it landed in the early 2010s, it felt radical. Today it feels obvious. That is usually the mark of a good idea.",
      },
      {
        type: "heading",
        level: 2,
        text: "What flat design actually is",
      },
      {
        type: "paragraph",
        text: "At its core, flat design is a visual language built on typography, color, spacing, and hierarchy. Buttons look like buttons because of contrast and placement, not because they resemble plastic keys on a keyboard.",
      },
      {
        type: "list",
        items: [
          "Minimal or no shadows, bevels, or glossy highlights",
          "Bold, readable type with a clear size scale",
          "Simple geometric shapes and iconography",
          "Color used for meaning — states, categories, emphasis",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Why it still works",
      },
      {
        type: "paragraph",
        text: "Screens are not paper and not wood grain. Flat UI respects the medium. It loads fast, scales cleanly across breakpoints, and keeps attention on content instead of chrome.",
      },
      {
        type: "paragraph",
        text: "It also ages well. Skeuomorphism dates quickly because textures reference a specific era of technology. Flat interfaces feel timeless when the typography and spacing are disciplined.",
      },
      {
        type: "heading",
        level: 3,
        text: "The trap: flat does not mean boring",
      },
      {
        type: "paragraph",
        text: "The most common mistake is removing depth entirely and calling it done. Good flat design still uses subtle borders, hover states, and motion to show what is interactive. Flat is not the absence of feedback — it is the absence of decoration that does not earn its place.",
      },
      {
        type: "heading",
        level: 2,
        text: "How to apply it on real projects",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Define a type scale first. If headings and body text are clear, you need fewer visual tricks.",
          "Limit your palette. One accent color plus neutrals beats a rainbow of flat blocks.",
          "Use spacing as structure. Whitespace is not empty — it groups related elements.",
          "Test touch targets on mobile. Flat buttons must still feel tappable at 44px minimum.",
          "Add depth only where it helps — modals, dropdowns, and focus rings still need separation.",
        ],
      },
      {
        type: "paragraph",
        text: "Flat design won because it respects clarity over spectacle. Build with restraint, measure readability, and let content lead. That is the whole point.",
      },
    ],
  },
  {
    slug: "what-are-breadcrumbs-in-web-design",
    title: "What Are Breadcrumbs in Web Design and Why Your Site Needs Them",
    subheading:
      "Give users a visible trail back through your hierarchy — fewer dead ends, less frustration, stronger SEO signals.",
    excerpt:
      "Make navigation effortless with breadcrumbs. Give users clear paths, reduce backtracking, and support stronger UX and SEO.",
    date: "June 7, 2026",
    readingTime: "7 min read",
    tags: ["Design", "UX", "SEO"],
    content: [
      {
        type: "paragraph",
        text: "Breadcrumbs are the small navigation trail you often see below a header: Home › Blog › Article title. They answer one question instantly — where am I, and how did I get here?",
      },
      {
        type: "paragraph",
        text: "They look minor. On complex sites they are one of the highest-leverage UX patterns you can add.",
      },
      {
        type: "heading",
        level: 2,
        text: "The three common types",
      },
      {
        type: "heading",
        level: 3,
        text: "Location-based",
      },
      {
        type: "paragraph",
        text: "Shows the user's place in the site hierarchy. Example: Store › Shoes › Running. Each segment links to its parent category. This is the type most product and content sites should implement.",
      },
      {
        type: "heading",
        level: 3,
        text: "Attribute-based",
      },
      {
        type: "paragraph",
        text: "Common on e-commerce filters: Home › Shoes › Red › Size 10. Useful when users combine facets, but can get long quickly. Keep labels short and human-readable.",
      },
      {
        type: "heading",
        level: 3,
        text: "History-based",
      },
      {
        type: "paragraph",
        text: "Reflects the path the user actually clicked: Home › Search results › Product. Browser back buttons already cover much of this, so history breadcrumbs are less common unless you have a multi-step flow worth preserving.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why breadcrumbs matter for UX",
      },
      {
        type: "list",
        items: [
          "Reduce backtracking — users jump up one level instead of starting over",
          "Orient newcomers who land from search on a deep page",
          "Lower cognitive load by making structure visible",
          "Support accessibility when built as a labeled nav landmark",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "SEO benefits (without the hype)",
      },
      {
        type: "paragraph",
        text: "Search engines use breadcrumbs to understand site structure. Structured data (BreadcrumbList schema) can enhance snippets, but the fundamentals matter more: consistent URLs, descriptive labels, and links that reflect your real hierarchy.",
      },
      {
        type: "heading",
        level: 2,
        text: "Design guidelines that hold up",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Place breadcrumbs near the top of the content area, below the main nav",
          "Use a clear separator — › or / — and keep the current page as plain text",
          "Truncate long titles on small screens; show Home and the nearest parent first",
          "Mark the nav with aria-label=\"Breadcrumb\" and use an ordered list in the markup",
          "Do not replace primary navigation — breadcrumbs complement it",
        ],
      },
      {
        type: "paragraph",
        text: "Breadcrumbs are cheap to implement and expensive to omit on any site with more than two levels of depth. Add them early, keep labels honest, and your users will feel the difference on the first deep link they open.",
      },
    ],
  },
]

export function getBlogSeedPost(slug: string): BlogPost | undefined {
  return blogSeedData.find((post) => post.slug === slug)
}
