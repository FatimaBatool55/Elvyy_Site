import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AiBlogGenerator from "@/components/tools/AiBlogGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Generator — 100% Free, No Login",
  description:
    "Free AI blog generator, 100% free with no login and no usage limit. Pick your topic and word count, choose an outline, and get a full blog draft.",
};

export default function Page() {
  const tool = getTool("ai-blog-generator")!;
  return (
    <ToolShell tool={tool}>
      <AiBlogGenerator />
    </ToolShell>
  );
}
