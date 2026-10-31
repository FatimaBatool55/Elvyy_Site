"use client";

import { useState } from "react";

type Row = { id: number; name: string; held: string; attended: string; total: string };

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));
const PRESETS = [60, 65, 75, 80, 85];
let nextId = 3;

function analyse(r: Row, req: number, skip: number) {
  const held = num(r.held);
  const att = num(r.attended);
  if (!Number.isInteger(held) || !Number.isInteger(att) || held <= 0 || att < 0 || att > held) {
    return null;
  }
  const pct = (att / held) * 100;
  const ok = pct + 1e-9 >= req;
  let canMiss = 0;
  let mustAttend = 0;
  let impossible = false;

  if (ok) canMiss = Math.max(0, Math.floor((att * 100) / req - held + 1e-9));
  else if (req >= 100) impossible = true;
  else mustAttend = Math.ceil((req * held - 100 * att) / (100 - req) - 1e-9);

  const afterSkip = skip > 0 ? (att / (held + skip)) * 100 : null;

  const total = num(r.total);
  let sem: { remaining: number; needed: number; canMiss: number; impossible: boolean } | null = null;
  if (Number.isInteger(total) && total > held) {
    const remaining = total - held;
    const neededTotal = Math.ceil((req / 100) * total - 1e-9);
    const needed = Math.max(0, neededTotal - att);
    sem = { remaining, needed, canMiss: remaining - needed, impossible: needed > remaining };
  }
  return { pct, ok, canMiss, mustAttend, impossible, afterSkip, sem, held, att };
}

const inputCls =
  "w-full rounded border border-line bg-card px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage";

export default function AttendanceCalculator() {
  const [required, setRequired] = useState("75");
  const [skip, setSkip] = useState("2");
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: "Subject 1", held: "40", attended: "32", total: "60" },
    { id: 2, name: "Subject 2", held: "30", attended: "20", total: "48" },
  ]);

  const req = num(required);
  const reqOk = Number.isFinite(req) && req > 0 && req <= 100;
  const skipN = Number.isInteger(num(skip)) && num(skip) > 0 ? num(skip) : 0;

  const results = rows.map((r) => (reqOk ? analyse(r, req, skipN) : null));
  const valid = results.filter((x): x is NonNullable<typeof x> => x !== null);
  const totalHeld = valid.reduce((s, x) => s + x.held, 0);
  const totalAtt = valid.reduce((s, x) => s + x.att, 0);

  const update = (id: number, key: keyof Row, value: string) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <label className="block text-xs text-ink-soft">
          Required attendance (%)
          <input
            type="number"
            min="1"
            max="100"
            value={required}
            onChange={(e) => setRequired(e.target.value)}
            className={`${inputCls} mt-1 w-32`}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setRequired(String(p))}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                req === p
                  ? "border-sage-deep bg-sage-deep text-paper"
                  : "border-line text-ink-soft hover:border-sage"
              }`}
            >
              {p}%
            </button>
          ))}
        </div>
        <label className="block text-xs text-ink-soft">
          If I skip the next (classes)
          <input
            type="number"
            min="0"
            value={skip}
            onChange={(e) => setSkip(e.target.value)}
            className={`${inputCls} mt-1 w-32`}
          />
        </label>
      </div>
      {!reqOk && <p className="mt-2 text-xs text-ink">Enter a required percentage between 1 and 100.</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              <th className="pb-2 pr-3 font-normal">Subject</th>
              <th className="pb-2 pr-3 font-normal">Classes held</th>
              <th className="pb-2 pr-3 font-normal">Classes attended</th>
              <th className="pb-2 pr-3 font-normal">Total in semester (optional)</th>
              <th className="pb-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-line">
                <td className="py-2 pr-3"><input className={inputCls} value={r.name} onChange={(e) => update(r.id, "name", e.target.value)} /></td>
                <td className="py-2 pr-3"><input type="number" min="0" className={inputCls} value={r.held} onChange={(e) => update(r.id, "held", e.target.value)} /></td>
                <td className="py-2 pr-3"><input type="number" min="0" className={inputCls} value={r.attended} onChange={(e) => update(r.id, "attended", e.target.value)} /></td>
                <td className="py-2 pr-3"><input type="number" min="0" className={inputCls} value={r.total} onChange={(e) => update(r.id, "total", e.target.value)} /></td>
                <td className="py-2">
                  {rows.length > 1 && (
                    <button
                      onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                      aria-label="Remove subject"
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

      {rows.length < 12 && (
        <button
          onClick={() => setRows((prev) => [...prev, { id: nextId++, name: `Subject ${prev.length + 1}`, held: "", attended: "", total: "" }])}
          className="mt-3 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
        >
          + Add subject
        </button>
      )}
      <p className="mt-2 text-xs text-ink-soft">These are example numbers. Replace them with your own.</p>

      {valid.length > 0 && (
        <div className="mt-8 rounded-lg border border-line bg-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Overall attendance, all subjects</p>
          <p className="mt-1 font-display text-4xl text-ink">{((totalAtt / totalHeld) * 100).toFixed(2)}%</p>
          <p className="text-xs text-ink-soft">{totalAtt} attended out of {totalHeld} classes held</p>
        </div>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rows.map((r, i) => {
          const a = results[i];
          return (
            <div key={r.id} className="rounded-lg border border-line bg-card p-5">
              <p className="font-display text-lg text-ink">{r.name || `Subject ${i + 1}`}</p>
              {!a ? (
                <p className="mt-2 text-sm text-ink-soft">
                  Enter whole numbers. Classes attended cannot be more than classes held.
                </p>
              ) : (
                <div className="mt-2 space-y-2 text-sm text-ink">
                  <p>
                    <span className="font-display text-3xl">{a.pct.toFixed(2)}%</span>{" "}
                    <span className="text-ink-soft">{a.ok ? "Safe" : "Below requirement"}</span>
                  </p>
                  {a.ok ? (
                    <p>
                      {a.canMiss > 0
                        ? `You can miss up to ${a.canMiss} more ${a.canMiss === 1 ? "class" : "classes"} in a row and stay at ${req}% or above.`
                        : `You are right at the limit. Missing the next class will drop you below ${req}%.`}
                    </p>
                  ) : a.impossible ? (
                    <p>You cannot reach 100% again because earlier classes were missed.</p>
                  ) : (
                    <p>
                      Attend the next {a.mustAttend} {a.mustAttend === 1 ? "class" : "classes"} in a row to reach {req}%.
                    </p>
                  )}
                  {a.afterSkip !== null && (
                    <p className="text-ink-soft">
                      If you skip the next {skipN}, your attendance becomes {a.afterSkip.toFixed(2)}%.
                    </p>
                  )}
                  {a.sem && (
                    <p className="border-t border-line pt-2">
                      {a.sem.impossible
                        ? `Reaching ${req}% by the end of the semester is no longer possible, even if you attend all ${a.sem.remaining} remaining classes.`
                        : `Of the ${a.sem.remaining} classes left, attend at least ${a.sem.needed}. You can miss ${a.sem.canMiss} and still finish at ${req}%.`}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
