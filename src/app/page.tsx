import Link from "next/link";
import { tools } from "@/lib/tools";
import { posts as staticPosts } from "@/lib/posts";
import { getSanityPosts } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/lib/client";
import ToolFinder from "@/components/ToolFinder";

export const revalidate = 60;

export default async function Home() {
  const sanityPosts = await getSanityPosts();

  const latestPosts = isSanityConfigured
    ? sanityPosts.slice(0, 3).map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
      }))
    : staticPosts.slice(0, 3).map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category,
      }));

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-sage-deep">
            No signups. No paywalls. No limits.
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-balance text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Tools that stay free.
            <br />
            Writing worth your time.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            Elvyy is a small, growing corner of the internet, practical
            tools you can use as much as you like, and articles on money,
            health, and everyday life, written to be genuinely useful.
          </p>

          <div className="mt-10">
            <ToolFinder />
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Tools
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Free, forever, unlimited
            </h2>
          </div>
          <Link
            href="/tools"
            className="hidden font-mono text-sm text-sage-deep hover:underline sm:block"
          >
            View all tools →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-lg border border-line bg-card p-6 transition-colors hover:border-sage"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-sage-deep">
                {tool.category}
              </p>
              <h3 className="mt-2 font-display text-xl text-ink">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{tool.short}</p>
              <span className="mt-4 inline-block text-sm text-ink-soft transition-colors group-hover:text-sage-deep">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/tools"
          className="mt-6 block font-mono text-sm text-sage-deep hover:underline sm:hidden"
        >
          View all tools →
        </Link>
      </section>

      {/* Blog preview */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                Reading
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink">
                From the blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden font-mono text-sm text-sage-deep hover:underline sm:block"
            >
              View all articles →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-lg border border-line bg-card p-6 transition-colors hover:border-sage"
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-sage-deep">
                  {post.category}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-ink-soft">
                  {post.excerpt}
                </p>
                <p className="mt-5 font-mono text-xs text-ink-soft">
                  Read article →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
