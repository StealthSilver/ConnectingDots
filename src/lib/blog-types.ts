export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
}

export type BlogDocument = BlogPost & {
  _id?: unknown
  createdAt?: Date
  updatedAt?: Date
}
