"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";

export default function ToolFinder() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return tools.slice(0, 4);
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-xl rounded-xl border border-line bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="font-mono text-sage-deep">/</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a tool, e.g. word counter"
          className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none"
        />
      </div>
      <ul className="divide-y divide-line">
        {results.length === 0 && (
          <li className="px-5 py-4 text-sm text-ink-soft">
            No tool matches yet, browse all tools instead.
          </li>
        )}
        {results.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="flex items-center justify-between px-5 py-3 text-sm hover:bg-paper-dim transition-colors"
            >
              <span className="text-ink">{tool.name}</span>
              <span className="font-mono text-xs text-ink-soft">
                {tool.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
