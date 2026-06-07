import type { BlogDocument, BlogPost } from "@/lib/blog-types"
import { getBlogSeedPost } from "@/lib/blog-seed-data"
import clientPromise, { BLOGS_COLLECTION, MONGODB_DB_NAME } from "@/lib/mongodb"

function mergeWithSeed(doc: BlogDocument): BlogPost {
  const seed = getBlogSeedPost(doc.slug)

  return {
    slug: doc.slug,
    title: doc.title,
    subheading: doc.subheading ?? seed?.subheading ?? doc.excerpt,
    excerpt: doc.excerpt,
    date: doc.date,
    readingTime: doc.readingTime,
    tags: doc.tags,
    content:
      doc.content?.length ? doc.content : (seed?.content ?? []),
  }
}

function toBlogPost(doc: BlogDocument): BlogPost {
  return mergeWithSeed(doc)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const client = await clientPromise
  const collection = client.db(MONGODB_DB_NAME).collection<BlogDocument>(BLOGS_COLLECTION)

  const docs = await collection
    .find({})
    .sort({ createdAt: -1, date: -1 })
    .toArray()

  return docs.map(toBlogPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = await clientPromise
  const collection = client.db(MONGODB_DB_NAME).collection<BlogDocument>(BLOGS_COLLECTION)
  const doc = await collection.findOne({ slug })

  if (doc) return toBlogPost(doc)

  const seed = getBlogSeedPost(slug)
  return seed ?? null
}

export async function getBlogSlugs(): Promise<string[]> {
  try {
    const posts = await getBlogPosts()
    if (posts.length > 0) return posts.map((post) => post.slug)
  } catch {
    // Fall back to seed data when the database is unavailable.
  }

  const { blogSeedData } = await import("@/lib/blog-seed-data")
  return blogSeedData.map((post) => post.slug)
}
