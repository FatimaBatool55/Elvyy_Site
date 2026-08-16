import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolShell({
  tool,
  children,
}: {
  tool: Tool;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/tools"
        className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-sage-deep"
      >
        ← All tools
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-sage-deep">
        {tool.category}
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">{tool.name}</h1>
      <p className="mt-3 max-w-xl text-ink-soft">{tool.description}</p>

      <div className="mt-10">{children}</div>

      <p className="mt-10 font-mono text-xs text-ink-soft">
        This tool is free with no usage limit, use it as often as you need.
      </p>
    </div>
  );
}
