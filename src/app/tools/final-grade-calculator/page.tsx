import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import FinalGradeCalculator from "@/components/tools/FinalGradeCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Final Grade Calculator, 100% Free, No Login",
  description:
    "Find the exact score you need on remaining work to hit your target grade. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/final-grade-calculator" },
  openGraph: {
    title: "Final Grade Calculator, 100% Free, No Login",
    description:
      "Find the exact score you need on remaining work to hit your target grade. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/final-grade-calculator",
  },
};

export default function Page() {
  const tool = getTool("final-grade-calculator")!;
  return (
    <ToolShell tool={tool}>
      <FinalGradeCalculator />
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">How this calculator works</p>
          <p>Enter each graded component (midterm, assignments, quizzes) with its weight percentage and your score. Then enter what is left in the course and its weight. The calculator tells you the minimum score you need on that remaining work to finish the course at your target grade.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Common use cases</p>
          <p>Students use this most often before finals to find out whether they need to study hard or whether they can relax. It is also useful mid-semester when checking if dropping a course is worth it, or when deciding how much effort to put into an assignment relative to its weight.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What to do if the required score is above 100</p>
          <p>If the calculator shows you need more than 100 percent on remaining work, your current target grade is out of reach. At that point the realistic move is to lower your target, speak with your professor about extra credit options, or check your school policy on grade replacement if you plan to retake the course.</p>
        </div>
      </div>
    </ToolShell>
  );
}
