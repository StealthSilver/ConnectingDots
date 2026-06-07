import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error("Missing MONGODB_URI. Set it in .env.local before seeding.")
  process.exit(1)
}

const blogSeedData = [
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
  },
]

const client = new MongoClient(uri)

try {
  await client.connect()
  const collection = client.db("connectingdots").collection("blogs")

  for (const post of blogSeedData) {
    await collection.updateOne(
      { slug: post.slug },
      {
        $set: {
          ...post,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true },
    )
  }

  const count = await collection.countDocuments()
  console.log(`Seeded blogs collection. Total documents: ${count}`)
} catch (error) {
  console.error("Failed to seed blogs:", error)
  process.exit(1)
} finally {
  await client.close()
}
