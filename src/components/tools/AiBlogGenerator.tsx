"use client";

import { useState } from "react";

type Outline = { title: string; headings: string[] };

const wordRanges = [
  { value: "500-800", label: "500 – 800 words" },
  { value: "800-1200", label: "800 – 1200 words" },
  { value: "1200-1800", label: "1200 – 1800 words" },
  { value: "1800-2500", label: "1800 – 2500 words" },
];

export default function AiBlogGenerator() {
  const [step, setStep] = useState<"topic" | "outlines" | "content">("topic");
  const [topic, setTopic] = useState("");
  const [wordRange, setWordRange] = useState(wordRanges[1].value);

  const [outlines, setOutlines] = useState<Outline[]>([]);
  const [selectedOutline, setSelectedOutline] = useState<Outline | null>(null);

  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const [loadingOutlines, setLoadingOutlines] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState("");

  async function handleGetOutlines() {
    if (!topic.trim()) return;
    setLoadingOutlines(true);
    setError("");
    setOutlines([]);

    try {
      const res = await fetch("/api/generate-blog-outline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, wordRange }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not generate outlines.");
        setLoadingOutlines(false);
        return;
      }

      setOutlines(data.outlines);
      setStep("outlines");
    } catch {
      setError("Could not reach the AI service. Try again shortly.");
    } finally {
      setLoadingOutlines(false);
    }
  }

  async function handleApproveOutline(outline: Outline) {
    setSelectedOutline(outline);
    setLoadingContent(true);
    setError("");
    setContent("");

    try {
      const res = await fetch("/api/generate-blog-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, outline, wordRange }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not generate the blog post.");
        setLoadingContent(false);
        return;
      }

      setContent(data.content);
      setStep("content");
    } catch {
      setError("Could not reach the AI service. Try again shortly.");
    } finally {
      setLoadingContent(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleStartOver() {
    setStep("topic");
    setOutlines([]);
    setSelectedOutline(null);
    setContent("");
    setError("");
  }

  return (
    <div>
      {step === "topic" && (
        <div>
          <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Blog topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. how to start a small herb garden indoors"
            className="mt-2 w-full rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          />

          <label className="mt-6 block font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Target length
          </label>
          <select
            value={wordRange}
            onChange={(e) => setWordRange(e.target.value)}
            className="mt-2 w-full max-w-xs rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          >
            {wordRanges.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleGetOutlines}
            disabled={loadingOutlines || !topic.trim()}
            className="mt-6 rounded-lg bg-sage-deep px-5 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loadingOutlines ? "Generating outlines..." : "Get outline options"}
          </button>
        </div>
      )}

      {step === "outlines" && (
        <div>
          <p className="text-sm text-ink-soft">
            Pick the outline that fits best, the full blog post will be
            written from it.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {outlines.map((outline, i) => (
              <div
                key={i}
                className="rounded-lg border border-line bg-card p-5"
              >
                <p className="font-display text-lg text-ink">
                  {outline.title}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                  {outline.headings.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleApproveOutline(outline)}
                  disabled={loadingContent}
                  className="mt-4 w-full rounded-lg border border-sage-deep px-4 py-2 font-mono text-xs uppercase tracking-wide text-sage-deep transition-colors hover:bg-sage-deep hover:text-paper disabled:opacity-50"
                >
                  {loadingContent && selectedOutline === outline
                    ? "Writing..."
                    : "Use this outline"}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleStartOver}
            className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink"
          >
            ← Start over with a different topic
          </button>
        </div>
      )}

      {step === "content" && (
        <div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              {selectedOutline?.title}
            </p>
            <button
              onClick={handleCopy}
              className="font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
            >
              {copied ? "Copied" : "Copy blog text"}
            </button>
          </div>
          <div className="mt-3 whitespace-pre-wrap rounded-lg border border-line bg-card p-5 text-sm leading-relaxed text-ink">
            {content}
          </div>
          <button
            onClick={handleStartOver}
            className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink"
          >
            ← Write another blog post
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-ink-soft">{error}</p>}

      <p className="mt-8 text-xs text-ink-soft">
        AI-generated content should be reviewed and edited before publishing,
        it can occasionally get facts wrong or sound generic.
      </p>
    </div>
  );
}
