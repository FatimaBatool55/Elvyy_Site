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

function countNgrams(
  words: string[],
  n: number,
  filterStopwords: boolean
): PhraseCount[] {
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

// Density thresholds scale slightly with article length: short pieces
// naturally repeat a topic word more often without it being spammy.
function densityStatus(
  density: number,
  totalWords: number
): { label: string; color: string; bg: string } {
  const lengthFactor = totalWords < 300 ? 1.4 : totalWords < 800 ? 1.15 : 1;
  const goodMax = 1.5 * lengthFactor;
  const optimalMax = 2.5 * lengthFactor;
  const highMax = 3.5 * lengthFactor;

  if (density <= goodMax) {
    return { label: "Good", color: "text-sage-deep", bg: "bg-sage/10" };
  }
  if (density <= optimalMax) {
    return { label: "Optimal", color: "text-sage-deep", bg: "bg-sage/10" };
  }
  if (density <= highMax) {
    return { label: "Getting high", color: "text-gold", bg: "bg-gold/10" };
  }
  return { label: "Overstuffed", color: "text-red-700", bg: "bg-red-50" };
}

function computeBalanceScore(
  single: PhraseCount[],
  totalWords: number
): { score: number; label: string; notes: string[] } {
  if (totalWords < 30) {
    return {
      score: 0,
      label: "Not enough content",
      notes: ["Add more text for a meaningful score."],
    };
  }

  let score = 100;
  const notes: string[] = [];

  const overstuffed = single.filter(
    (p) => densityStatus(p.density, totalWords).label === "Overstuffed"
  );
  const high = single.filter(
    (p) => densityStatus(p.density, totalWords).label === "Getting high"
  );

  if (overstuffed.length > 0) {
    score -= Math.min(50, overstuffed.length * 20);
    notes.push(
      `${overstuffed.length} word${overstuffed.length > 1 ? "s" : ""} appear far too often for the length of this content.`
    );
  }
  if (high.length > 0) {
    score -= Math.min(20, high.length * 8);
    notes.push(
      `${high.length} word${high.length > 1 ? "s" : ""} are close to overuse, worth keeping an eye on.`
    );
  }

  const uniqueWords = new Set(
    single.map((p) => p.phrase)
  ).size;
  const vocabularyRichness = totalWords > 0 ? uniqueWords / Math.min(totalWords, 200) : 0;
  if (vocabularyRichness < 0.25 && totalWords > 150) {
    score -= 10;
    notes.push("Vocabulary feels repetitive, try varying word choice more.");
  }

  score = Math.max(0, Math.min(100, score));

  const label =
    score >= 80
      ? "Well balanced"
      : score >= 55
        ? "Could be improved"
        : "Needs work";

  if (notes.length === 0) {
    notes.push("No single word or phrase dominates the content.");
  }

  return { score, label, notes };
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const words = tokenize(text);
    const totalWords = words.length;

    const single = countNgrams(words, 1, true);
    const two = countNgrams(words, 2, false).filter((p) => p.count > 1);
    const three = countNgrams(words, 3, false).filter((p) => p.count > 1);

    const balance = computeBalanceScore(single, totalWords);

    return { totalWords, single, two, three, balance };
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
          <div className="mt-6 rounded-lg border border-line bg-card p-5">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Overall balance score
              </p>
              <p className="font-mono text-xs text-ink-soft">
                {analysis.totalWords} words
              </p>
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <p className="font-display text-4xl text-ink">
                {analysis.balance.score}
              </p>
              <p className="text-sm text-ink-soft">/100 — {analysis.balance.label}</p>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-ink-soft">
              {analysis.balance.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-soft">
              What counts as overused depends on length: a short piece
              naturally repeats a topic word more than a long one, so the
              thresholds below adjust slightly for shorter content instead
              of using one fixed number for everything.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <KeywordTable
              title="Top single words"
              data={analysis.single}
              totalWords={analysis.totalWords}
            />
            <KeywordTable
              title="Top 2-word phrases"
              data={analysis.two}
              totalWords={analysis.totalWords}
            />
            <KeywordTable
              title="Top 3-word phrases"
              data={analysis.three}
              totalWords={analysis.totalWords}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sage-deep" /> Good /
              Optimal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gold" /> Getting high
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-700" /> Overstuffed
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function KeywordTable({
  title,
  data,
  totalWords,
}: {
  title: string;
  data: PhraseCount[];
  totalWords: number;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {title}
      </p>
      <div className="mt-3 space-y-1">
        {data.length === 0 && (
          <p className="text-sm text-ink-soft">Not enough repeated phrases</p>
        )}
        {data.map((p) => {
          const status = densityStatus(p.density, totalWords);
          return (
            <div
              key={p.phrase}
              className={`flex items-center justify-between rounded border border-line px-3 py-2 text-sm ${status.bg}`}
            >
              <span className="text-ink">{p.phrase}</span>
              <span className={`font-mono text-xs ${status.color}`}>
                {p.count}× · {p.density.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
