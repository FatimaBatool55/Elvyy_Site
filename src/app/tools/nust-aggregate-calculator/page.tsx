"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

function Field({
  label,
  hint,
  value,
  onChange,
  max,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  max?: number;
}) {
  return (
    <label className="block text-xs text-ink-soft">
      {label}
      {hint && <span className="ml-1 text-ink-soft opacity-60">({hint})</span>}
      <input
        type="number"
        inputMode="decimal"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
      />
    </label>
  );
}

function isValid(obtained: number, total: number) {
  return (
    Number.isFinite(obtained) &&
    Number.isFinite(total) &&
    total > 0 &&
    obtained >= 0 &&
    obtained <= total
  );
}

const WEIGHTS = { matric: 0.1, fsc: 0.15, net: 0.75 };

function compute(
  matric: number, matricT: number,
  fsc: number, fscT: number,
  net: number
) {
  const mp = (matric / matricT) * 100;
  const fp = (fsc / fscT) * 100;
  const np = (net / 200) * 100;
  return {
    mp, fp, np,
    pm: mp * WEIGHTS.matric,
    pf: fp * WEIGHTS.fsc,
    pn: np * WEIGHTS.net,
    aggregate: mp * WEIGHTS.matric + fp * WEIGHTS.fsc + np * WEIGHTS.net,
    eligible: mp >= 60 && fp >= 60,
  };
}

const faqs = [
  {
    q: "What is the NUST NET aggregate formula?",
    a: "NUST uses Matric 10 percent, FSc Part I 15 percent and NET 75 percent. The formula is: aggregate = (Matric percent x 0.10) + (FSc percent x 0.15) + (NET score / 200 x 100 x 0.75).",
  },
  {
    q: "Is FSc Part I or Part II used for NUST?",
    a: "NUST uses FSc Part I marks only, because NET sessions run before Part II results are published.",
  },
  {
    q: "What is the minimum eligibility for NUST?",
    a: "You need at least 60 percent in both Matric and FSc to apply. Your aggregate is only ranked if you meet both minimums.",
  },
  {
    q: "How much does one NET mark change the aggregate?",
    a: "One NET mark out of 200 equals 0.375 aggregate points. Ten NET marks add 3.75 points, which is a significant change on a merit list.",
  },
];

export default function NustAggregateCalculator() {
  const [matric, setMatric] = useState("990");
  const [matricT, setMatricT] = useState("1100");
  const [fsc, setFsc] = useState("910");
  const [fscT, setFscT] = useState("1100");
  const [net, setNet] = useState("160");
  const [target, setTarget] = useState("75");

  const mo = num(matric), mt = num(matricT);
  const fo = num(fsc), ft = num(fscT);
  const no = num(net);
  const allValid = isValid(mo, mt) && isValid(fo, ft) && isValid(no, 200);
  const baseValid = isValid(mo, mt) && isValid(fo, ft);

  const result = useMemo(
    () => (allValid ? compute(mo, mt, fo, ft, no) : null),
    [matric, matricT, fsc, fscT, net, allValid]
  );

  const targetNum = num(target);
  const reverse = useMemo(() => {
    if (!baseValid || !Number.isFinite(targetNum) || targetNum <= 0 || targetNum > 100) return null;
    const base = (mo / mt) * 100 * WEIGHTS.matric + (fo / ft) * 100 * WEIGHTS.fsc;
    const needNp = (targetNum - base) / WEIGHTS.net;
    const needMarks = Math.ceil((needNp / 100) * 200 - 1e-9);
    const best = base + WEIGHTS.net * 100;
    return { needMarks, best, impossible: needNp > 100 };
  }, [target, matric, matricT, fsc, fscT, baseValid]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/tools" className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-sage-deep">
        ← All tools
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-sage-deep">Student</p>
      <h1 className="mt-2 font-display text-4xl text-ink">NUST Aggregate Calculator</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Calculate your NUST merit aggregate using the official 10 / 15 / 75 formula. Enter your Matric, FSc Part I and NET scores.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Matric marks obtained" value={matric} onChange={setMatric} />
        <Field label="Matric total marks" hint="usually 1100" value={matricT} onChange={setMatricT} />
        <Field label="FSc Part I marks obtained" value={fsc} onChange={setFsc} />
        <Field label="FSc Part I total marks" hint="usually 1100" value={fscT} onChange={setFscT} />
        <Field label="NET score" hint="out of 200" value={net} onChange={setNet} max={200} />
      </div>
      <p className="mt-2 text-xs text-ink-soft">These are example values. Replace them with your own marks.</p>

      <div className="mt-8">
        {!result ? (
          <p className="text-sm text-ink-soft">Enter all marks. Obtained marks cannot exceed the total.</p>
        ) : (
          <>
            {!result.eligible && (
              <div className="mb-4 rounded-lg border border-line bg-paper-dim p-4 text-sm text-ink">
                NUST requires at least 60 percent in both Matric and FSc to apply. One or both of your results are below this minimum.
              </div>
            )}
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Your aggregate</p>
              <p className="mt-1 font-display text-5xl text-ink">{result.aggregate.toFixed(2)}%</p>
              <p className="mt-1 text-xs text-ink-soft">Exact: {result.aggregate.toFixed(4)}%</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Matric 10%</p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pm.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.mp.toFixed(2)}% scored</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">FSc Part I 15%</p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pf.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.fp.toFixed(2)}% scored</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">NET 75%</p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pn.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.np.toFixed(2)}% scored ({no}/200)</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          What NET score do I need?
        </p>
        <p className="mt-1 text-xs text-ink-soft">Enter your target aggregate and the tool shows the minimum NET marks required out of 200.</p>
        <div className="mt-3 max-w-xs">
          <Field label="Target aggregate (%)" value={target} onChange={setTarget} />
        </div>
        <div className="mt-4">
          {!reverse ? (
            <p className="text-sm text-ink-soft">Fill in Matric and FSc marks and enter a target between 1 and 100.</p>
          ) : reverse.impossible ? (
            <p className="text-sm text-ink">
              This target is not reachable. With a perfect NET score the best possible aggregate is {reverse.best.toFixed(2)}%.
            </p>
          ) : reverse.needMarks <= 0 ? (
            <p className="text-sm text-ink">Your Matric and FSc already cover this target. Any NET score will reach it.</p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">NET marks needed</p>
              <p className="mt-1 font-display text-3xl text-ink">{reverse.needMarks} out of 200</p>
              <p className="mt-1 text-xs text-ink-soft">
                Every 10 NET marks add 3.75 aggregate points.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is the NUST aggregate?</h2>
          <p className="mt-2">The NUST aggregate is a single percentage that determines your position on the merit list for engineering, computing and science programmes at NUST. It combines three results using fixed weights: your Matric score, your FSc Part I score and your NUST Entry Test score.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">The official formula</h2>
          <p className="mt-2">NUST uses these weightages for undergraduate admission. Matric counts for 10 percent. FSc Part I counts for 15 percent. NET counts for 75 percent. The formula is: aggregate = (Matric percent times 0.10) + (FSc percent times 0.15) + (NET percent times 0.75).</p>
          <p className="mt-2">NET is marked out of 200. Your NET percent is your score divided by 200, then multiplied by 100.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example</h2>
          <p className="mt-2">A student scores 990 out of 1100 in Matric, which is 90 percent and contributes 9 points. The same student scores 910 out of 1100 in FSc Part I, which is 82.7 percent and contributes 12.4 points. In NET the student scores 160 out of 200, which is 80 percent and contributes 60 points. The aggregate is 9 plus 12.4 plus 60, which equals 81.4 percent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Why NET dominates the aggregate</h2>
          <p className="mt-2">NET carries 75 percent of the aggregate, which is three times the combined weight of Matric and FSc. Ten extra NET marks add 3.75 aggregate points. That means a student with a modest FSc can still outrank a student with strong boards if their NET score is significantly higher. Improving your NET score is the most effective way to raise your aggregate before results are published.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Eligibility minimums</h2>
          <p className="mt-2">NUST requires a minimum of 60 percent in both Matric and FSc before your aggregate is ranked on the merit list. Scoring below this in either subject means your application will not be considered regardless of your NET score. This calculator flags this if either result is below the threshold.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">FSc Part I only</h2>
          <p className="mt-2">NUST uses FSc Part I marks only. This is because NET sessions run before FSc Part II results are published. If your Part II result is already available, use your Part I marks in this calculator. For A level students, the IBCC equivalence certificate converts your grades to FSc equivalent marks before the formula is applied.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-display text-lg text-ink">{f.q}</h3>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p>
          Also planning for medical admissions?{" "}
          <Link href="/tools/mdcat-aggregate-calculator" className="text-sage-deep hover:underline">
            MDCAT aggregate calculator
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
