import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import MetaDescriptionGenerator from "@/components/tools/MetaDescriptionGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Meta Description Generator, 100% Free, No Login",
  description:
    "Paste your blog content to get 4 SEO-optimized meta description options. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/meta-description-generator" },
  openGraph: {
    title: "AI Meta Description Generator, 100% Free, No Login",
    description:
      "Paste your blog content to get 4 SEO-optimized meta description options. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/meta-description-generator",
  },
};

export default function Page() {
  const tool = getTool("meta-description-generator")!;
  return (
    <ToolShell tool={tool}>
      <MetaDescriptionGenerator />
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What makes a meta description effective</h2>
          <p className="mt-2">A good meta description does two things: it accurately summarizes the page and gives a reason to click. The ideal length is 140 to 160 characters. Shorter than that and you are leaving display space unused. Longer and Google will cut it off mid-sentence in search results. Including the primary keyword naturally near the start also helps because Google bolds matching words in the snippet, making your result stand out visually.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Does meta description affect Google rankings</h2>
          <p className="mt-2">Not directly. Google has confirmed that meta descriptions are not a ranking factor. However, they significantly affect click-through rate, which is the percentage of people who see your result and actually click it. A higher click-through rate is a positive engagement signal that can support rankings indirectly over time. A well-written description at position four can outperform a weak one at position two.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">When Google ignores your meta description</h2>
          <p className="mt-2">Google often rewrites meta descriptions when it thinks a different snippet better matches the specific search query. This is common when a page ranks for many different keywords. Writing a strong description that covers a range of related intents maximizes how often Google uses yours instead of writing its own. AI-generated options tend to cover broader intent naturally, which increases the chance Google keeps the description you set.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How to choose between the four generated options</h2>
          <p className="mt-2">Each option approaches the same content from a slightly different angle. One may emphasize what the reader will learn, another may emphasize a specific outcome, and another may open with a question. Pick the one that best matches the reason your target reader searched in the first place. If they are looking for a quick answer, lead with the answer. If they are evaluating options, lead with what makes your content different.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "How long should a meta description be?", a: "Between 140 and 160 characters for desktop search results. Mobile results truncate slightly earlier. Every generated option in this tool stays within that range automatically." },
              { q: "Should I use the same meta description for multiple pages?", a: "No. Duplicate meta descriptions across pages are a missed opportunity and can confuse search engines about which page is most relevant for a given query. Each page should have a unique description that reflects its specific content." },
              { q: "Can I use a meta description with special characters?", a: "Avoid quotation marks inside your meta description because some CMS platforms interpret them as code. Em dashes, numbers, and most punctuation are safe. Emoji sometimes display correctly but are inconsistent across devices and search result layouts." },
              { q: "Does the order of keywords in the description matter?", a: "Placing the primary keyword closer to the beginning is slightly better because Google bolds matching terms in results and readers scan from left to right. However, natural phrasing that reads well is more important than keyword placement." },
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
