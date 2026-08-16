import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import WordCounter from "@/components/tools/WordCounter";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Word Counter",
  description: "Free word counter and character counter with live reading time estimate.",
};

export default function Page() {
  const tool = getTool("word-counter")!;
  return (
    <ToolShell tool={tool}>
      <WordCounter />
    </ToolShell>
  );
}
