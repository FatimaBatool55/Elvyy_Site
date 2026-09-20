import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import GpaCalculator from "@/components/tools/GpaCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "GPA Calculator, 100% Free, No Login",
  description:
    "Calculate your GPA across courses and plan future grades. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("gpa-calculator")!;
  return (
    <ToolShell tool={tool}>
      <GpaCalculator />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What is GPA and how is it calculated</p>
          <p>GPA (Grade Point Average) is the standard way universities measure academic performance. Each letter grade carries a point value: A is 4.0, B is 3.0, C is 2.0, and so on. Your GPA is the weighted average of these points across all your courses, where credits act as the weight. A 3-credit course counts three times more than a 1-credit course.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">When to use this calculator</p>
          <p>Use it at the end of each semester to track your cumulative GPA, before registering for next semester to plan which courses will help or hurt your average, and when deciding whether to retake a course. The planning tab shows exactly what average you need in remaining courses to hit a target GPA.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Tips for improving your GPA</p>
          <p>Focus on courses with high credit hours first since they affect your GPA most. A B in a 4-credit course moves your GPA more than an A in a 1-credit elective. If your school allows grade replacement for retaken courses, use the settings to adjust the scale and see the exact impact before committing.</p>
        </div>
      </div>
    </ToolShell>
  );
}
