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
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What makes a blog title rank on Google</h2>
          <p className="mt-2">The best ranking titles match exactly what people type into search. Start with the primary keyword as close to the beginning of the title as possible. Titles between 50 and 60 characters display fully in search results without being cut off. Numbers in titles consistently outperform vague ones because they set a specific expectation about what the reader will get. Question titles perform well for informational searches because they mirror the query directly.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Different title angles and when to use them</h2>
          <p className="mt-2">Question titles work well for topics people search when confused or curious. Listicle titles attract readers who want a quick overview without deep commitment. How-to titles signal practical value and rank well for instructional searches where the reader wants steps. Comparison titles capture people in a decision-making phase who are weighing options. This tool generates all of these angles so you can pick the one that fits your content and your target reader's intent.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How to pick the best title from the ten options</h2>
          <p className="mt-2">Copy each promising option into Google search and look at what already ranks for that phrase. If the first page is dominated by high-authority publications, a slightly different angle may be easier to compete with for a newer site. If the results look thin, outdated, or poorly matched to the query, that is a signal that a well-written post with that title has a genuine chance of ranking. This research step takes two minutes per title and significantly improves your odds.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Title length and character limits</h2>
          <p className="mt-2">Google displays approximately 50 to 60 characters of a title tag in desktop search results before truncating. On mobile the cutoff is slightly shorter. A title that gets cut off loses the end of its message and often looks unprofessional in results. Generate your titles here, then check the character count of your preferred option before publishing. If it exceeds 60 characters, trim rather than compromise the keyword placement at the beginning.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "Should the title match the H1 heading on the page exactly?", a: "They do not need to match exactly, but they should be closely aligned. The title tag is what appears in search results. The H1 is what appears on the page. Small differences are fine, but large differences can confuse both readers and search engines about what the page is actually about." },
              { q: "Can I use the same title for multiple blog posts?", a: "No. Duplicate titles are a technical SEO issue and send conflicting signals to search engines about which page to rank. Every page should have a unique title that reflects its specific content." },
              { q: "How specific should my topic input be?", a: "The more specific, the better the output. Entering 'how to study for finals with ADHD' produces more targeted titles than entering 'study tips'. Specific inputs generate titles that target narrower, lower-competition queries where a newer site is more likely to rank." },
              { q: "Does the generated title affect my meta description?", a: "They are separate fields but should be consistent. Your meta description should expand on the promise made in the title. If the title says 'seven ways to improve sleep', the description should hint at what a few of those ways are rather than restating the title." },
            ].map((f) => (
              <div key={f.q}>
                <h3 className="font-display text-lg text-ink">{f.q}</h3>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ToolShell>
  );
}
