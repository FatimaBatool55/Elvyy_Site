import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import FinalGradeCalculator from "@/components/tools/FinalGradeCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Final Grade Calculator — 100% Free, No Login",
  description:
    "Free final grade calculator, 100% free with no login and no usage limit. Find the exact score you need on your remaining work to hit your target grade.",
};

export default function Page() {
  const tool = getTool("final-grade-calculator")!;
  return (
    <ToolShell tool={tool}>
      <FinalGradeCalculator />
    </ToolShell>
  );
}
