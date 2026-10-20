import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ReadabilityChecker from "@/components/tools/ReadabilityChecker";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Readability Score Checker, 100% Free, No Login",
  description:
    "Get grade level, sentence length, passive voice, and grammar check. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/readability-checker" },
  openGraph: {
    title: "Readability Score Checker, 100% Free, No Login",
    description:
      "Get grade level, sentence length, passive voice, and grammar check. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/readability-checker",
  },
};

export default function Page() {
  const tool = getTool("readability-checker")!;
  return (
    <ToolShell tool={tool}>
      <ReadabilityChecker />
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What the Flesch reading ease score means</h2>
          <p className="mt-2">The Flesch score runs from 0 to 100. A score above 60 is considered plain English that most adults can read comfortably. Scores above 70 are easy enough for a general audience without feeling oversimplified. Below 50 starts to feel academic or technical. Most successful blog content lands between 60 and 75, which is readable without being dumbed down. Legal documents and academic papers typically score below 30.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How to lower your grade level score</h2>
          <p className="mt-2">Two changes make the biggest difference. First, split sentences over 25 words into two shorter ones. Second, replace multi-syllable words with shorter alternatives where the meaning stays the same. Utilise becomes use, demonstrate becomes show, approximately becomes about. These small swaps compound quickly across an article and can drop the grade level by three or four points without changing the substance of what you are saying.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">When passive voice is and is not a problem</h2>
          <p className="mt-2">Passive voice is not inherently wrong. It becomes a problem when overused. Above 20 percent passive sentences tends to make writing feel distant and harder to follow. Scientific writing naturally uses more passive voice because it emphasizes the experiment over the experimenter. But blog content, marketing copy, and general articles read better when most sentences have a clear subject doing something directly. This tool shows your passive voice percentage so you can decide whether it warrants revision.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How the grammar checker works</h2>
          <p className="mt-2">The grammar check button sends your text to the LanguageTool service, which checks for spelling errors, grammar mistakes, punctuation issues, and style problems. Results show the specific sentence where each issue appears along with suggested corrections. The check is free and your text is not stored after the results are returned. Typography-only flags such as consecutive spaces are filtered out so you only see issues worth acting on.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Using readability as a pre-publish checklist step</h2>
          <p className="mt-2">Paste your draft, check the Flesch score and grade level, identify any sentences flagged as too long, check your passive voice percentage, then run the grammar check. This sequence takes about two minutes and catches most of the issues that make content feel unpolished. It is most useful after a first draft when the ideas are in place but the language has not yet been refined.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "Does a higher Flesch score always mean better content?", a: "Not always. The right score depends on your audience. Content for children or general consumers should score above 70. Technical content for experts can score below 50 without being a problem. The goal is matching the score to your reader, not maximizing it." },
              { q: "How accurate is the passive voice detection?", a: "The tool detects passive constructions using common auxiliary verb patterns and a list of irregular past participles. It catches the majority of passive sentences but may miss unusual constructions or count some edge cases incorrectly. Use the percentage as a directional guide rather than a precise measurement." },
              { q: "What is the word limit for the grammar check?", a: "The tool checks up to 15,000 characters per submission, which covers most blog posts and articles. For longer documents, split the content into sections and check each one separately." },
              { q: "Why does the grade level sometimes seem higher than expected?", a: "Grade level is calculated from average sentence length and average syllables per word. If your writing includes many technical terms or proper nouns with multiple syllables, the grade level will read higher even if the prose itself is straightforward. Focus on the Flesch score as the more reliable indicator for general audiences." },
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
