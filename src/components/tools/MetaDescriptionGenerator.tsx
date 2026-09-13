"use client";

import { useState } from "react";

export default function MetaDescriptionGenerator() {
  const [content, setContent] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function handleGenerate() {
    if (content.trim().length < 50) return;
    setLoading(true);
    setError("");
    setDescriptions([]);

    try {
      const res = await fetch("/api/generate-meta-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not generate descriptions.");
        setLoading(false);
        return;
      }

      setDescriptions(data.descriptions);
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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your blog post content here (at least a few sentences)..."
        className="h-56 w-full resize-y rounded-lg border border-line bg-card p-4 text-sm leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />

      <button
        onClick={handleGenerate}
        disabled={loading || content.trim().length < 50}
        className="mt-4 rounded-lg bg-sage-deep px-5 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate meta descriptions"}
      </button>

      {error && <p className="mt-4 text-sm text-ink-soft">{error}</p>}

      {descriptions.length > 0 && (
        <div className="mt-8 space-y-3">
          {descriptions.map((desc, i) => (
            <div key={i} className="rounded-lg border border-line bg-card p-4">
              <p className="text-sm text-ink">{desc}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-xs text-ink-soft">
                  {desc.length} characters
                </span>
                <button
                  onClick={() => handleCopy(desc, i)}
                  className="font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
                >
                  {copiedIndex === i ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
