"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Program = "cs" | "eng";

const WEIGHTS: Record<Program, { matric: number; fsc: number; test: number }> = {
  cs:  { matric: 0.10, fsc: 0.40, test: 0.50 },
  eng: { matric: 0.17, fsc: 0.50, test: 0.33 },
};

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

const faqs = [
  {
    q: "What is the FAST aggregate formula for CS and BBA?",
    a: "For CS, SE, AI, Data Science, BBA and related programs, FAST uses 10 percent Matric, 40 percent FSc and 50 percent entry test score out of 100.",
  },
  {
    q: "What is the FAST aggregate formula for Engineering?",
    a: "For BE programs such as Electrical Engineering and Civil Engineering, FAST uses 17 percent Matric, 50 percent FSc and 33 percent entry test.",
  },
  {
    q: "Which entry tests does FAST accept?",
    a: "FAST accepts its own NU Entry Test, NTS NAT and SAT. Each is converted to the same 100 mark scale before the formula is applied. ECAT is accepted for some engineering programs.",
  },
  {
    q: "Is there negative marking in the FAST entry test?",
    a: "Yes. The FAST NU test has negative marking of 0.25 marks per wrong answer. Skipping a question is safer than guessing randomly.",
  },
];

export default function FastAggregateCalculator() {
  const [program, setProgram] = useState<Program>("cs");
  const [matric, setMatric]   = useState("990");
  const [matricT, setMatricT] = useState("1100");
  const [fsc, setFsc]         = useState("935");
  const [fscT, setFscT]       = useState("1100");
  const [test, setTest]       = useState("75");
  const [target, setTarget]   = useState("80");

  const mo = num(matric), mt = num(matricT);
  const fo = num(fsc),    ft = num(fscT);
  const to = num(test);

  const w = WEIGHTS[program];
  const allValid  = isValid(mo, mt) && isValid(fo, ft) && isValid(to, 100);
  const baseValid = isValid(mo, mt) && isValid(fo, ft);

  const result = useMemo(() => {
    if (!allValid) return null;
    const mp = (mo / mt) * 100;
    const fp = (fo / ft) * 100;
    const tp = to;
    return {
      mp, fp, tp,
      pm: mp * w.matric,
      pf: fp * w.fsc,
      pt: tp * w.test,
      aggregate: mp * w.matric + fp * w.fsc + tp * w.test,
    };
  }, [matric, matricT, fsc, fscT, test, program, allValid]);

  const targetNum = num(target);
  const reverse = useMemo(() => {
    if (!baseValid || !Number.isFinite(targetNum) || targetNum <= 0 || targetNum > 100) return null;
    const base = (mo / mt) * 100 * w.matric + (fo / ft) * 100 * w.fsc;
    const needTp = (targetNum - base) / w.test;
    const best   = base + w.test * 100;
    return { needTp, needScore: Math.ceil(needTp - 1e-9), best, impossible: needTp > 100 };
  }, [target, matric, matricT, fsc, fscT, program, baseValid]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/tools" className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-sage-deep">
        ← All tools
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-sage-deep">Student</p>
      <h1 className="mt-2 font-display text-4xl text-ink">FAST Aggregate Calculator</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Calculate your FAST NUCES merit aggregate for CS, Engineering and BBA programs using the official formula. Switch between program types to get the correct weightage.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["cs",  "CS / BBA / SE / AI (10 / 40 / 50)"],
            ["eng", "Engineering BE (17 / 50 / 33)"],
          ] as [Program, string][]
        ).map(([val, label]) => (
          <button
            key={val}
            onClick={() => setProgram(val)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              program === val
                ? "border-sage-deep bg-sage-deep text-paper"
                : "border-line text-ink-soft hover:border-sage"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Matric marks obtained"  value={matric} onChange={setMatric} />
        <Field label="Matric total marks" hint="usually 1100" value={matricT} onChange={setMatricT} />
        <Field label="FSc marks obtained"     value={fsc}    onChange={setFsc} />
        <Field label="FSc total marks" hint="usually 1100"   value={fscT}   onChange={setFscT} />
        <Field label="Entry test score" hint="out of 100"    value={test}   onChange={setTest} max={100} />
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

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Matric {Math.round(w.matric * 100)}%
                </p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pm.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.mp.toFixed(2)}% scored</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  FSc {Math.round(w.fsc * 100)}%
                </p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pf.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.fp.toFixed(2)}% scored</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Entry Test {Math.round(w.test * 100)}%
                </p>
                <p className="mt-1 font-display text-2xl text-ink">{result.pt.toFixed(2)}</p>
                <p className="text-xs text-ink-soft">{result.tp.toFixed(2)}% scored ({to}/100)</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          What entry test score do I need?
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Enter your target aggregate and see the minimum entry test score required out of 100.
        </p>
        <div className="mt-3 max-w-xs">
          <Field label="Target aggregate (%)" value={target} onChange={setTarget} />
        </div>
        <div className="mt-4">
          {!reverse ? (
            <p className="text-sm text-ink-soft">
              Fill in Matric and FSc marks and enter a target between 1 and 100.
            </p>
          ) : reverse.impossible ? (
            <p className="text-sm text-ink">
              Not reachable. With a perfect entry test score the best possible aggregate is {reverse.best.toFixed(2)}%.
            </p>
          ) : reverse.needScore <= 0 ? (
            <p className="text-sm text-ink">
              Your Matric and FSc already cover this target. Any entry test score will reach it.
            </p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Entry test score needed
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {reverse.needScore} out of 100
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Every 10 marks in the entry test add{" "}
                {(w.test * 10).toFixed(1)} aggregate points.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is the FAST aggregate?</h2>
          <p className="mt-2">The FAST aggregate is the merit percentage FAST NUCES uses to rank applicants for undergraduate programs. It combines your Matric result, your FSc result and your entry test score. Seats are offered from the highest aggregate downward until each program is full.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Formula for CS, SE, AI, BBA and related programs</h2>
          <p className="mt-2">For computing and business programs, FAST uses 10 percent Matric, 40 percent FSc and 50 percent entry test. The formula is: aggregate = (Matric percent times 0.10) + (FSc percent times 0.40) + (entry test score times 0.50). The entry test is marked out of 100, so the score you enter is already a percentage.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Formula for BE Engineering programs</h2>
          <p className="mt-2">For Electrical Engineering, Civil Engineering and other BE programs, FAST shifts the weightage toward FSc. The formula becomes 17 percent Matric, 50 percent FSc and 33 percent entry test. This means strong FSc marks carry more weight for engineering applicants than for computing applicants. Switch to the engineering tab above to see your correct aggregate.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example for CS</h2>
          <p className="mt-2">A student scores 990 out of 1100 in Matric, which is 90 percent and contributes 9 points. The same student scores 935 out of 1100 in FSc, which is 85 percent and contributes 34 points. In the entry test the student scores 75 out of 100, contributing 37.5 points. The aggregate is 9 plus 34 plus 37.5 which equals 80.5 percent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Entry tests FAST accepts</h2>
          <p className="mt-2">FAST accepts three entry tests. The first is the NU Entry Test, which FAST conducts itself. The second is NTS NAT. The third is SAT, which is accepted for some programs and converted to the same scale. FAST usually publishes separate merit lists for each test. If you only appeared in NET for NUST, that score does not count for FAST and you need to sit the NU test or NAT separately.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Negative marking in the FAST entry test</h2>
          <p className="mt-2">The FAST NU test has negative marking. Each wrong answer deducts 0.25 marks from your score. That means four wrong answers cancel one correct answer. Leaving a question blank costs nothing, so skipping questions you are unsure of is usually a safer strategy than guessing randomly.</p>
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
          Also preparing for NUST?{" "}
          <Link href="/tools/nust-aggregate-calculator" className="text-sage-deep hover:underline">
            NUST aggregate calculator
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
