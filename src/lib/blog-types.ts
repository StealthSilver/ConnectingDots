export type BlogContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  /** Short deck line shown under the title on the article page. */
  subheading: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
  content: BlogContentBlock[]
}

export type BlogDocument = Omit<BlogPost, "content"> & {
  content?: BlogContentBlock[]
  _id?: unknown
  createdAt?: Date
  updatedAt?: Date
}
