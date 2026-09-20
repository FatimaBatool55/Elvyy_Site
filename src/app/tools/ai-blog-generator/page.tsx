import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AiBlogGenerator from "@/components/tools/AiBlogGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Generator, 100% Free, No Login",
  description:
    "Pick a topic, choose an outline, get a full blog draft. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("ai-blog-generator")!;
  return (
    <ToolShell tool={tool}>
      <AiBlogGenerator />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How to get the best results from this tool</p>
          <p>The more specific your topic, the better the output. "Budgeting for college students living alone" produces a more focused draft than "budgeting tips". After generating, always read through the full draft and edit sentences that feel generic, add any specific examples you know from experience, and verify any facts before publishing.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Why reviewing AI content before publishing matters</p>
          <p>AI models generate fluent text but occasionally get specific facts wrong, especially statistics, dates, or named sources. They also tend toward generic phrasing that sounds competent but lacks the specific detail that makes content genuinely useful. A quick edit pass to add real examples and remove filler phrases makes a significant difference to both quality and search performance.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Choosing between the two outline options</p>
          <p>The tool generates two outlines that approach the same topic differently, usually one more practical and one more exploratory. Pick the one that matches the search intent of your target reader. Someone searching "how to study for finals" wants practical steps, not a conceptual discussion of learning theory.</p>
        </div>
      </div>
    </ToolShell>
  );
}
