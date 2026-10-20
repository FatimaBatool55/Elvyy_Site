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
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">How effort scores work</h2>
          <p className="mt-2">You can use any consistent scale, with hours being the most intuitive. If writing an introduction takes 3 hours and building the slide deck takes 6, enter those numbers directly. The tool does not care about the unit, only the relative weights, so a scale of 1 to 10 works equally well as long as the team agrees on the scoring before the split runs. The only conversation you need is about relative effort, not about who does what.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Why automated splitting is fairer than manual assignment</h2>
          <p className="mt-2">When people assign tasks themselves in a group, the same volunteers tend to take on more while others take less without anyone tracking the running total. An algorithm assigns the heaviest remaining task to whoever currently has the lightest load, which produces the most balanced distribution possible given the task sizes. No one can claim the split was unfair because the process is visible and objective.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">What to do when the split is flagged as uneven</h2>
          <p className="mt-2">Perfect balance is only possible when task sizes divide evenly across members. When the tool flags imbalance, the practical fix is to break the largest task into two smaller subtasks and run the split again. Even splitting one task in half usually brings the distribution within an acceptable range. The imbalance flag appears when the heaviest load is more than 25 percent above the lightest, which is a meaningful gap worth addressing before work begins.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Using this tool at the start of a project meeting</h2>
          <p className="mt-2">The most effective way to use this tool is to prepare the task list before the group meeting starts. List every deliverable you can think of, estimate the effort for each, add the group members, and arrive at the meeting with a proposed split already generated. The conversation then becomes about adjusting specific assignments rather than arguing from scratch about who should do what.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Handling group members with different availability</h2>
          <p className="mt-2">If one member has significantly less time available than others due to other commitments, reduce their portion of the split by assigning them only lower-effort tasks before running the algorithm. Remove them temporarily, assign their tasks manually, then add the remaining tasks and members to the tool. This gives you a fair split that accounts for real-world constraints rather than treating everyone as equally available.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "What if the group disagrees on effort scores?", a: "Have each member score each task independently, then average the scores. This prevents any one person from inflating or deflating estimates to influence who gets what. The averaging step takes two minutes and removes most disagreements before they start." },
              { q: "Can I use this for more than one group at the same time?", a: "Open the tool in separate browser tabs for separate groups. Each instance is independent and resets when you close the tab, so there is no data mixing between sessions." },
              { q: "Does the tool save the task split after I close the page?", a: "No. The split is calculated in your browser and not stored anywhere. Copy the results or take a screenshot before closing if you need to refer to them later." },
              { q: "What if a group member drops out mid-project?", a: "Remove that member, reassign their tasks by re-running the split with the remaining members. The algorithm will redistribute the orphaned tasks to whoever has the lightest remaining load." },
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
