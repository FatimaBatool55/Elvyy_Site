import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import BlogTitleGenerator from "@/components/tools/BlogTitleGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Blog Title Generator — 100% Free, No Login",
  description:
    "Free AI blog title generator, 100% free with no login and no usage limit. Enter a topic to get 10 SEO-friendly title options from different angles.",
};

export default function Page() {
  const tool = getTool("blog-title-generator")!;
  return (
    <ToolShell tool={tool}>
      <BlogTitleGenerator />
    </ToolShell>
  );
}
