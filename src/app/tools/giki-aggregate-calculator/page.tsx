"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

function isValid(o: number, t: number) {
  return Number.isFinite(o) && Number.isFinite(t) && t > 0 && o >= 0 && o <= t;
}

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
      {hint && <span className="ml-1 opacity-60">({hint})</span>}
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

const MATRIC_W = 0.15;
const TEST_W   = 0.85;
const TEST_MAX = 200;

const faqs = [
  {
    q: "What is the GIKI aggregate formula?",
    a: "GIKI uses 15 percent from Matric and 85 percent from the GIKI entry test. FSc marks are not part of the merit formula. The entry test is out of 200 marks.",
  },
  {
    q: "Is FSc included in the GIKI aggregate?",
    a: "No. Unlike most engineering universities in Pakistan, GIKI does not include FSc marks in its merit formula. Only Matric and the entry test score count.",
  },
  {
    q: "Is there negative marking in the GIKI test?",
    a: "No. The GIKI entry test has no negative marking. You can attempt all 80 questions without penalty for wrong answers.",
  },
  {
    q: "How much does one GIKI test mark change my aggregate?",
    a: "One mark out of 200 in the GIKI test adds 0.425 aggregate points. Ten marks add 4.25 points, which is a large shift on a competitive merit list.",
  },
  {
    q: "Does GIKI accept ECAT?",
    a: "GIKI conducts its own entry test. While ECAT preparation covers overlapping content in Mathematics and Physics, GIKI does not use ECAT scores directly for merit. Check the official GIKI admissions portal for the current policy.",
  },
];

export default function GikiAggregateCalculator() {
  const [matric, setMatric]   = useState("990");
  const [matricT, setMatricT] = useState("1100");
  const [test, setTest]       = useState("160");
  const [target, setTarget]   = useState("80");

  const mo = num(matric), mt = num(matricT);
  const to = num(test);

  const allValid  = isValid(mo, mt) && isValid(to, TEST_MAX);
  const baseValid = isValid(mo, mt);

  const result = useMemo(() => {
    if (!allValid) return null;
    const mp = (mo / mt) * 100;
    const tp = (to / TEST_MAX) * 100;
    return {
      mp, tp,
      pm: mp * MATRIC_W,
      pt: tp * TEST_W,
      aggregate: mp * MATRIC_W + tp * TEST_W,
    };
  }, [matric, matricT, test, allValid]);

  const targetNum = num(target);
  const reverse = useMemo(() => {
    if (!baseValid || !Number.isFinite(targetNum) || targetNum <= 0 || targetNum > 100) return null;
    const base     = (mo / mt) * 100 * MATRIC_W;
    const needTp   = (targetNum - base) / TEST_W;
    const needMarks = Math.ceil((needTp / 100) * TEST_MAX - 1e-9);
    const best      = base + TEST_W * 100;
    return { needMarks, best, impossible: needTp > 100 };
  }, [target, matric, matricT, baseValid]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/tools" className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-sage-deep">
        ← All tools
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-sage-deep">Student</p>
      <h1 className="mt-2 font-display text-4xl text-ink">GIKI Aggregate Calculator</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Calculate your GIKI merit aggregate using the official 15% Matric and 85% entry test formula. FSc marks are not part of the GIKI formula.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Matric marks obtained"  value={matric} onChange={setMatric} />
        <Field label="Matric total marks" hint="usually 1100" value={matricT} onChange={setMatricT} />
        <Field label="GIKI test score" hint="out of 200" value={test} onChange={setTest} max={TEST_MAX} />
      </div>
      <p className="mt-2 text-xs text-ink-soft">These are example values. Replace them with your own marks.</p>

      <div className="mt-8">
        {!result ? (
          <p className="text-sm text-ink-soft">Enter all marks. Obtained marks cannot exceed the total.</p>
        ) : (
          <>
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Your aggregate</p>
              <p className="mt-1 font-display text-5xl text-ink">{result.aggregate.toFixed(2)}%</p>
              <p className="mt-1 text-xs text-ink-soft">Exact: {result.aggregate.toFixed(4)}%</p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Matric 15%</p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pm.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.mp.toFixed(2)}% scored</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Entry Test 85%</p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pt.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.tp.toFixed(2)}% scored ({to}/200)</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          What test score do I need?
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Enter your target aggregate and see the minimum GIKI test marks required out of 200.
        </p>
        <div className="mt-3 max-w-xs">
          <Field label="Target aggregate (%)" value={target} onChange={setTarget} />
        </div>
        <div className="mt-4">
          {!reverse ? (
            <p className="text-sm text-ink-soft">Fill in your Matric marks and enter a target between 1 and 100.</p>
          ) : reverse.impossible ? (
            <p className="text-sm text-ink">
              Not reachable. With a perfect test score the best possible aggregate is {reverse.best.toFixed(2)}%.
            </p>
          ) : reverse.needMarks <= 0 ? (
            <p className="text-sm text-ink">Your Matric marks already cover this target.</p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Test marks needed</p>
              <p className="mt-1 font-display text-3xl text-ink">{reverse.needMarks} out of 200</p>
              <p className="mt-1 text-xs text-ink-soft">
                Every 10 test marks add {(TEST_W * 10 / TEST_MAX * 100).toFixed(2)} aggregate points.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is the GIKI aggregate?</h2>
          <p className="mt-2">The GIKI aggregate is the merit percentage that Ghulam Ishaq Khan Institute uses to rank applicants for BS Engineering and Computing programs. Unlike most Pakistani engineering universities, GIKI does not include FSc marks in its formula. Only two things count: your Matric result and your score in the GIKI entry test.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">The official formula</h2>
          <p className="mt-2">GIKI uses 15 percent from Matric and 85 percent from the entry test. The formula is: aggregate = (Matric percent times 0.15) + (entry test percent times 0.85). The entry test is out of 200 marks, so your test percent is your score divided by 200 then multiplied by 100.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example</h2>
          <p className="mt-2">A student scores 990 out of 1100 in Matric, which is 90 percent and contributes 13.5 aggregate points. In the GIKI test the same student scores 160 out of 200, which is 80 percent and contributes 68 points. The total aggregate is 13.5 plus 68, which equals 81.5 percent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Why the entry test dominates</h2>
          <p className="mt-2">The entry test carries 85 percent of the aggregate, which is the highest test weighting among major Pakistani engineering universities. FSc marks play no role at all. This means a student with average board results can still secure a high merit position with a strong test performance. One mark out of 200 in the test adds 0.425 aggregate points. Ten marks add 4.25 points, which is a large change on a competitive merit list.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">The GIKI entry test format</h2>
          <p className="mt-2">The test has 80 multiple choice questions and runs for 120 minutes. Questions cover Mathematics with 30 MCQs, Physics with 30 MCQs, and English with 20 MCQs. The total is out of 200 marks. There is no negative marking, so you can attempt every question without penalty for a wrong answer. Shortlisted candidates are called for an interview before final admission is confirmed.</p>
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
          Also applying to NUST or FAST?{" "}
          <Link href="/tools/nust-aggregate-calculator" className="text-sage-deep hover:underline">
            NUST aggregate calculator
          </Link>{" "}
          and{" "}
          <Link href="/tools/fast-aggregate-calculator" className="text-sage-deep hover:underline">
            FAST aggregate calculator
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
