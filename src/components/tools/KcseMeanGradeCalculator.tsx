"use client";

import { useState } from "react";

const POINTS: Record<string, number> = {
  A: 12, "A-": 11, "B+": 10, B: 9, "B-": 8, "C+": 7,
  C: 6, "C-": 5, "D+": 4, D: 3, "D-": 2, E: 1,
};
const GRADES = Object.keys(POINTS);

const BANDS = [
  { grade: "A", min: 81 }, { grade: "A-", min: 74 }, { grade: "B+", min: 67 },
  { grade: "B", min: 60 }, { grade: "B-", min: 53 }, { grade: "C+", min: 46 },
  { grade: "C", min: 39 }, { grade: "C-", min: 32 }, { grade: "D+", min: 25 },
  { grade: "D", min: 18 }, { grade: "D-", min: 11 }, { grade: "E", min: 7 },
];

const show = (g: string) => g.replace("-", "−");

function meanGradeFor(aggregate: number) {
  return (BANDS.find((b) => aggregate >= b.min) ?? BANDS[BANDS.length - 1]).grade;
}

type Subj = { id: string; label: string; grade: string; points: number };

function GradeSelect({
  label,
  value,
  onChange,
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  optional?: boolean;
}) {
  return (
    <label className="block text-xs text-ink-soft">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      >
        {optional && <option value="">Not taken</option>}
        {GRADES.map((g) => (
          <option key={g} value={g}>
            {show(g)} ({POINTS[g]} points)
          </option>
        ))}
      </select>
    </label>
  );
}

export default function KcseMeanGradeCalculator() {
  const [maths, setMaths] = useState("B");
  const [english, setEnglish] = useState("B-");
  const [kiswahili, setKiswahili] = useState("C+");
  const [others, setOthers] = useState<string[]>(["C+", "B", "B-", "C", "", ""]);
  const [target, setTarget] = useState("B");

  const m = POINTS[maths];
  const e = POINTS[english];
  const k = POINTS[kiswahili];
  const englishIsBest = e >= k;
  const bestLangLabel = englishIsBest ? "English" : "Kiswahili";
  const bestLangGrade = englishIsBest ? english : kiswahili;
  const otherLangLabel = englishIsBest ? "Kiswahili" : "English";
  const otherLangGrade = englishIsBest ? kiswahili : english;

  const pool: Subj[] = [
    {
      id: "lang",
      label: `${otherLangLabel} (other language)`,
      grade: otherLangGrade,
      points: POINTS[otherLangGrade],
    },
    ...others.flatMap((g, i) =>
      g ? [{ id: `o${i}`, label: `Subject ${i + 4}`, grade: g, points: POINTS[g] }] : []
    ),
  ];

  const enough = pool.length >= 5;
  const ranked = [...pool].sort((a, b) => b.points - a.points);
  const countedIds = new Set(ranked.slice(0, 5).map((s) => s.id));
  const aggregate =
    m + POINTS[bestLangGrade] + ranked.slice(0, 5).reduce((s, x) => s + x.points, 0);
  const grade = meanGradeFor(aggregate);
  const idx = BANDS.findIndex((b) => b.grade === grade);
  const next = idx > 0 ? BANDS[idx - 1] : null;
  const targetBand = BANDS.find((b) => b.grade === target)!;
  const gap = Math.max(0, targetBand.min - aggregate);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <GradeSelect label="Mathematics" value={maths} onChange={setMaths} />
        <GradeSelect label="English" value={english} onChange={setEnglish} />
        <GradeSelect label="Kiswahili" value={kiswahili} onChange={setKiswahili} />
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        Your other subjects (at least four)
      </p>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        {others.map((g, i) => (
          <GradeSelect
            key={i}
            label={`Subject ${i + 4}`}
            value={g}
            optional
            onChange={(v) => setOthers((prev) => prev.map((x, j) => (j === i ? v : x)))}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        These are example grades. Replace them with your own.
      </p>

      <div className="mt-8">
        {!enough ? (
          <p className="text-sm text-ink">
            KCSE needs at least seven subjects. Add at least four subjects besides Mathematics, English and Kiswahili.
          </p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Mean grade</p>
                <p className="mt-1 font-display text-5xl text-ink">{show(grade)}</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Aggregate points</p>
                <p className="mt-1 font-display text-4xl text-ink">{aggregate} / 84</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Mean points</p>
                <p className="mt-1 font-display text-4xl text-ink">{(aggregate / 7).toFixed(2)}</p>
                <p className="text-xs text-ink-soft">Rounded: {Math.round(aggregate / 7)}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-line bg-paper-dim p-4 text-sm text-ink">
              {aggregate >= 46
                ? "Your mean grade is C+ or above, which has traditionally been the minimum for public university degree programmes. Check the current KUCCPS rules."
                : "Your mean grade is below C+, the traditional minimum for public university degree programmes. Diploma and certificate routes may still be open to you."}
              {next && (
                <p className="mt-2">
                  You need {next.min - aggregate} more points to reach {show(next.grade)}.
                </p>
              )}
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <th className="pb-2 pr-3 font-normal">Subject</th>
                    <th className="pb-2 pr-3 font-normal">Grade</th>
                    <th className="pb-2 pr-3 font-normal">Points</th>
                    <th className="pb-2 font-normal">Counts?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "m", label: "Mathematics", grade: maths, points: m, counted: true },
                    { id: "b", label: `${bestLangLabel} (best language)`, grade: bestLangGrade, points: POINTS[bestLangGrade], counted: true },
                    ...pool.map((s) => ({ ...s, counted: countedIds.has(s.id) })),
                  ].map((r) => (
                    <tr key={r.id} className="border-b border-line">
                      <td className="py-2 pr-3 text-ink">{r.label}</td>
                      <td className="py-2 pr-3 text-ink">{show(r.grade)}</td>
                      <td className="py-2 pr-3 text-ink">{r.points}</td>
                      <td className="py-2 text-ink-soft">{r.counted ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          How many points do I need for my target grade?
        </p>
        <div className="mt-3 max-w-xs">
          <label className="block text-xs text-ink-soft">
            Target mean grade
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
            >
              {BANDS.map((b) => (
                <option key={b.grade} value={b.grade}>{show(b.grade)}</option>
              ))}
            </select>
          </label>
        </div>
        {enough && (
          <p className="mt-4 text-sm text-ink">
            {show(targetBand.grade)} needs at least {targetBand.min} aggregate points.{" "}
            {gap === 0
              ? "You already meet this target."
              : `You are ${gap} points short, which is about ${Math.ceil(gap / 1)} grade steps across your counted subjects.`}
          </p>
        )}
      </div>
    </div>
  );
}
