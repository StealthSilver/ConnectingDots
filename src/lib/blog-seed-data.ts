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
  {
    slug: "complete-guide-to-buttons-in-web-design",
    title: "Complete Guide to Buttons in Web Design",
    subheading:
      "How to choose between buttons and links, build a clear hierarchy, and make every control look — and feel — clickable.",
    excerpt:
      "Buttons trigger actions. Links navigate. Get the semantics, hierarchy, and clickability right, and users know what to do before they click.",
    date: "July 1, 2026",
    readingTime: "10 min read",
    tags: ["Design", "UX", "Frontend"],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Button or Link?",
      },
      {
        type: "paragraph",
        text: "Users arrive at your interface with expectations built from years of browsing. Buttons trigger actions. Links navigate somewhere.",
      },
      {
        type: "paragraph",
        text: "When you blur that line, for example, a <div> styled to look like a button, a <button> used to jump to another page, you create a small but persistent confusion that adds up across every interaction.",
      },
      {
        type: "paragraph",
        text: "This is a semantic choice, not just a visual one. Native <button> elements carry built-in keyboard behavior, screen reader support, and browser compatibility you don't have to engineer from scratch.",
      },
      {
        type: "list",
        items: [
          'Use <a href> for navigation: "View pricing," "Read the documentation," "Back to homepage."',
          'Use <button> for actions: "Save," "Submit," "Delete," "Apply filters."',
        ],
      },
      {
        type: "paragraph",
        text: "When these roles remain consistent, users can predict what will happen before they click. That predictability is its own form of design quality.",
      },
      {
        type: "heading",
        level: 2,
        text: "Building a Button Hierarchy That Does the Work For You",
      },
      {
        type: "paragraph",
        text: "The goal of the button hierarchy is to answer one question at a glance: what should I do next? When the visual weight is distributed correctly, users don't have to deliberate. The interface has already made the priority clear.",
      },
      {
        type: "paragraph",
        text: "Most interfaces need three tiers:",
      },
      {
        type: "list",
        items: [
          'Primary is the main commitment at this step: signing up, confirming a purchase, and submitting a form. There should be one per decision point, whether that\'s a modal, a form, or a clear section of the page.',
          'Secondary supports or escapes that commitment: "Back," "Cancel," "Skip".',
          'Tertiary handles optional or exploratory actions ("Learn more," "View details") without competing for attention.',
        ],
      },
      {
        type: "paragraph",
        text: "Hierarchy and state are not the same thing, and mixing them up creates inconsistency that's hard to diagnose.",
      },
      {
        type: "paragraph",
        text: "Hierarchy is about the visual weight of a button's role: primary, secondary, or tertiary.",
      },
      {
        type: "paragraph",
        text: "State is about what's happening right now: enabled, focused, pressed, loading.",
      },
      {
        type: "paragraph",
        text: "When teams conflate these, they end up redesigning primary styles when they actually needed clearer focus states, and users experience the result as an interface that keeps changing on them.",
      },
      {
        type: "paragraph",
        text: 'Destructive actions sit outside this three-tier model. "Delete project," "Remove account," "Clear all data" should not look like a quieter secondary button. They deserve their own semantic variant (a danger or destructive style) that signals risk at a glance.',
      },
      {
        type: "paragraph",
        text: "According to Baymard Institute's usability research, interfaces that fail to visually distinguish destructive from non-destructive actions show significantly higher accidental deletion rates in usability testing. When the risk is clear, users pause and confirm. When it's not, they click and regret.",
      },
      {
        type: "heading",
        level: 2,
        text: "What Makes a Button Look Clickable",
      },
      {
        type: "paragraph",
        text: 'Users scan screens in under a second, looking for signals that say "this is interactive." Shape, color contrast, and clear boundaries do most of that work.',
      },
      {
        type: "paragraph",
        text: "A button that blends into the background (or that looks indistinguishable from body text) doesn't register as a control. Users skip it, miss it, or hesitate.",
      },
      {
        type: "paragraph",
        text: "A few signals carry significant weight:",
      },
      {
        type: "list",
        items: [
          "Shape and containment: A visible boundary (whether a filled background, an outline, or a distinct pill) tells users the element has an edge they can press.",
          "Color contrast: WCAG 2.2 requires a contrast ratio of at least 3:1 for UI components against their background. That's a floor, not a ceiling. In practice, the best buttons hold their readability in dark mode, on OLED screens, and with accessibility settings applied.",
          "Consistent spacing: Padding isn't decoration. It creates a comfortable hit area and ensures the label doesn't feel crammed. On mobile, targets below 44×44px measurably increase mis-taps and slowdowns.",
        ],
      },
      {
        type: "paragraph",
        text: "Where designers go wrong is in prioritizing visual interest over clarity. A button can be beautiful. It still has to read as pressable in half a second. When styling gets too clever (too subtle, too flat, too minimal), users hesitate. That pause is friction, and friction costs conversions.",
      },
    ],
  },
  {
    slug: "beyond-stillness-navigating-motion-design",
    title:
      "Beyond Stillness: Navigating Motion Design with Fundamental Principles",
    subheading:
      "A beginner's guide to motion design principles — purpose, timing, continuity, and rhythm that help people decide faster.",
    excerpt:
      "Motion is more than decoration. Learn the fundamentals of purpose, time, and spatial continuity so interfaces feel clear, intentional, and trustworthy.",
    date: "June 26, 2026",
    readingTime: "9 min read",
    tags: ["Design", "UX", "Motion"],
    content: [
      {
        type: "paragraph",
        text: "People see interfaces move, and then they read before the text, aligning with the principles of motion design. A person's movement might demonstrate how to explain order, show reason and result, and convey a company voice simultaneously. In moderation, it reduces effort, accelerates decisions, and establishes implicit trust.",
      },
      {
        type: "paragraph",
        text: "This article is a beginner's guide to ux design and motion design principles, covering foundational concepts and essential knowledge for newcomers interested in the field.",
      },
      {
        type: "paragraph",
        text: "When attention is used, it captures focus and increases time. Motion design is an art that combines creativity and technical skill, playing a vital role within graphic design.",
      },
      {
        type: "paragraph",
        text: "Our article on manipulating intervals and distance as physical elements rather than embellishments. You will master simple rules, distinct patterns, overlapping action, and a structure you can deploy. The aim is not to show off but rather to assist people seamlessly.",
      },
      {
        type: "heading",
        level: 2,
        text: "Why Motion Is More Than Decoration",
      },
      {
        type: "paragraph",
        text: "Interfaces move for a reason, not just for fun. According to the principles of motion design, Motion clarifies structure and cause and effect, carries brand voice, and, if used well, reduces cognitive load and builds trust. Motion graphic design, a subset of graphic design, combines static elements with movement to enhance communication.",
      },
      {
        type: "paragraph",
        text: "These fundamentals are grounded in motion principles, which are the foundation for designers' shippable rules: purpose, time, coherence, continuity, easing, hierarchy, feedback, systematization, inclusion, performance, interruptibility, and measurement. The term motion graphic is often used to describe animated visual elements that clarify structure and cause and effect.",
      },
      {
        type: "heading",
        level: 2,
        text: "Define the Job",
      },
      {
        type: "paragraph",
        text: "Every animation needs a job you can say in one sentence. You may not need the motion graphics if you cannot state the job.",
      },
      {
        type: "paragraph",
        text: "Purpose drives timing, easing, and complexity. It also sets limits. An animation that tries to welcome, educate, and sell will do none of those well. According to the principles of motion design, ask what the user should learn or feel right now.",
      },
      {
        type: "paragraph",
        text: "Animations can also convey character, using movement to express personality and emotion, which enhances storytelling and emotional engagement. Traditional animation often follows a narrative and uses characters to drive the story, while motion design focuses more on visual communication, composition, and style rather than character-driven plots.",
      },
      {
        type: "paragraph",
        text: "Speed, direction, rhythm, and scale should answer that question. Remove the motion if it does not serve comprehension, confidence, or control.",
      },
      {
        type: "paragraph",
        text: "Clear ideas drive effective motion design decisions. Defining an animator's job is crucial in the creative process, ensuring that each motion serves a clear purpose. The ux designers and the designer play a key role in shaping effective motion graphics by applying design principles and skills. Creativity is essential for designers to craft engaging and innovative animations that capture attention and communicate effectively.",
      },
      {
        type: "heading",
        level: 2,
        text: "Time as a Design Material",
      },
      {
        type: "paragraph",
        text: "Time sets expectations. Quick tasks deserve quick animations. Significant spatial moves can take slightly longer. Create a duration scale rather than random timings:",
      },
      {
        type: "list",
        items: [
          "120 to 160 ms for micro feedback, such as press or hover",
          "200 to 240 ms for short translations such as chip to panel",
          "300 to 400 ms for full-screen transitions or complex reflows",
        ],
      },
      {
        type: "paragraph",
        text: "Designers must decide whether objects should move simultaneously or at different speeds to achieve the desired focus and depth. Different speeds for various elements can create depth and focus, especially when animating multiple objects together. When objects of different masses move at the same speed, more force is needed to stop heavier objects, so considering mass and weight is important for realistic timing.",
      },
      {
        type: "paragraph",
        text: "Keep steps consistent so the product develops a clear tempo. Proper spacing between animated elements enhances rhythm and visual harmony. Animation plus delay equals waiting, so use delays only to sequence meaning, for example, a short stagger that communicates grouping.",
      },
      {
        type: "paragraph",
        text: "If two things do not depend on each other, animate them together. The best rhythm feels like life, frictionless, not theatrical.",
      },
      {
        type: "heading",
        level: 2,
        text: "Spatial Continuity",
      },
      {
        type: "paragraph",
        text: "Motion explains where things live in space. The flow of movement guides the viewer's attention to the image, helping to create a seamless and engaging experience. When a card expands into a detail screen, continuity maps the small element to a larger canvas, emphasizing the importance of the position of elements during transitions.",
      },
      {
        type: "paragraph",
        text: "The scene provides the context for introducing and managing animated elements, ensuring that each motion object is organized within the visual narrative. You are not switching screens. You are transforming one state into another, where the form of an element changes to communicate meaning.",
      },
      {
        type: "paragraph",
        text: "Favor arcs over straight lines. Curved paths align with how eyes track. Start where the user acted and end where new information appears. Crop and mask with intent, using a well-chosen image to establish visual hierarchy and support storytelling within motion design, while enhancing spatial continuity. Images can be animated or manipulated within motion graphics to create dynamic infographics, transitions, or overlays, further increasing user engagement and visual storytelling.",
      },
    ],
  },
]

export function getBlogSeedPost(slug: string): BlogPost | undefined {
  return blogSeedData.find((post) => post.slug === slug)
}
