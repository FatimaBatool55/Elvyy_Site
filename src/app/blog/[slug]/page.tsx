import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { posts as staticPosts, getPost as getStaticPost } from "@/lib/posts";
import { getSanityPost, getSanityPosts } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

export async function generateStaticParams() {
  if (isSanityConfigured) {
    const posts = await getSanityPosts();
    return posts.map((p) => ({ slug: p.slug }));
  }
  return staticPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isSanityConfigured) {
    const post = await getSanityPost(slug);
    if (!post) return {};
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      robots: post.noIndex ? { index: false, follow: false } : undefined,
    };
  }

  const post = getStaticPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlForImage(value).width(800).url();
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={value.alt || ""}
          className="my-6 w-full rounded-lg border border-line"
        />
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isSanityConfigured) {
    const post = await getSanityPost(slug);
    if (!post) notFound();

    const coverSrc = post.coverImage?.asset
      ? urlForImage(post.coverImage).width(1200).height(630).url()
      : null;

    return (
      <article className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href="/blog"
          className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-sage-deep"
        >
          ← All articles
        </Link>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-sage-deep">
          {post.category}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight text-ink">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {coverSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverSrc}
            alt={post.coverImage?.alt || post.title}
            className="mt-8 w-full rounded-lg border border-line"
          />
        )}

        <div className="prose prose-neutral mt-10 max-w-none text-[17px] leading-relaxed text-ink [&_p]:mb-5 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3">
          <PortableText value={post.body as never} components={portableTextComponents} />
        </div>
      </article>
    );
  }

  const post = getStaticPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/blog"
        className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-sage-deep"
      >
        ← All articles
      </Link>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-sage-deep">
        {post.category}
        {post.readTime ? ` . ${post.readTime}` : ""}
      </p>
      <h1 className="mt-2 font-display text-4xl leading-tight text-ink">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-ink-soft">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
