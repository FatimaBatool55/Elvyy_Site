import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import BlogTitleGenerator from "@/components/tools/BlogTitleGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Title Generator",
  description:
    "Enter a topic and get 10 SEO-friendly title ideas. Unlimited free, no account needed.",
};

export default function Page() {
  const tool = getTool("blog-title-generator")!;
  return (
    <ToolShell tool={tool}>
      <BlogTitleGenerator />
    </ToolShell>
  );
}
