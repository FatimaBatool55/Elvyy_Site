"use client";

import { useState } from "react";

export default function BlogTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setTitles([]);

    try {
      const res = await fetch("/api/generate-blog-titles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not generate titles.");
        setLoading(false);
        return;
      }

      setTitles(data.titles);
    } catch {
      setError("Could not reach the AI service. Try again shortly.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. budgeting for beginners"
          className="flex-1 rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="rounded-lg bg-sage-deep px-5 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate titles"}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-ink-soft">{error}</p>}

      {titles.length > 0 && (
        <div className="mt-8 space-y-2">
          {titles.map((title, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-line bg-card p-4"
            >
              <p className="text-sm text-ink">{title}</p>
              <button
                onClick={() => handleCopy(title, i)}
                className="shrink-0 pl-4 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
              >
                {copiedIndex === i ? "Copied" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
