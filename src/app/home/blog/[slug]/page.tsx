import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogArticle } from "@/app/blogs/blog-article"
import { AppPageShell } from "@/app/components/app-layout/app-page-shell"
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blogs"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Blog — Connecting Dots",
    }
  }

  return {
    title: `${post.title} — Connecting Dots`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  return (
    <AppPageShell title="Blog" showSearch={false}>
      <BlogArticle post={post} />
    </AppPageShell>
  )
}
