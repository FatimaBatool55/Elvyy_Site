"use client";

import { useMemo, useState } from "react";
import {
  PASS_PERCENT,
  computeAggregate,
  isValidScore,
  passMarks,
  requiredMdcat,
  type Formula,
  type Score,
} from "@/lib/mdcat";

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-xs text-ink-soft">
      {label}
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

export default function MdcatAggregateCalculator() {
  const [formula, setFormula] = useState<Formula>("pmdc");
  const [matric, setMatric] = useState("990");
  const [matricTotal, setMatricTotal] = useState("1100");
  const [fsc, setFsc] = useState("935");
  const [fscTotal, setFscTotal] = useState("1100");
  const [mdcat, setMdcat] = useState("144");
  const [mdcatTotal, setMdcatTotal] = useState("180");
  const [target, setTarget] = useState("85");

  const m: Score =
    formula === "federal"
      ? { obtained: 0, total: 1 }
      : { obtained: num(matric), total: num(matricTotal) };
  const f: Score = { obtained: num(fsc), total: num(fscTotal) };
  const t: Score = { obtained: num(mdcat), total: num(mdcatTotal) };

  const baseValid = isValidScore(m) && isValidScore(f) && t.total > 0;
  const allValid = baseValid && isValidScore(t);

  const result = useMemo(
    () => (allValid ? computeAggregate(formula, m, f, t) : null),
    [formula, matric, matricTotal, fsc, fscTotal, mdcat, mdcatTotal, allValid]
  );

  const targetNum = num(target);
  const reverse =
    baseValid && targetNum > 0 && targetNum <= 100
      ? requiredMdcat(formula, targetNum, m, f, t.total)
      : null;

  const mbbsMin = passMarks(t.total || 180, PASS_PERCENT.mbbs);
  const bdsMin = passMarks(t.total || 180, PASS_PERCENT.bds);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["pmdc", "PMDC formula (10 / 40 / 50)"],
            ["federal", "Federal colleges (50 FSc / 50 MDCAT)"],
          ] as [Formula, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFormula(value)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              formula === value
                ? "border-sage-deep bg-sage-deep text-paper"
                : "border-line text-ink-soft hover:border-sage"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {formula === "pmdc" && (
          <>
            <Field label="Matric marks obtained" value={matric} onChange={setMatric} />
            <Field label="Matric total marks" value={matricTotal} onChange={setMatricTotal} />
          </>
        )}
        <Field label="FSc marks obtained" value={fsc} onChange={setFsc} />
        <Field label="FSc total marks" value={fscTotal} onChange={setFscTotal} />
        <Field label="MDCAT marks obtained" value={mdcat} onChange={setMdcat} />
        <Field label="MDCAT total marks" value={mdcatTotal} onChange={setMdcatTotal} />
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        These are example values. Replace them with your own marks.
      </p>

      <div className="mt-8">
        {!result ? (
          <p className="text-sm text-ink-soft">
            Enter all marks. Obtained marks cannot exceed the total.
          </p>
        ) : (
          <>
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Your aggregate
              </p>
              <p className="mt-1 font-display text-5xl text-ink">
                {result.aggregate.toFixed(2)}%
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Exact: {result.aggregate.toFixed(4)}%
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {formula === "pmdc" && (
                <div className="rounded-lg border border-line bg-card p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    Matric 10%
                  </p>
                  <p className="mt-1 font-display text-2xl text-ink">
                    {result.parts.matric.toFixed(2)}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {result.percents.matric.toFixed(2)}% scored
                  </p>
                </div>
              )}
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  FSc {formula === "pmdc" ? "40" : "50"}%
                </p>
                <p className="mt-1 font-display text-2xl text-ink">
                  {result.parts.fsc.toFixed(2)}
                </p>
                <p className="text-xs text-ink-soft">
                  {result.percents.fsc.toFixed(2)}% scored
                </p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  MDCAT 50%
                </p>
                <p className="mt-1 font-display text-2xl text-ink">
                  {result.parts.mdcat.toFixed(2)}
                </p>
                <p className="text-xs text-ink-soft">
                  {result.percents.mdcat.toFixed(2)}% scored
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-line bg-paper-dim p-4 text-sm text-ink">
              <p>
                MBBS pass mark {PASS_PERCENT.mbbs}% = {mbbsMin} marks:{" "}
                <strong>
                  {result.percents.mdcat >= PASS_PERCENT.mbbs
                    ? "Passed"
                    : "Not passed"}
                </strong>
              </p>
              <p className="mt-1">
                BDS pass mark {PASS_PERCENT.bds}% = {bdsMin} marks:{" "}
                <strong>
                  {result.percents.mdcat >= PASS_PERCENT.bds
                    ? "Passed"
                    : "Not passed"}
                </strong>
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          How many MDCAT marks do I need for a target aggregate?
        </p>
        <div className="mt-3 max-w-xs">
          <Field
            label="Target aggregate (%)"
            value={target}
            onChange={setTarget}
          />
        </div>
        <div className="mt-4">
          {!reverse ? (
            <p className="text-sm text-ink-soft">
              Fill in Matric and FSc marks and enter a target between 1 and 100.
            </p>
          ) : reverse.needPercent > 100 ? (
            <p className="text-sm text-ink">
              This target is not reachable. With full MDCAT marks the best
              possible aggregate is {reverse.bestPossible.toFixed(2)}%.
            </p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                MDCAT marks needed
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {Math.max(reverse.marks, mbbsMin)} out of {t.total}
              </p>
              {reverse.marks < mbbsMin && (
                <p className="mt-2 text-xs text-ink-soft">
                  Your Matric and FSc already cover the target, but you must
                  still reach the MBBS pass mark of {mbbsMin} marks.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
