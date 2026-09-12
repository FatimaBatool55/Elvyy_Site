"use client";

import { useMemo, useState } from "react";

const passiveHelpers = new Set([
  "is", "are", "was", "were", "be", "been", "being", "am",
]);

const irregularPastParticiples = new Set([
  "done", "made", "given", "taken", "written", "seen", "known", "shown",
  "told", "sent", "kept", "held", "found", "said", "brought", "bought",
  "thought", "felt", "left", "met", "put", "set", "built", "spent", "sold",
  "taught", "caught", "gained", "chosen", "broken", "spoken", "driven",
  "grown", "drawn", "worn", "torn", "born", "hidden", "forgotten",
]);

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 3) return 1;
  const stripped = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  const matches = stripped.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function isPassiveSentence(sentence: string): boolean {
  const words = sentence.toLowerCase().match(/[a-z']+/g) || [];
  for (let i = 0; i < words.length - 1; i++) {
    if (passiveHelpers.has(words[i])) {
      const next = words[i + 1];
      if (next.endsWith("ed") || irregularPastParticiples.has(next)) {
        return true;
      }
    }
  }
  return false;
}

function fleschDescription(score: number): string {
  if (score >= 90) return "Very easy to read";
  if (score >= 80) return "Easy to read";
  if (score >= 70) return "Fairly easy to read";
  if (score >= 60) return "Standard, plain English";
  if (score >= 50) return "Fairly difficult to read";
  if (score >= 30) return "Difficult to read";
  return "Very difficult to read";
}

export default function ReadabilityChecker() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    const sentences = splitSentences(trimmed);
    const words = trimmed.match(/[a-zA-Z']+/g) || [];
    const wordCount = words.length;
    const sentenceCount = sentences.length || 1;

    const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);

    const avgSentenceLength = wordCount / sentenceCount;
    const avgSyllablesPerWord = wordCount > 0 ? syllableCount / wordCount : 0;

    const fleschScore =
      206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
    const gradeLevel =
      0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;

    const passiveSentences = sentences.filter(isPassiveSentence);
    const passivePercent =
      sentences.length > 0
        ? (passiveSentences.length / sentences.length) * 100
        : 0;

    const complexSentences = sentences.filter(
      (s) => (s.match(/[a-zA-Z']+/g) || []).length > 25
    );

    return {
      wordCount,
      sentenceCount: sentences.length,
      avgSentenceLength,
      fleschScore,
      gradeLevel: Math.max(0, gradeLevel),
      passivePercent,
      complexSentences,
    };
  }, [text]);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your writing here to check its readability..."
        className="h-64 w-full resize-y rounded-lg border border-line bg-card p-4 text-sm leading-relaxed text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />

      {analysis && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Reading ease"
              value={analysis.fleschScore.toFixed(0)}
              sub={fleschDescription(analysis.fleschScore)}
            />
            <Stat
              label="Grade level"
              value={analysis.gradeLevel.toFixed(1)}
              sub="US grade to understand this"
            />
            <Stat
              label="Avg. sentence length"
              value={analysis.avgSentenceLength.toFixed(1)}
              sub="words per sentence"
            />
            <Stat
              label="Passive voice"
              value={`${analysis.passivePercent.toFixed(0)}%`}
              sub="of sentences"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-soft">
            <span>{analysis.wordCount} words</span>
            <span>{analysis.sentenceCount} sentences</span>
          </div>

          {analysis.complexSentences.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Long, complex sentences (over 25 words)
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Consider breaking these into shorter sentences for easier
                reading.
              </p>
              <div className="mt-3 space-y-2">
                {analysis.complexSentences.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-line bg-card p-3 text-sm text-ink"
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysis.passivePercent > 20 && (
            <div className="mt-6 rounded-lg border border-line bg-paper-dim p-4">
              <p className="text-sm text-ink">
                {analysis.passivePercent.toFixed(0)}% of sentences use
                passive voice, which is on the higher side. Rewriting some
                in active voice usually makes writing feel more direct.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-card p-5">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl text-ink">{value}</p>
      <p className="mt-1 text-xs text-ink-soft">{sub}</p>
    </div>
  );
}
