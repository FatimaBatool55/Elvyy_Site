import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import StudyPlanSpreader from "@/components/tools/StudyPlanSpreader";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Study Plan Spreader — 100% Free, No Login",
  description:
    "Free study plan spreader, 100% free with no login and no usage limit. Enter your assignments and deadlines to get a realistic day-by-day study schedule.",
};

export default function Page() {
  const tool = getTool("study-plan-spreader")!;
  return (
    <ToolShell tool={tool}>
      <StudyPlanSpreader />
    </ToolShell>
  );
}
