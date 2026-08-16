"use client";

import { useMemo, useState } from "react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => {
    if (!birthDate) return null;
    const start = new Date(birthDate);
    const now = new Date();
    if (isNaN(start.getTime()) || start > now) return null;

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const nextBirthday = new Date(
      now.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    if (nextBirthday < now) {
      nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysToNext = Math.ceil(
      (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const totalDays = Math.floor(
      (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return { years, months, days, daysToNext, totalDays };
  }, [birthDate]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <div>
        <label className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Date of birth
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="mt-2 w-full rounded-lg border border-line bg-card p-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
        />
      </div>
      <div>
        {result ? (
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Years" value={result.years} />
            <MiniStat label="Months" value={result.months} />
            <MiniStat label="Days" value={result.days} />
            <div className="col-span-3 rounded-lg border border-line bg-card p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Next birthday
              </p>
              <p className="mt-1 font-display text-xl text-ink">
                in {result.daysToNext} days
              </p>
            </div>
            <div className="col-span-3 rounded-lg border border-line bg-card p-4">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Total days lived
              </p>
              <p className="mt-1 font-display text-xl text-ink">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-line p-8 text-center text-sm text-ink-soft">
            Pick a date of birth to see the breakdown.
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-line bg-card p-4 text-center">
      <p className="font-display text-2xl text-ink">{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
        {label}
      </p>
    </div>
  );
}
