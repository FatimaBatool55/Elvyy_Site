import Link from "next/link";
import type { Metadata } from "next";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Every free tool on Elvyy, in one place. No limits, no signups.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        Tools
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">
        Every tool, unlimited use
      </h1>
      <p className="mt-4 max-w-2xl text-ink-soft">
        Each tool below runs right in your browser and stays free permanently
       , no account, no daily cap, no watermark.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-lg border border-line bg-card p-6 transition-colors hover:border-sage"
          >
            <p className="font-mono text-[11px] uppercase tracking-wide text-sage-deep">
              {tool.category}
            </p>
            <h2 className="mt-2 font-display text-xl text-ink">
              {tool.name}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{tool.description}</p>
            <span className="mt-4 inline-block text-sm text-ink-soft transition-colors group-hover:text-sage-deep">
              Open tool →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
