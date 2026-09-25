import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import TaskSplitter from "@/components/tools/TaskSplitter";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Group Project Task Splitter, 100% Free, No Login",
  description:
    "Balance tasks fairly across group members and flag uneven loads. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/task-splitter" },
  openGraph: {
    title: "Group Project Task Splitter, 100% Free, No Login",
    description:
      "Balance tasks fairly across group members and flag uneven loads. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/task-splitter",
  },
};

export default function Page() {
  const tool = getTool("task-splitter")!;
  return (
    <ToolShell tool={tool}>
      <TaskSplitter />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How effort scores work</p>
          <p>You can use any consistent scale, hours being the most intuitive. If writing an introduction takes 3 hours and building the slide deck takes 6, enter those numbers directly. The tool does not care about the unit, only the relative weights, so a scale of 1 to 10 works equally well as long as the team agrees on it before scoring.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Why automated splitting is fairer than manual assignment</p>
          <p>When people assign tasks themselves in a group, the same volunteers tend to take on more while others take less without anyone tracking the total. An algorithm assigns the heaviest remaining task to whoever currently has the lightest load, which produces the most balanced split possible given the task sizes.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What to do when the split is flagged as uneven</p>
          <p>Perfect balance is only possible when task sizes divide evenly across members. When the tool flags imbalance, the practical fix is to break the largest tasks into two smaller ones and run the split again. Even splitting one task in half usually brings the distribution within an acceptable range.</p>
        </div>
      </div>
    </ToolShell>
  );
}
