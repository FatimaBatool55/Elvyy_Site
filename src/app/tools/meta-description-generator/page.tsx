import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import MetaDescriptionGenerator from "@/components/tools/MetaDescriptionGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Meta Description Generator — 100% Free, No Login",
  description:
    "Free AI meta description generator, 100% free with no login and no usage limit. Paste your blog content to get 4 SEO-optimized meta description options.",
};

export default function Page() {
  const tool = getTool("meta-description-generator")!;
  return (
    <ToolShell tool={tool}>
      <MetaDescriptionGenerator />
    </ToolShell>
  );
}
