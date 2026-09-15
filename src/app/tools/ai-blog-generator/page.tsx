import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AiBlogGenerator from "@/components/tools/AiBlogGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Generator, 100% Free, No Login",
  description:
    "Pick a topic, choose an outline, get a full blog draft. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("ai-blog-generator")!;
  return (
    <ToolShell tool={tool}>
      <AiBlogGenerator />
    </ToolShell>
  );
}
