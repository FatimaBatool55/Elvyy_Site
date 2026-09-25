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
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How to estimate study hours accurately</p>
          <p>Most students underestimate how long tasks take. A rough guide: reading 20 pages takes about 1 hour, writing 500 words takes 1 to 2 hours, reviewing a topic for the first time takes twice as long as reviewing something familiar. Add a 20 percent buffer to whatever you estimate, and the schedule will be more realistic.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Why spreading study sessions works better than cramming</p>
          <p>Research on memory consistently shows that spaced repetition beats massed practice. Studying 2 hours a day for 5 days produces better retention than 10 hours the night before. This tool builds that spacing in automatically by distributing your estimated hours across available days before each deadline.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What to do when the schedule shows overload</p>
          <p>If the tool warns that there is not enough time, you have three realistic options: increase your daily study hours, ask for a deadline extension early before it becomes urgent, or reduce the scope of what you plan to cover and focus on the highest-weight topics first.</p>
        </div>
      </div>
    </ToolShell>
  );
}
