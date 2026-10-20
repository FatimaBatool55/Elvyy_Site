import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AiBlogGenerator from "@/components/tools/AiBlogGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Generator, 100% Free, No Login",
  description:
    "Pick a topic, choose an outline, get a full blog draft. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/ai-blog-generator" },
  openGraph: {
    title: "AI Blog Generator, 100% Free, No Login",
    description:
      "Pick a topic, choose an outline, get a full blog draft. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/ai-blog-generator",
  },
};

export default function Page() {
  const tool = getTool("ai-blog-generator")!;
  return (
    <ToolShell tool={tool}>
      <AiBlogGenerator />
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">How to get the best results from this tool</h2>
          <p className="mt-2">The more specific your topic, the better the draft. A topic like "budgeting for college students living alone in a city" produces a more focused and useful outline than "budgeting tips". After generating, always read through the full draft and edit sentences that feel generic, add specific examples you know from experience, and verify any facts or statistics before publishing. The draft is a starting point, not a finished product.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Why reviewing AI content before publishing matters</h2>
          <p className="mt-2">AI models generate fluent and plausible-sounding text, but they occasionally get specific facts wrong, especially statistics, dates, or named sources. They also tend toward generic phrasing that sounds competent but lacks the specific detail that makes content genuinely useful or memorable. A quick edit pass to add one real example, remove the filler introduction paragraph, and verify any numerical claims makes a significant difference to both quality and search performance.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Choosing between the two outline options</h2>
          <p className="mt-2">The tool generates two outlines that approach the same topic from different structural angles. One is usually more practical and step-based, the other more exploratory or concept-driven. Pick the one that matches the search intent of your target reader. Someone searching "how to study for finals" wants steps, not a conceptual discussion of learning theory. Someone searching "why spaced repetition works" wants the explanation, not a how-to guide.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Matching word count to content type</h2>
          <p className="mt-2">Longer is not always better. A focused 800-word post that fully answers a specific question often outperforms a bloated 2000-word post that pads the same answer with filler. Use the shorter word count ranges for posts targeting a single specific question. Use longer ranges for comprehensive guides covering a topic with multiple distinct angles. The outline you approve will shape how the draft fills the chosen word count, so pick the range that matches the scope of the topic.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "Can I use the generated content directly without editing?", a: "You can, but you should not. AI-generated content benefits significantly from a human edit pass that adds specific examples, corrects any factual errors, and removes generic filler phrases. Search engines also increasingly reward content that demonstrates genuine expertise and specificity, which editing provides." },
              { q: "How long does generation take?", a: "The outline step usually takes 5 to 15 seconds. The full blog generation takes 15 to 45 seconds depending on the selected word count and current server load. Longer posts take more time because the AI writes more text in a single pass." },
              { q: "Can I generate multiple drafts for the same topic?", a: "Yes. Each generation run produces a new draft. If the first draft does not feel right, go back to the outline step and either pick the other outline or re-generate both outlines for a fresh set of angles." },
              { q: "What if the AI gets a fact wrong in the draft?", a: "Verify any specific claims, statistics, or named sources before publishing. A factual error in a published article can damage reader trust and is harder to recover from than the extra few minutes spent checking. The disclaimer at the bottom of the tool is there as a reminder for exactly this reason." },
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
