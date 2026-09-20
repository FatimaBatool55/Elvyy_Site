import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import MetaDescriptionGenerator from "@/components/tools/MetaDescriptionGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Meta Description Generator, 100% Free, No Login",
  description:
    "Paste your blog content to get 4 SEO-optimized meta description options. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("meta-description-generator")!;
  return (
    <ToolShell tool={tool}>
      <MetaDescriptionGenerator />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What makes a meta description effective</p>
          <p>A good meta description does two things: it accurately summarizes the page and gives a reason to click. The ideal length is 140 to 160 characters. Shorter than that and you are leaving space unused. Longer and Google will cut it off mid-sentence in search results. Including the primary keyword naturally near the start also helps, since Google bolds matching words in the snippet.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Does meta description affect Google rankings</p>
          <p>Not directly. Google has confirmed that meta descriptions are not a ranking factor. However, they significantly affect click-through rate, which is the percentage of people who see your result and actually click it. A higher click-through rate sends a positive signal to Google over time, which indirectly supports rankings.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">When Google ignores your meta description</p>
          <p>Google often rewrites meta descriptions when it thinks a different snippet better matches the search query. This is common when the same page ranks for many different keywords. Writing a strong description still matters because Google uses it as a starting point and keeps it when it fits the query well.</p>
        </div>
      </div>
    </ToolShell>
  );
}
