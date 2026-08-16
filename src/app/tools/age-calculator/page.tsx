import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AgeCalculator from "@/components/tools/AgeCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Age Calculator",
  description: "Free age calculator, find your exact age in years, months, and days.",
};

export default function Page() {
  const tool = getTool("age-calculator")!;
  return (
    <ToolShell tool={tool}>
      <AgeCalculator />
    </ToolShell>
  );
}
