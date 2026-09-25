import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import BlogTitleGenerator from "@/components/tools/BlogTitleGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Title Generator, 100% Free, No Login",
  description:
    "Enter a topic and get 10 SEO-friendly title ideas. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/blog-title-generator" },
  openGraph: {
    title: "AI Blog Title Generator, 100% Free, No Login",
    description:
      "Enter a topic and get 10 SEO-friendly title ideas. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/blog-title-generator",
  },
};

export default function Page() {
  const tool = getTool("blog-title-generator")!;
  return (
    <ToolShell tool={tool}>
      <BlogTitleGenerator />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What makes a blog title rank on Google</p>
          <p>The best ranking titles match exactly what people type into search. Start with the primary keyword as close to the beginning as possible. Titles between 50 and 60 characters display fully in search results without being cut off. Numbers in titles (like "7 ways" or "5 reasons") consistently outperform vague titles because they set a clear expectation.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Different title angles and when to use them</p>
          <p>Question titles ("Why does X happen?") work well for topics people search when confused. Listicles ("10 ways to...") attract readers who want a quick overview. How-to titles signal practical value and rank well for instructional searches. Comparison titles ("X vs Y") capture people in a decision-making phase. This tool generates all of these angles so you can pick the one that fits your content best.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How to pick the best title from the options</p>
          <p>Copy the most promising option into Google and see what already ranks for that exact phrase. If the top results are from large authority sites, a slightly different angle may be easier to compete with. If the results look thin or outdated, that is a good signal that a well-written post on that title has a real chance of ranking.</p>
        </div>
      </div>
    </ToolShell>
  );
}
