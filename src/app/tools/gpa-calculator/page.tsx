import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import GpaCalculator from "@/components/tools/GpaCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description:
    "Free GPA calculator with a custom grade scale and a planner for the GPA needed in future courses.",
};

export default function Page() {
  const tool = getTool("gpa-calculator")!;
  return (
    <ToolShell tool={tool}>
      <GpaCalculator />
      <div className="mt-10 rounded-lg border border-line bg-paper-dim p-5">
        <p className="text-sm text-ink-soft">
          Want to raise your GPA, not just track it?{" "}
          <Link
            href="/blog/study-habits-that-raise-college-gpa"
            className="text-sage-deep hover:underline"
          >
            Read: Study habits that raise college GPA →
          </Link>
        </p>
      </div>
    </ToolShell>
  );
}
