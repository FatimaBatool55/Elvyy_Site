"use client";

import { useState } from "react";

type Weights = { utme: number; post: number; olevel: number };
type Reverse = {
  kind: "post" | "utme";
  marks: number;
  max: number;
  best: number;
};

const PRESETS: { key: string; label: string; w: Weights }[] = [
  { key: "standard", label: "Standard: UTME ÷ 8 + Post UTME ÷ 2", w: { utme: 50, post: 50, olevel: 0 } },
  { key: "three", label: "UTME, Post UTME and O'Level (50/30/20)", w: { utme: 50, post: 30, olevel: 20 } },
  { key: "nopost", label: "UTME and O'Level only (80/20)", w: { utme: 80, post: 0, olevel: 20 } },
  { key: "custom", label: "Custom weights", w: { utme: 50, post: 30, olevel: 20 } },
];

const GRADES: Record<string, number> = {
  A1: 6, B2: 5, B3: 4, C4: 3, C5: 2, C6: 1, D7: 0, E8: 0, F9: 0,
};
const GRADE_KEYS = Object.keys(GRADES);

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

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
        className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />
    </label>
  );
}

export default function JambAggregateCalculator() {
  const [preset, setPreset] = useState("standard");
  const [custom, setCustom] = useState({ utme: "50", post: "30", olevel: "20" });
  const [utme, setUtme] = useState("280");
  const [post, setPost] = useState("70");
  const [postMax, setPostMax] = useState("100");
  const [grades, setGrades] = useState<string[]>(["B2", "B3", "C4", "B2", "C5"]);
  const [target, setTarget] = useState("70");

  const active = PRESETS.find((p) => p.key === preset)!;
  const w: Weights =
    preset === "custom"
      ? { utme: num(custom.utme), post: num(custom.post), olevel: num(custom.olevel) }
      : active.w;

  const weightsOk =
    [w.utme, w.post, w.olevel].every((x) => Number.isFinite(x) && x >= 0) &&
    Math.abs(w.utme + w.post + w.olevel - 100) < 0.001;

  const u = num(utme);
  const p = num(post);
  const pm = num(postMax);
  const utmeOk = Number.isFinite(u) && u >= 0 && u <= 400;
  const postOk =
    w.post === 0 ||
    (Number.isFinite(p) && Number.isFinite(pm) && pm > 0 && p >= 0 && p <= pm);

  const oPoints = grades.reduce((s, g) => s + (GRADES[g] ?? 0), 0);
  const oPart = weightsOk ? (oPoints / 30) * w.olevel : 0;
  const uPart = weightsOk && utmeOk ? (u / 400) * w.utme : 0;
  const pPart = weightsOk && w.post > 0 && postOk ? (p / pm) * w.post : 0;

  const result =
    weightsOk && utmeOk && postOk
      ? { uPart, pPart, oPart, aggregate: uPart + pPart + oPart }
      : null;

  const t = num(target);
  let reverse: Reverse | null = null;
  if (weightsOk && Number.isFinite(t) && t > 0 && t <= 100) {
    if (w.post > 0 && utmeOk && Number.isFinite(pm) && pm > 0) {
      const need = ((t - uPart - oPart) / w.post) * pm;
      reverse = {
        kind: "post",
        marks: Math.ceil(need * 100 - 1e-7) / 100,
        max: pm,
        best: uPart + oPart + w.post,
      };
    } else if (w.post === 0 && w.utme > 0) {
      const need = ((t - oPart) / w.utme) * 400;
      reverse = {
        kind: "utme",
        marks: Math.ceil(need - 1e-9),
        max: 400,
        best: oPart + w.utme,
      };
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((pr) => (
          <button
            key={pr.key}
            onClick={() => setPreset(pr.key)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              preset === pr.key
                ? "border-sage-deep bg-sage-deep text-paper"
                : "border-line text-ink-soft hover:border-sage"
            }`}
          >
            {pr.label}
          </button>
        ))}
      </div>

      {preset === "custom" && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Field label="UTME weight (%)" value={custom.utme} onChange={(v) => setCustom({ ...custom, utme: v })} />
          <Field label="Post UTME weight (%)" value={custom.post} onChange={(v) => setCustom({ ...custom, post: v })} />
          <Field label="O'Level weight (%)" value={custom.olevel} onChange={(v) => setCustom({ ...custom, olevel: v })} />
        </div>
      )}
      {!weightsOk && (
        <p className="mt-2 text-xs text-ink">
          The three weights must be zero or more and add up to exactly 100.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="UTME score" hint="out of 400" value={utme} onChange={setUtme} />
        {w.post > 0 && (
          <>
            <Field label="Post UTME score" value={post} onChange={setPost} />
            <Field label="Post UTME total marks" hint="usually 100" value={postMax} onChange={setPostMax} />
          </>
        )}
      </div>

      {w.olevel > 0 && (
        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            O&apos;Level grades (five subjects)
          </p>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {grades.map((g, i) => (
              <label key={i} className="block text-xs text-ink-soft">
                Subject {i + 1}
                <select
                  value={g}
                  onChange={(e) =>
                    setGrades((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))
                  }
                  className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                >
                  {GRADE_KEYS.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-soft">
            O&apos;Level points: {oPoints} out of 30. Some schools use a different point scale, so check your school.
          </p>
        </div>
      )}

      <p className="mt-3 text-xs text-ink-soft">
        These are example values. Replace them with your own scores.
      </p>

      <div className="mt-8">
        {!result ? (
          <p className="text-sm text-ink-soft">
            Enter valid scores. UTME must be between 0 and 400, and Post UTME cannot exceed its total.
          </p>
        ) : (
          <>
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Your aggregate</p>
              <p className="mt-1 font-display text-5xl text-ink">{result.aggregate.toFixed(2)}</p>
              <p className="mt-1 text-xs text-ink-soft">Out of 100. Exact: {result.aggregate.toFixed(4)}</p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">UTME {w.utme}%</p>
                <p className="mt-1 font-display text-2xl text-ink">{result.uPart.toFixed(2)}</p>
              </div>
              {w.post > 0 && (
                <div className="rounded-lg border border-line bg-card p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Post UTME {w.post}%</p>
                  <p className="mt-1 font-display text-2xl text-ink">{result.pPart.toFixed(2)}</p>
                </div>
              )}
              {w.olevel > 0 && (
                <div className="rounded-lg border border-line bg-card p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">O&apos;Level {w.olevel}%</p>
                  <p className="mt-1 font-display text-2xl text-ink">{result.oPart.toFixed(2)}</p>
                </div>
              )}
            </div>
            {u < 150 && (
              <p className="mt-3 text-xs text-ink">
                A UTME score below 150 is under the national minimum reported for universities. Check the current JAMB policy.
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          {w.post > 0 ? "What Post UTME score do I need?" : "What UTME score do I need?"}
        </p>
        <div className="mt-3 max-w-xs">
          <Field label="Target aggregate (out of 100)" value={target} onChange={setTarget} />
        </div>
        <div className="mt-4">
          {!reverse ? (
            <p className="text-sm text-ink-soft">
              Enter valid scores and a target between 1 and 100.
            </p>
          ) : reverse.marks > reverse.max ? (
            <p className="text-sm text-ink">
              This target is not reachable. The best possible aggregate with your other scores is {reverse.best.toFixed(2)}.
            </p>
          ) : reverse.marks <= 0 ? (
            <p className="text-sm text-ink">
              Your other scores already cover this target.
            </p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                {reverse.kind === "post" ? "Post UTME score needed" : "UTME score needed"}
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {reverse.marks} out of {reverse.max}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
