import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import CitationGenerator from "@/components/tools/CitationGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Citation Generator — 100% Free, No Login",
  description:
    "Free citation generator, 100% free with no login and no usage limit. Create APA, MLA, Harvard, Chicago, and IEEE citations for websites, books, journals, videos, and news.",
};

export default function Page() {
  const tool = getTool("citation-generator")!;
  return (
    <ToolShell tool={tool}>
      <CitationGenerator />
    </ToolShell>
  );
}
