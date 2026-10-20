import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import StudyPlanSpreader from "@/components/tools/StudyPlanSpreader";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Study Plan Spreader, 100% Free, No Login",
  description:
    "Add deadlines and hours to get a day-by-day study schedule. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/study-plan-spreader" },
  openGraph: {
    title: "Study Plan Spreader, 100% Free, No Login",
    description:
      "Add deadlines and hours to get a day-by-day study schedule. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/study-plan-spreader",
  },
};
export default function Page() {
  const tool = getTool("study-plan-spreader")!;
  return (
    <ToolShell tool={tool}>
      <StudyPlanSpreader />
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">How to estimate study hours accurately</h2>
          <p className="mt-2">Most students underestimate how long tasks take. A rough guide: reading 20 pages takes about 1 hour, writing 500 words takes 1 to 2 hours, reviewing a topic for the first time takes twice as long as reviewing something already familiar. Add a 20 percent buffer to whatever you estimate and the schedule will be far more realistic. Underestimating is the single biggest reason students end up cramming despite having planned ahead.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Why spreading study sessions works better than cramming</h2>
          <p className="mt-2">Research on memory consistently shows that spaced repetition outperforms massed practice. Studying 2 hours a day for 5 days produces better retention than 10 hours the night before, even when the total time is identical. This tool builds spacing in automatically by distributing your estimated hours across available days before each deadline, so you get the memory benefit without having to manually plan every day.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">What to do when the schedule shows overload</h2>
          <p className="mt-2">If the tool warns that there is not enough time at your current daily capacity, you have three realistic options. You can increase your daily study hours for that period. You can ask for a deadline extension early, before it becomes urgent enough to embarrass you. Or you can reduce scope by identifying the highest-weight topics and focusing only on those. The warning is useful precisely because it gives you time to act on one of these options.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How to handle multiple overlapping deadlines</h2>
          <p className="mt-2">Add every assignment, project, and exam into the tool at once. The algorithm automatically prioritizes work that is due sooner and carries more estimated hours. Tasks with later deadlines get scheduled in the remaining daily capacity after urgent ones are served. This prevents the common mistake of spending all your time on one deadline while ignoring another one that is quietly approaching.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Building the plan at the start of a semester</h2>
          <p className="mt-2">The most effective use of this tool is to run it on day one of a new semester or unit with all known deadlines and their estimated hours. Update it when assignments are added or when your estimates change. A plan built early and adjusted regularly outperforms any last-minute schedule, even if the early plan is imperfect.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "What if I do not know the exact deadline yet?", a: "Enter your best estimate for now. You can adjust the deadline later and the tool will immediately recalculate the entire schedule. It is better to plan with an approximate date than to wait until the exact date is confirmed." },
              { q: "How should I enter exams compared to assignments?", a: "For exams, enter the total revision hours you think you need, not the exam duration itself. For assignments, enter the writing and research time. Both are treated the same way by the scheduling algorithm." },
              { q: "What does the tool do if two tasks share the same deadline?", a: "It distributes available hours proportionally based on the remaining workload for each task. Tasks with more hours remaining get a slightly larger share of each day until the deadline." },
              { q: "Can I use this for non-academic tasks like work projects?", a: "Yes. The tool works for any tasks with a deadline and a time estimate. Enter your project name, when it is due, and how many hours you think it will take. The scheduling logic is the same." },
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
