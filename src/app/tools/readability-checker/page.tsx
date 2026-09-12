import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ReadabilityChecker from "@/components/tools/ReadabilityChecker";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Readability Score Checker — 100% Free, No Login",
  description:
    "Free readability checker, 100% free with no login and no usage limit. Get grade level, sentence length, passive voice percentage, and complex sentences highlighted.";
};

export default function Page() {
  const tool = getTool("readability-checker")!;
  return (
    <ToolShell tool={tool}>
      <ReadabilityChecker />
    </ToolShell>
  );
}
