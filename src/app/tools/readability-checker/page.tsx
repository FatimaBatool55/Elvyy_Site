import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ReadabilityChecker from "@/components/tools/ReadabilityChecker";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Readability Score Checker, 100% Free, No Login",
  description:
    "Get grade level, sentence length, passive voice, and grammar check. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("readability-checker")!;
  return (
    <ToolShell tool={tool}>
      <ReadabilityChecker />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What the Flesch reading ease score means</p>
          <p>The Flesch score runs from 0 to 100. A score above 60 is considered plain English that most adults can read comfortably. Scores above 70 are easy enough for a general audience. Below 50 starts to feel academic or technical. Most successful blog content lands between 60 and 75, which is readable without feeling dumbed down.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How to lower your grade level score</p>
          <p>Two changes make the biggest difference: shorter sentences and simpler words. Split any sentence over 25 words into two sentences. Replace multi-syllable words with shorter ones where possible. "Utilise" becomes "use", "demonstrate" becomes "show", "approximately" becomes "about". These small swaps add up quickly across an article.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">When passive voice is and is not a problem</p>
          <p>Passive voice is not inherently wrong, it becomes a problem when overused. Above 20 percent passive sentences tends to make writing feel distant and hard to follow. Scientific writing naturally uses more passive voice, but blog and general content reads better when most sentences have a clear subject doing something directly.</p>
        </div>
      </div>
    </ToolShell>
  );
}
