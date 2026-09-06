"use client";

import { useMemo, useState } from "react";

type Task = {
  id: string;
  name: string;
  deadline: string;
  hours: string;
};

let idCounter = 0;
function newId() {
  idCounter += 1;
  return `task-${idCounter}-${Date.now()}`;
}

function makeTask(name = "", deadline = "", hours = ""): Task {
  return { id: newId(), name, deadline, hours };
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function daysBetween(a: Date, b: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const aStart = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bStart = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bStart.getTime() - aStart.getTime()) / msPerDay);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

type DaySchedule = {
  date: Date;
  entries: { taskName: string; hours: number }[];
  total: number;
};

type ScheduleResult = {
  days: DaySchedule[];
  shortfalls: { taskName: string; shortBy: number }[];
} | null;

export default function StudyPlanSpreader() {
  const [dailyCap, setDailyCap] = useState("3");
  const [tasks, setTasks] = useState<Task[]>([
    makeTask("Math assignment", addDays(new Date(), 4).toISOString().split("T")[0], "6"),
    makeTask("History essay", addDays(new Date(), 7).toISOString().split("T")[0], "8"),
    makeTask("Chemistry exam", addDays(new Date(), 10).toISOString().split("T")[0], "12"),
  ]);

  function updateTask(id: string, field: keyof Task, value: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  function addTask() {
    setTasks((prev) => [...prev, makeTask()]);
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const schedule: ScheduleResult = useMemo(() => {
    const cap = parseFloat(dailyCap);
    if (isNaN(cap) || cap <= 0) return null;

    const validTasks = tasks
      .map((t) => {
        const hours = parseFloat(t.hours);
        const deadline = t.deadline ? new Date(t.deadline) : null;
        if (!t.name.trim() && !t.deadline && !t.hours) return null;
        if (!deadline || isNaN(hours) || hours <= 0) return null;
        return {
          id: t.id,
          name: t.name.trim() || "Untitled task",
          deadline,
          remaining: hours,
        };
      })
      .filter((t): t is NonNullable<typeof t> => t !== null);

    if (validTasks.length === 0) return null;

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const latestDeadline = validTasks.reduce(
      (max, t) => (t.deadline > max ? t.deadline : max),
      validTasks[0].deadline
    );
    const totalDays = Math.max(0, daysBetween(start, latestDeadline)) + 1;
    const cappedDays = Math.min(totalDays, 120);

    const days: DaySchedule[] = [];

    for (let i = 0; i < cappedDays; i++) {
      const day = addDays(start, i);
      const active = validTasks.filter(
        (t) => t.remaining > 0.001 && daysBetween(day, t.deadline) >= 0
      );

      if (active.length === 0) {
        days.push({ date: day, entries: [], total: 0 });
        continue;
      }

      const rates = active.map((t) => {
        const daysLeft = daysBetween(day, t.deadline) + 1;
        return { task: t, rate: t.remaining / daysLeft };
      });

      const totalRate = rates.reduce((sum, r) => sum + r.rate, 0);
      const scale = totalRate > cap ? cap / totalRate : 1;

      const entries: { taskName: string; hours: number }[] = [];
      let dayTotal = 0;

      for (const { task, rate } of rates) {
        const alloc = Math.min(rate * scale, task.remaining);
        if (alloc > 0.01) {
          entries.push({ taskName: task.name, hours: alloc });
          task.remaining -= alloc;
          dayTotal += alloc;
        }
      }

      days.push({ date: day, entries, total: dayTotal });
    }

    const shortfalls = validTasks
      .filter((t) => t.remaining > 0.05)
      .map((t) => ({ taskName: t.name, shortBy: t.remaining }));

    return { days: days.filter((d) => d.entries.length > 0), shortfalls };
  }, [tasks, dailyCap]);

  return (
    <div>
      <p className="max-w-xl text-sm text-ink-soft">
        Add each assignment or exam with its deadline and how many hours it
        will realistically take. The schedule below spreads the work evenly
        so no single day gets overloaded.
      </p>

      <div className="mt-6">
        <label className="text-xs text-ink-soft">
          Study hours available per day
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={dailyCap}
            onChange={(e) => setDailyCap(e.target.value)}
            className="mt-1 block w-32 rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          />
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              <th className="pb-2 pr-3 font-normal">Task</th>
              <th className="pb-2 pr-3 font-normal">Deadline</th>
              <th className="pb-2 pr-3 font-normal">Estimated hours</th>
              <th className="pb-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-b border-line">
                <td className="py-2 pr-3">
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => updateTask(t.id, "name", e.target.value)}
                    placeholder="e.g. Physics report"
                    className="w-full rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    type="date"
                    min={todayISO()}
                    value={t.deadline}
                    onChange={(e) =>
                      updateTask(t.id, "deadline", e.target.value)
                    }
                    className="rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={t.hours}
                    onChange={(e) => updateTask(t.id, "hours", e.target.value)}
                    className="w-24 rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </td>
                <td className="py-2">
                  <button
                    onClick={() => removeTask(t.id)}
                    aria-label="Remove task"
                    className="text-ink-soft hover:text-ink transition-colors"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addTask}
        className="mt-4 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
      >
        + Add task
      </button>

      <div className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Your schedule
        </p>

        {!schedule || schedule.days.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">
            Add at least one task with a deadline and estimated hours to see
            your schedule.
          </p>
        ) : (
          <>
            {schedule.shortfalls.length > 0 && (
              <div className="mt-4 rounded-lg border border-line bg-paper-dim p-4">
                <p className="text-sm text-ink">
                  With {dailyCap} hours a day, there isn&apos;t enough time
                  to finish everything before its deadline:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                  {schedule.shortfalls.map((s, i) => (
                    <li key={i}>
                      {s.taskName}: short by {s.shortBy.toFixed(1)} hours
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-ink-soft">
                  Consider increasing daily hours, moving a deadline, or
                  reducing scope.
                </p>
              </div>
            )}

            <div className="mt-4 divide-y divide-line border-t border-line">
              {schedule.days.map((day, i) => (
                <div key={i} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4">
                  <p className="w-32 shrink-0 font-mono text-xs text-ink-soft">
                    {formatDate(day.date)}
                  </p>
                  <div className="flex-1 space-y-1">
                    {day.entries.map((e, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-ink">{e.taskName}</span>
                        <span className="font-mono text-ink-soft">
                          {e.hours.toFixed(1)}h
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="shrink-0 font-mono text-xs text-sage-deep">
                    {day.total.toFixed(1)}h total
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
