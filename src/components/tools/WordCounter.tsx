"use client";

import { useMemo, useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed
      ? (trimmed.match(/[.!?]+(\s|$)/g) || []).length || (trimmed ? 1 : 0)
      : 0;
    const readingTime = Math.max(1, Math.round(words / 200));
    return { words, chars, charsNoSpaces, sentences, readingTime };
  }, [text]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_260px]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="h-72 w-full resize-y rounded-lg border border-line bg-card p-4 text-sm leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />
      <div className="grid grid-cols-2 gap-3 content-start md:grid-cols-1">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.chars} />
        <Stat label="Characters (no spaces)" value={stats.charsNoSpaces} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Reading time" value={`${stats.readingTime} min`} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-line bg-card p-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl text-ink">{value}</p>
    </div>
  );
}
