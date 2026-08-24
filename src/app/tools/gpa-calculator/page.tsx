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
      <Link
        href="/blog/study-habits-that-raise-college-gpa"
        className="mt-10 flex items-center justify-between gap-4 rounded-lg border border-sage bg-card p-6 transition-colors hover:border-sage-deep"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-sage-deep">
            Related reading
          </p>
          <p className="mt-1 font-display text-xl text-ink">
            Study habits that raise college GPA
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Practical habits that make the biggest difference once your GPA
            is calculated.
          </p>
        </div>
        <span className="shrink-0 font-mono text-sm text-sage-deep">
          Read →
        </span>
      </Link>
    </ToolShell>
  );
}
