import type { BlogDocument, BlogPost } from "@/lib/blog-types"
import clientPromise, { BLOGS_COLLECTION, MONGODB_DB_NAME } from "@/lib/mongodb"

function toBlogPost(doc: BlogDocument): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    readingTime: doc.readingTime,
    tags: doc.tags,
  }
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
  return doc ? toBlogPost(doc) : null
}
