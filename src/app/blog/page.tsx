import Link from "next/link";
import type { Metadata } from "next";
import { posts as staticPosts } from "@/lib/posts";
import { getSanityPosts } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/lib/client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on money, health, and everyday life from Elvyy.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const sanityPosts = await getSanityPosts();

  const posts = isSanityConfigured
    ? sanityPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
        date: p.publishedAt,
        readTime: "",
      }))
    : staticPosts;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        Blog
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">
        Writing worth your time
      </h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Short, practical articles. No filler, no fifteen paragraph intros
        before the point.
      </p>

      <div className="mt-10 divide-y divide-line border-t border-line">
        {posts.length === 0 && (
          <p className="py-8 text-sm text-ink-soft">
            No articles yet. Check back soon.
          </p>
        )}
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-8 first:pt-0"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-sage-deep">
              {post.category}
              {post.readTime ? ` . ${post.readTime}` : ""}
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-sage-deep">
              {post.title}
            </h2>
            <p className="mt-2 max-w-2xl text-ink-soft">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
