import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import FinalGradeCalculator from "@/components/tools/FinalGradeCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Final Grade Calculator",
  description:
    "Find the exact score you need on remaining work to hit your target grade. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("final-grade-calculator")!;
  return (
    <ToolShell tool={tool}>
      <FinalGradeCalculator />
    </ToolShell>
  );
}
