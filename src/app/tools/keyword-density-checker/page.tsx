import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import KeywordDensityChecker from "@/components/tools/KeywordDensityChecker";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Keyword Density Checker, 100% Free, No Login",
  description:
    "Paste content to see keyword frequency and catch overstuffing. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/keyword-density-checker" },
  openGraph: {
    title: "Keyword Density Checker, 100% Free, No Login",
    description:
      "Paste content to see keyword frequency and catch overstuffing. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/keyword-density-checker",
  },
};

export default function Page() {
  const tool = getTool("keyword-density-checker")!;
  return (
    <ToolShell tool={tool}>
      <KeywordDensityChecker />
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is keyword density and why it matters</h2>
          <p className="mt-2">Keyword density is the percentage of times a word or phrase appears relative to the total word count. Search engines use it as one signal to understand what a page is about. Too low and the topic may not be clear enough to rank well. Too high and the content reads as spam, which can actively suppress rankings rather than improve them. The sweet spot is natural, topic-focused writing that repeats important phrases in proportion to the article's length.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">What counts as a healthy range</h2>
          <p className="mt-2">A commonly cited safe range is 1 to 2.5 percent for the primary keyword. This tool adjusts that threshold slightly based on total word count, since a 300-word piece naturally repeats words more often than a 1500-word article without it looking unnatural. The color coding shows which words fall within a healthy range and which ones are approaching or past the point where they look like keyword stuffing to a search engine.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Why phrase-level density matters more than single words</h2>
          <p className="mt-2">Modern search algorithms pay more attention to multi-word phrases than to individual words in isolation. Writing "study tips" repeatedly is more likely to trigger an over-optimization flag than repeating the word "study" alone. This tool shows single words, two-word phrases, and three-word phrases separately so you can catch phrase-level stuffing that a simple word counter would miss entirely.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How to fix overstuffed keywords</h2>
          <p className="mt-2">Replace some instances with synonyms or semantically related phrases. If "study tips" is overstuffed, some occurrences can become "study habits", "exam preparation strategies", or "academic advice". Search engines understand topic relationships between these phrases, so the page still signals the same subject matter without the repetition that looks unnatural to both algorithms and readers.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">The overall balance score explained</h2>
          <p className="mt-2">The balance score summarizes keyword health across the entire piece in a single number out of 100. It factors in the number of overstuffed words, the number of words approaching the threshold, and vocabulary richness relative to the article length. A score above 80 indicates well-balanced content. Below 55 suggests meaningful revision is needed before publishing.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "Should I check density before or after writing?", a: "After writing. Write naturally first, then paste the content here. Checking density while writing interrupts your flow and often leads to forced phrasing that reads worse than organic repetition would have." },
              { q: "Do stopwords like 'the' and 'and' count toward density?", a: "This tool filters out common stopwords from the single-word analysis so they do not inflate or distort your results. The density percentages shown reflect only meaningful content words." },
              { q: "What if my primary keyword does not appear in the top results?", a: "It means the keyword appears fewer times than other words relative to the total count. Consider whether you are using the keyword naturally throughout the piece or whether it is being diluted by a large amount of off-topic content." },
              { q: "Is keyword density still a ranking factor in 2026?", a: "Directly, less so than it was a decade ago. Google's algorithms now understand topic relevance more holistically. However, extreme over-optimization is still penalized, and extreme under-use still signals weak topical focus. Checking density remains a useful quality control step before publishing." },
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
