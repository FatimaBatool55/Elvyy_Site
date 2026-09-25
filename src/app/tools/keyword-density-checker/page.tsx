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
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What is keyword density and why it matters</p>
          <p>Keyword density is the percentage of times a word or phrase appears relative to the total word count. Search engines use it as one signal to understand what a page is about. Too low and the topic may not be clear enough. Too high and the content reads as spam, which can actively hurt rankings rather than help them.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What counts as a healthy range</p>
          <p>A commonly cited safe range is 1 to 2.5 percent for the primary keyword. This tool adjusts that threshold slightly based on total word count, since a 300-word piece naturally repeats words more often than a 1500-word article. The color coding shows which words fall within a healthy range and which ones are approaching or past the point where they look unnatural.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How to fix overstuffed keywords</p>
          <p>Replace some instances with synonyms or related phrases. For example, if "study tips" is overstuffed, some occurrences can become "study habits", "exam preparation strategies", or "academic advice". This keeps the topic clear for search engines while making the writing feel more natural for readers.</p>
        </div>
      </div>
    </ToolShell>
  );
}
