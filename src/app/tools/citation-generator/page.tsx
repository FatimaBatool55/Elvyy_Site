import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import CitationGenerator from "@/components/tools/CitationGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Citation Generator",
  description:
    "Free citation generator supporting APA, MLA, Harvard, Chicago, and IEEE styles for websites, books, journal articles, videos, and news.",
};

export default function Page() {
  const tool = getTool("citation-generator")!;
  return (
    <ToolShell tool={tool}>
      <CitationGenerator />
    </ToolShell>
  );
}
