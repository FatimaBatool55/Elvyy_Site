import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import KeywordDensityChecker from "@/components/tools/KeywordDensityChecker";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Keyword Density Checker — 100% Free, No Login",
  description:
    "Free keyword density checker, 100% free with no login and no usage limit. Paste your content to see keyword frequency and catch keyword stuffing.",
};

export default function Page() {
  const tool = getTool("keyword-density-checker")!;
  return (
    <ToolShell tool={tool}>
      <KeywordDensityChecker />
    </ToolShell>
  );
}
