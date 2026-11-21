"use client";

import { useState } from "react";

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

const inputCls =
  "w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage";

function Field({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-xs text-ink-soft">
      {label}
      {hint && <span className="ml-1 opacity-60">({hint})</span>}
      <input
        type="number"
        inputMode="decimal"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} mt-1`}
      />
    </label>
  );
}

function ordinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

type Mode = "rankToPercentile" | "percentileToRank" | "scoreToRank";

export default function ClassRankCalculator() {
  const [mode, setMode] = useState<Mode>("rankToPercentile");

  const [rank, setRank] = useState("15");
  const [classSize, setClassSize] = useState("120");

  const [percentile, setPercentile] = useState("90");
  const [classSize2, setClassSize2] = useState("120");

  const [yourScore, setYourScore] = useState("87");
  const [scores, setScores] = useState("92 88 87 85 84 82 80 78 76 74 72 70 68 65 60");

  const r = num(rank), cs = num(classSize);
  const p = num(percentile), cs2 = num(classSize2);
  const ys = num(yourScore);

  const rankOk = Number.isInteger(r) && r > 0 && Number.isInteger(cs) && cs > 0 && r <= cs;
  const percentileOk = Number.isFinite(p) && p >= 0 && p <= 100 && Number.isInteger(cs2) && cs2 > 0;
  const scoreOk = Number.isFinite(ys);

  const percentileFromRank = rankOk
    ? ((cs - r) / cs) * 100
    : null;

  const rankFromPercentile = percentileOk
    ? Math.ceil(cs2 * (1 - p / 100))
    : null;

  const parsedScores = scores
    .split(/[\s,;]+/)
    .map(Number)
    .filter((x) => Number.isFinite(x));

  let scoreResult: {
    rank: number;
    total: number;
    percentile: number;
    above: number;
    below: number;
    tied: number;
    highest: number;
    lowest: number;
    average: number;
    median: number;
  } | null = null;

  if (scoreOk && parsedScores.length > 0) {
    const allWithYours = [...parsedScores];
    if (!parsedScores.includes(ys)) allWithYours.push(ys);
    const sorted = [...allWithYours].sort((a, b) => b - a);
    const above = parsedScores.filter((s) => s > ys).length;
    const below = parsedScores.filter((s) => s < ys).length;
    const tied = parsedScores.filter((s) => s === ys).length;
    const rankPos = above + 1;
    const total = allWithYours.length;
    const pct = ((total - rankPos) / total) * 100;
    const avg = allWithYours.reduce((a, b) => a + b, 0) / total;
    const mid = [...allWithYours].sort((a, b) => a - b);
    const median =
      total % 2 === 0
        ? (mid[total / 2 - 1] + mid[total / 2]) / 2
        : mid[Math.floor(total / 2)];
    scoreResult = {
      rank: rankPos,
      total,
      percentile: pct,
      above,
      below,
      tied,
      highest: sorted[0],
      lowest: sorted[sorted.length - 1],
      average: avg,
      median,
    };
  }

  const modes: { key: Mode; label: string }[] = [
    { key: "rankToPercentile", label: "Rank to percentile" },
    { key: "percentileToRank", label: "Percentile to rank" },
    { key: "scoreToRank", label: "Score vs class" },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              mode === m.key
                ? "border-sage-deep bg-sage-deep text-paper"
                : "border-line text-ink-soft hover:border-sage"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "rankToPercentile" && (
        <div className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your rank" hint="1 is highest" value={rank} onChange={setRank} />
            <Field label="Total students in class" value={classSize} onChange={setClassSize} />
          </div>
          <p className="mt-2 text-xs text-ink-soft">These are example numbers. Replace them with your own.</p>
          <div className="mt-8">
            {!rankOk ? (
              <p className="text-sm text-ink-soft">
                Enter whole numbers. Rank cannot be higher than class size.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-line bg-card p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Percentile</p>
                  <p className="mt-1 font-display text-5xl text-ink">
                    {percentileFromRank!.toFixed(1)}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    You scored higher than {percentileFromRank!.toFixed(1)}% of your class.
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Your rank</p>
                  <p className="mt-1 font-display text-3xl text-ink">{ordinal(r)}</p>
                  <p className="mt-1 text-xs text-ink-soft">out of {cs} students</p>
                </div>
                <div className="rounded-lg border border-line bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Students above you</p>
                  <p className="mt-1 font-display text-3xl text-ink">{r - 1}</p>
                  <p className="mt-1 text-xs text-ink-soft">Students below: {cs - r}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === "percentileToRank" && (
        <div className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Target percentile" hint="0 to 100" value={percentile} onChange={setPercentile} />
            <Field label="Total students in class" value={classSize2} onChange={setClassSize2} />
          </div>
          <p className="mt-2 text-xs text-ink-soft">These are example numbers. Replace them with your own.</p>
          <div className="mt-8">
            {!percentileOk ? (
              <p className="text-sm text-ink-soft">
                Enter a percentile between 0 and 100 and a class size above zero.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-line bg-card p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    Rank needed for {p}th percentile
                  </p>
                  <p className="mt-1 font-display text-5xl text-ink">
                    {ordinal(rankFromPercentile!)}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">
                    or better, out of {cs2} students
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Students you need to beat</p>
                  <p className="mt-1 font-display text-3xl text-ink">
                    {Math.floor(cs2 * p / 100)}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft">out of {cs2} total students</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === "scoreToRank" && (
        <div className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your score" value={yourScore} onChange={setYourScore} />
            <label className="block text-xs text-ink-soft">
              All scores in class
              <span className="ml-1 opacity-60">(space or comma separated)</span>
              <textarea
                rows={3}
                value={scores}
                onChange={(e) => setScores(e.target.value)}
                className={`${inputCls} mt-1 resize-none`}
                placeholder="92 88 87 85 84 ..."
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-ink-soft">
            Paste all scores separated by spaces or commas. Your score will be placed correctly even if already in the list.
          </p>
          <div className="mt-8">
            {!scoreOk || parsedScores.length === 0 ? (
              <p className="text-sm text-ink-soft">
                Enter your score and paste the class scores.
              </p>
            ) : !scoreResult ? null : (
              <>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-line bg-card p-6">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Your rank</p>
                    <p className="mt-1 font-display text-5xl text-ink">
                      {ordinal(scoreResult.rank)}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">out of {scoreResult.total} students</p>
                  </div>
                  <div className="rounded-lg border border-line bg-card p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Percentile</p>
                    <p className="mt-1 font-display text-3xl text-ink">
                      {scoreResult.percentile.toFixed(1)}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">
                      Higher than {scoreResult.percentile.toFixed(1)}% of class
                    </p>
                  </div>
                  <div className="rounded-lg border border-line bg-card p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Students above</p>
                    <p className="mt-1 font-display text-3xl text-ink">{scoreResult.above}</p>
                    <p className="mt-1 text-xs text-ink-soft">
                      Below you: {scoreResult.below}
                      {scoreResult.tied > 0 && `, Tied: ${scoreResult.tied}`}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-lg border border-line bg-paper-dim p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Class highest</p>
                    <p className="mt-1 font-display text-2xl text-ink">{scoreResult.highest}</p>
                  </div>
                  <div className="rounded-lg border border-line bg-paper-dim p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Class average</p>
                    <p className="mt-1 font-display text-2xl text-ink">{scoreResult.average.toFixed(1)}</p>
                  </div>
                  <div className="rounded-lg border border-line bg-paper-dim p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Class median</p>
                    <p className="mt-1 font-display text-2xl text-ink">{scoreResult.median}</p>
                  </div>
                  <div className="rounded-lg border border-line bg-paper-dim p-4">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Class lowest</p>
                    <p className="mt-1 font-display text-2xl text-ink">{scoreResult.lowest}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-line bg-card p-4 text-sm text-ink">
                  {scoreResult.rank === 1
                    ? "You have the highest score in the class."
                    : `You are ${scoreResult.above} ${scoreResult.above === 1 ? "place" : "places"} away from the top. The highest score is ${scoreResult.highest}.`}
                  {scoreResult.average > 0 && (
                    <span>
                      {" "}Your score of {ys} is{" "}
                      {ys >= scoreResult.average
                        ? `${(ys - scoreResult.average).toFixed(1)} points above`
                        : `${(scoreResult.average - ys).toFixed(1)} points below`}{" "}
                      the class average of {scoreResult.average.toFixed(1)}.
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
