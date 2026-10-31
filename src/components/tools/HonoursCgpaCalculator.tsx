"use client";

import { useState } from "react";

const SCALE = [
  { g: "A+", gp: 4.0, min: 80 },
  { g: "A", gp: 3.75, min: 75 },
  { g: "A-", gp: 3.5, min: 70 },
  { g: "B+", gp: 3.25, min: 65 },
  { g: "B", gp: 3.0, min: 60 },
  { g: "B-", gp: 2.75, min: 55 },
  { g: "C+", gp: 2.5, min: 50 },
  { g: "C", gp: 2.25, min: 45 },
  { g: "D", gp: 2.0, min: 40 },
  { g: "F", gp: 0, min: 0 },
];

const show = (g: string) => g.replace("-", "−");
const num = (s: string) => (s.trim() === "" ? NaN : Number(s));
const gpOfGrade = (g: string) => SCALE.find((s) => s.g === g)?.gp ?? 0;
const gradeOfMarks = (m: number) => SCALE.find((s) => m >= s.min)!;

type Row = { id: number; name: string; year: string; credit: string; grade: string; marks: string };

let nextId = 7;

const inputCls =
  "w-full rounded border border-line bg-card px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage";

export default function HonoursCgpaCalculator() {
  const [mode, setMode] = useState<"grade" | "marks">("grade");
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: "Course 1", year: "1", credit: "4", grade: "A+", marks: "82" },
    { id: 2, name: "Course 2", year: "1", credit: "4", grade: "A", marks: "77" },
    { id: 3, name: "Course 3", year: "1", credit: "4", grade: "B+", marks: "67" },
    { id: 4, name: "Course 4", year: "2", credit: "4", grade: "A-", marks: "72" },
    { id: 5, name: "Course 5", year: "2", credit: "4", grade: "B", marks: "62" },
    { id: 6, name: "Course 6", year: "2", credit: "3", grade: "A", marks: "76" },
  ]);
  const [target, setTarget] = useState("3.50");
  const [remaining, setRemaining] = useState("12");

  const update = (id: number, key: keyof Row, value: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

  let points = 0;
  let credits = 0;
  let ignored = 0;
  let fails = 0;
  const years: Record<string, { points: number; credits: number }> = {};

  rows.forEach((r) => {
    if (r.credit.trim() === "") return;
    const credit = num(r.credit);
    if (!(credit > 0)) {
      ignored++;
      return;
    }
    let gp: number;
    if (mode === "grade") {
      gp = gpOfGrade(r.grade);
    } else {
      const m = num(r.marks);
      if (!(m >= 0 && m <= 100)) {
        ignored++;
        return;
      }
      gp = gradeOfMarks(m).gp;
    }
    points += gp * credit;
    credits += credit;
    if (gp === 0) fails++;
    const y = years[r.year] ?? { points: 0, credits: 0 };
    years[r.year] = { points: y.points + gp * credit, credits: y.credits + credit };
  });

  const cgpa = credits > 0 ? points / credits : null;

  const t = num(target);
  const rem = num(remaining);
  const targetOk = cgpa !== null && t > 0 && t <= 4 && rem > 0;
  const required = targetOk ? (t * (credits + rem) - points) / rem : null;
  const best = targetOk ? (points + 4 * rem) / (credits + rem) : null;
  const neededGrade =
    required !== null && required > 0 && required <= 4
      ? [...SCALE].reverse().find((s) => s.gp >= required - 1e-9)
      : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["grade", "I know my letter grades"],
            ["marks", "I know my marks"],
          ] as ["grade" | "marks", string][]
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              mode === value
                ? "border-sage-deep bg-sage-deep text-paper"
                : "border-line text-ink-soft hover:border-sage"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              <th className="pb-2 pr-3 font-normal">Course (optional)</th>
              <th className="pb-2 pr-3 font-normal">Year</th>
              <th className="pb-2 pr-3 font-normal">Credit</th>
              <th className="pb-2 pr-3 font-normal">{mode === "grade" ? "Grade" : "Marks (out of 100)"}</th>
              <th className="pb-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-line">
                <td className="py-2 pr-3">
                  <input className={inputCls} value={r.name} onChange={(e) => update(r.id, "name", e.target.value)} />
                </td>
                <td className="py-2 pr-3">
                  <select className={inputCls} value={r.year} onChange={(e) => update(r.id, "year", e.target.value)}>
                    {["1", "2", "3", "4"].map((y) => (
                      <option key={y} value={y}>Year {y}</option>
                    ))}
                  </select>
                </td>
                <td className="py-2 pr-3">
                  <input type="number" min="0" step="0.5" className={inputCls} value={r.credit} onChange={(e) => update(r.id, "credit", e.target.value)} />
                </td>
                <td className="py-2 pr-3">
                  {mode === "grade" ? (
                    <select className={inputCls} value={r.grade} onChange={(e) => update(r.id, "grade", e.target.value)}>
                      {SCALE.map((s) => (
                        <option key={s.g} value={s.g}>{show(s.g)} ({s.gp.toFixed(2)})</option>
                      ))}
                    </select>
                  ) : (
                    <input type="number" min="0" max="100" className={inputCls} value={r.marks} onChange={(e) => update(r.id, "marks", e.target.value)} />
                  )}
                </td>
                <td className="py-2">
                  {rows.length > 1 && (
                    <button
                      onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                      aria-label="Remove course"
                      className="text-ink-soft transition-colors hover:text-ink"
                    >
                      ✕
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length < 60 && (
        <button
          onClick={() =>
            setRows((prev) => [
              ...prev,
              { id: nextId++, name: `Course ${prev.length + 1}`, year: prev[prev.length - 1]?.year ?? "1", credit: "4", grade: "A", marks: "" },
            ])
          }
          className="mt-3 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
        >
          + Add course
        </button>
      )}
      <p className="mt-2 text-xs text-ink-soft">These are example courses. Replace them with your own.</p>

      <div className="mt-8">
        {cgpa === null ? (
          <p className="text-sm text-ink-soft">Add at least one course with a credit value.</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-card p-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Your CGPA</p>
                <p className="mt-1 font-display text-5xl text-ink">{cgpa.toFixed(2)}</p>
                <p className="mt-1 text-xs text-ink-soft">Exact: {cgpa.toFixed(4)} out of 4.00</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Total</p>
                <p className="mt-1 font-display text-4xl text-ink">{credits} credits</p>
                <p className="mt-1 text-xs text-ink-soft">{points.toFixed(2)} total grade points</p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[360px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <th className="pb-2 pr-3 font-normal">Year</th>
                    <th className="pb-2 pr-3 font-normal">Credits</th>
                    <th className="pb-2 font-normal">Year GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(years).sort().map((y) => (
                    <tr key={y} className="border-b border-line">
                      <td className="py-2 pr-3 text-ink">Year {y}</td>
                      <td className="py-2 pr-3 text-ink">{years[y].credits}</td>
                      <td className="py-2 text-ink">{(years[y].points / years[y].credits).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(ignored > 0 || fails > 0) && (
              <div className="mt-4 rounded-lg border border-line bg-paper-dim p-4 text-sm text-ink">
                {ignored > 0 && (
                  <p>{ignored} {ignored === 1 ? "row was" : "rows were"} skipped. Check that credit is above zero{mode === "marks" ? " and marks are between 0 and 100" : ""}.</p>
                )}
                {fails > 0 && (
                  <p className={ignored > 0 ? "mt-2" : ""}>
                    {fails} {fails === 1 ? "course has" : "courses have"} an F. Its credits still count in the total, with zero points.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          What GPA do I need in my remaining courses?
        </p>
        <div className="mt-3 grid max-w-md gap-4 sm:grid-cols-2">
          <label className="block text-xs text-ink-soft">
            Target CGPA
            <input type="number" min="0" max="4" step="0.01" className={`${inputCls} mt-1`} value={target} onChange={(e) => setTarget(e.target.value)} />
          </label>
          <label className="block text-xs text-ink-soft">
            Credits still to take
            <input type="number" min="0" step="0.5" className={`${inputCls} mt-1`} value={remaining} onChange={(e) => setRemaining(e.target.value)} />
          </label>
        </div>
        <div className="mt-4">
          {!targetOk || required === null || best === null ? (
            <p className="text-sm text-ink-soft">Fill in your courses above, a target up to 4.00, and the credits you still have.</p>
          ) : required > 4 + 1e-9 ? (
            <p className="text-sm text-ink">
              This target is not reachable. Even a perfect 4.00 in the remaining credits gives a final CGPA of {best.toFixed(2)}.
            </p>
          ) : required <= 0 ? (
            <p className="text-sm text-ink">Your current CGPA already covers this target.</p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">GPA needed in the remaining credits</p>
              <p className="mt-1 font-display text-3xl text-ink">{required.toFixed(2)}</p>
              {neededGrade && (
                <p className="mt-1 text-xs text-ink-soft">
                  That is an average of about {show(neededGrade.g)} across those credits.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
