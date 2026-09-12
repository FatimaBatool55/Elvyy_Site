"use client";

import { useMemo, useState } from "react";

const stopwords = new Set([
  "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "being", "to", "of", "in", "on", "at", "by", "for", "with",
  "about", "as", "into", "like", "through", "after", "over", "between",
  "out", "against", "during", "without", "before", "under", "around",
  "among", "it", "its", "this", "that", "these", "those", "i", "you",
  "he", "she", "we", "they", "them", "his", "her", "our", "your", "their",
  "not", "no", "so", "if", "then", "than", "too", "very", "can", "will",
  "just", "up", "down", "off", "again", "further", "once", "there",
  "when", "where", "why", "how", "all", "any", "both", "each", "few",
  "more", "most", "other", "some", "such", "only", "own", "same", "do",
  "does", "did", "have", "has", "had", "having", "from", "what", "which",
  "who", "whom", "am",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z']+/g) || [];
}

type PhraseCount = { phrase: string; count: number; density: number };

function countNgrams(words: string[], n: number, filterStopwords: boolean): PhraseCount[] {
  const counts = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n);
    if (filterStopwords && n === 1 && stopwords.has(gram[0])) continue;
    if (filterStopwords && gram.every((w) => stopwords.has(w))) continue;
    const phrase = gram.join(" ");
    counts.set(phrase, (counts.get(phrase) || 0) + 1);
  }
  const total = words.length;
  return Array.from(counts.entries())
    .map(([phrase, count]) => ({
      phrase,
      count,
      density: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const words = tokenize(text);
    const totalWords = words.length;

    const single = countNgrams(words, 1, true);
    const two = countNgrams(words, 2, false).filter((p) => p.count > 1);
    const three = countNgrams(words, 3, false).filter((p) => p.count > 1);

    const overused = single.filter((p) => p.density > 3);

    return { totalWords, single, two, three, overused };
  }, [text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your blog post or article content here..."
        className="h-64 w-full resize-y rounded-lg border border-line bg-card p-4 text-sm leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />

      {analysis.totalWords > 0 && (
        <>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-soft">
            <span>Total words: {analysis.totalWords}</span>
          </div>

          {analysis.overused.length > 0 && (
            <div className="mt-4 rounded-lg border border-line bg-paper-dim p-4">
              <p className="text-sm text-ink">
                These words appear often enough that search engines may see
                it as keyword stuffing (over 3% density):
              </p>
              <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                {analysis.overused.map((p) => (
                  <li key={p.phrase}>
                    &ldquo;{p.phrase}&rdquo; — {p.density.toFixed(1)}% (
                    {p.count} times)
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <KeywordTable title="Top single words" data={analysis.single} />
            <KeywordTable title="Top 2-word phrases" data={analysis.two} />
            <KeywordTable title="Top 3-word phrases" data={analysis.three} />
          </div>
        </>
      )}
    </div>
  );
}

function KeywordTable({ title, data }: { title: string; data: PhraseCount[] }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {title}
      </p>
      <div className="mt-3 space-y-1">
        {data.length === 0 && (
          <p className="text-sm text-ink-soft">Not enough repeated phrases</p>
        )}
        {data.map((p) => (
          <div
            key={p.phrase}
            className="flex items-center justify-between rounded border border-line bg-card px-3 py-2 text-sm"
          >
            <span className="text-ink">{p.phrase}</span>
            <span className="font-mono text-xs text-ink-soft">
              {p.count}× · {p.density.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
