"use client";

import { useEffect, useState } from "react";

const DAYS = [
  { label: "Mon", idx: 1 },
  { label: "Tue", idx: 2 },
  { label: "Wed", idx: 3 },
  { label: "Thu", idx: 4 },
  { label: "Fri", idx: 5 },
  { label: "Sat", idx: 6 },
  { label: "Sun", idx: 0 },
];

const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

function parseISO(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function toISO(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

const fmt = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
const fmtShort = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

// Date of the Nth reading day, counting from the start date (the start day counts if it is a reading day)
function dateOfReadingDay(start: Date, n: number, days: boolean[]) {
  if (!days.some(Boolean) || n <= 0) return null;
  let count = 0;
  for (let i = 0; i < 3660; i++) {
    const d = addDays(start, i);
    if (days[d.getDay()]) {
      count++;
      if (count === n) return { date: d, calendarDays: i + 1 };
    }
  }
  return null;
}

function countReadingDays(start: Date, end: Date, days: boolean[]) {
  const diff = Math.round((end.getTime() - start.getTime()) / 86400000);
  if (diff < 0) return 0;
  let count = 0;
  for (let i = 0; i <= Math.min(diff, 3660); i++) {
    if (days[addDays(start, i).getDay()]) count++;
  }
  return count;
}

const inputCls =
  "w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage";

function Field({
  label,
  value,
  onChange,
  type = "number",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-xs text-ink-soft">
      {label}
      <input
        type={type}
        inputMode={type === "number" ? "decimal" : undefined}
        min={type === "number" ? "0" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} mt-1`}
      />
    </label>
  );
}

export default function BookFinishCalculator() {
  const [total, setTotal] = useState("320");
  const [current, setCurrent] = useState("40");
  const [mode, setMode] = useState<"pages" | "pace">("pages");
  const [perDay, setPerDay] = useState("20");
  const [pph, setPph] = useState("30");
  const [minutes, setMinutes] = useState("45");
  const [start, setStart] = useState("");
  const [target, setTarget] = useState("");
  const [days, setDays] = useState<boolean[]>([true, true, true, true, true, true, true]);

  useEffect(() => {
    const t = new Date();
    const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    setStart(toISO(today));
    setTarget(toISO(addDays(today, 30)));
  }, []);

  const tp = num(total);
  const cp = num(current);
  const inputsOk = Number.isInteger(tp) && tp > 0 && Number.isInteger(cp) && cp >= 0 && cp <= tp;
  const remaining = inputsOk ? tp - cp : 0;

  const pagesPerDay = mode === "pages" ? num(perDay) : (num(pph) * num(minutes)) / 60;
  const speedOk = Number.isFinite(pagesPerDay) && pagesPerDay > 0;
  const startDate = parseISO(start);
  const targetDate = parseISO(target);
  const anyDay = days.some(Boolean);

  const main =
    inputsOk && speedOk && startDate && anyDay && remaining > 0
      ? (() => {
          const needed = Math.ceil(remaining / pagesPerDay - 1e-9);
          const r = dateOfReadingDay(startDate, needed, days);
          const milestones = [25, 50, 75, 100].map((p) => {
            const pagesAt = Math.ceil((tp * p) / 100);
            if (pagesAt <= cp) return { p, pagesAt, date: null as Date | null, done: true };
            const n = Math.ceil((pagesAt - cp) / pagesPerDay - 1e-9);
            return { p, pagesAt, date: dateOfReadingDay(startDate, n, days)?.date ?? null, done: false };
          });
          return { needed, r, milestones };
        })()
      : null;

  const hoursLeft = mode === "pace" && num(pph) > 0 ? remaining / num(pph) : null;

  let reverse:
    | { error: string }
    | { readingDays: number; perDay: number; minutes: number | null }
    | null = null;
  if (inputsOk && remaining > 0 && startDate && targetDate && anyDay) {
    if (targetDate < startDate) {
      reverse = { error: "The finish date must be on or after the start date." };
    } else {
      const rd = countReadingDays(startDate, targetDate, days);
      if (rd === 0) {
        reverse = { error: "None of your chosen reading days fall between these dates." };
      } else {
        const need = remaining / rd;
        reverse = {
          readingDays: rd,
          perDay: need,
          minutes: num(pph) > 0 ? (need / num(pph)) * 60 : null,
        };
      }
    }
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Total pages in the book" value={total} onChange={setTotal} />
        <Field label="Pages you have already read" value={current} onChange={setCurrent} />
        <Field label="Start date" type="date" value={start} onChange={setStart} />
      </div>
      {!inputsOk && (
        <p className="mt-2 text-xs text-ink">Enter whole numbers. Pages read cannot be more than the total.</p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["pages", "I know my pages per day"],
            ["pace", "I know my reading pace"],
          ] as ["pages" | "pace", string][]
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

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {mode === "pages" ? (
          <Field label="Pages you read per day" value={perDay} onChange={setPerDay} />
        ) : (
          <>
            <Field label="Pages per hour" value={pph} onChange={setPph} />
            <Field label="Minutes you read per day" value={minutes} onChange={setMinutes} />
            <div className="text-xs text-ink-soft">
              That is about {speedOk ? pagesPerDay.toFixed(1) : "0"} pages per day.
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Days you read</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <button
              key={d.label}
              onClick={() => setDays((prev) => prev.map((v, i) => (i === d.idx ? !v : v)))}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
                days[d.idx]
                  ? "border-sage-deep bg-sage-deep text-paper"
                  : "border-line text-ink-soft hover:border-sage"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        {!anyDay && <p className="mt-2 text-xs text-ink">Pick at least one reading day.</p>}
      </div>
      <p className="mt-3 text-xs text-ink-soft">These are example numbers. Replace them with your own.</p>

      <div className="mt-8">
        {inputsOk && remaining === 0 ? (
          <div className="rounded-lg border border-line bg-card p-6 text-sm text-ink">
            You have already finished this book. Pick your next one.
          </div>
        ) : !main || !main.r ? (
          <p className="text-sm text-ink-soft">
            Enter your pages and reading speed to see your finish date.
          </p>
        ) : (
          <>
            <div className="rounded-lg border border-line bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">You will finish on</p>
              <p className="mt-1 font-display text-3xl text-ink sm:text-4xl">{fmt(main.r.date)}</p>
              <p className="mt-2 text-sm text-ink-soft">
                {main.needed} reading {main.needed === 1 ? "day" : "days"}, which is {main.r.calendarDays} calendar{" "}
                {main.r.calendarDays === 1 ? "day" : "days"} from your start date.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Pages left</p>
                <p className="mt-1 font-display text-2xl text-ink">{remaining}</p>
                <p className="text-xs text-ink-soft">{Math.round((cp / tp) * 100)}% already read</p>
              </div>
              <div className="rounded-lg border border-line bg-card p-4">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Pages per day</p>
                <p className="mt-1 font-display text-2xl text-ink">{pagesPerDay.toFixed(1)}</p>
              </div>
              {hoursLeft !== null && (
                <div className="rounded-lg border border-line bg-card p-4">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Reading time left</p>
                  <p className="mt-1 font-display text-2xl text-ink">{hoursLeft.toFixed(1)} hours</p>
                </div>
              )}
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[360px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    <th className="pb-2 pr-3 font-normal">Milestone</th>
                    <th className="pb-2 pr-3 font-normal">Page</th>
                    <th className="pb-2 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {main.milestones.map((m) => (
                    <tr key={m.p} className="border-b border-line">
                      <td className="py-2 pr-3 text-ink">{m.p}%</td>
                      <td className="py-2 pr-3 text-ink">{m.pagesAt}</td>
                      <td className="py-2 text-ink-soft">{m.done ? "Already passed" : m.date ? fmtShort(m.date) : "Too far ahead"}</td>
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
          I want to finish by a certain date
        </p>
        <div className="mt-3 grid max-w-xl gap-4 sm:grid-cols-2">
          <Field label="Finish by" type="date" value={target} onChange={setTarget} />
          {mode === "pages" && <Field label="Your pace, pages per hour (optional)" value={pph} onChange={setPph} />}
        </div>
        <div className="mt-4">
          {remaining === 0 && inputsOk ? (
            <p className="text-sm text-ink">You have already finished this book.</p>
          ) : !reverse ? (
            <p className="text-sm text-ink-soft">Fill in the book details, a start date and a finish date.</p>
          ) : "error" in reverse ? (
            <p className="text-sm text-ink">{reverse.error}</p>
          ) : (
            <div className="rounded-lg border border-line bg-card p-5 sm:max-w-md">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">You need to read</p>
              <p className="mt-1 font-display text-3xl text-ink">{Math.ceil(reverse.perDay - 1e-9)} pages a day</p>
              <p className="mt-1 text-xs text-ink-soft">
                Over {reverse.readingDays} reading {reverse.readingDays === 1 ? "day" : "days"}
                {reverse.minutes !== null && `, which is about ${Math.ceil(reverse.minutes - 1e-9)} minutes a day at your pace`}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
