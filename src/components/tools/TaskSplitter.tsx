"use client";

import { useMemo, useState } from "react";

type Member = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  name: string;
  effort: string;
};

let idCounter = 0;
function newId(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Date.now()}`;
}

function makeMember(name = ""): Member {
  return { id: newId("member"), name };
}

function makeTask(name = "", effort = ""): Task {
  return { id: newId("task"), name, effort };
}

type Assignment = {
  member: Member;
  tasks: { name: string; effort: number }[];
  total: number;
};

export default function TaskSplitter() {
  const [members, setMembers] = useState<Member[]>([
    makeMember("Alex"),
    makeMember("Sam"),
    makeMember("Jordan"),
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    makeTask("Research", "8"),
    makeTask("Write intro section", "5"),
    makeTask("Write analysis section", "9"),
    makeTask("Design slides", "6"),
    makeTask("Proofread & edit", "4"),
    makeTask("Presentation prep", "7"),
  ]);

  function updateMember(id: string, name: string) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, name } : m)));
  }
  function addMember() {
    setMembers((prev) => [...prev, makeMember()]);
  }
  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

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

  const result = useMemo(() => {
    const validMembers = members.filter((m) => m.name.trim());
    const validTasks = tasks
      .map((t) => ({
        name: t.name.trim(),
        effort: parseFloat(t.effort),
      }))
      .filter((t) => t.name && !isNaN(t.effort) && t.effort > 0);

    if (validMembers.length === 0 || validTasks.length === 0) return null;

    const sortedTasks = [...validTasks].sort((a, b) => b.effort - a.effort);

    const assignments: Assignment[] = validMembers.map((m) => ({
      member: m,
      tasks: [],
      total: 0,
    }));

    for (const task of sortedTasks) {
      const lightest = assignments.reduce((min, a) =>
        a.total < min.total ? a : min
      );
      lightest.tasks.push(task);
      lightest.total += task.effort;
    }

    const totals = assignments.map((a) => a.total);
    const max = Math.max(...totals);
    const min = Math.min(...totals);
    const avg = totals.reduce((s, v) => s + v, 0) / totals.length;
    const imbalance = avg > 0 ? (max - min) / avg : 0;

    return { assignments, max, min, avg, imbalance };
  }, [members, tasks]);

  return (
    <div>
      <p className="max-w-xl text-sm text-ink-soft">
        List your group members and the tasks with a rough effort score for
        each (like 1 to 10, or estimated hours). The split below balances
        total effort as evenly as possible across the group.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Group members
          </p>
          <div className="mt-3 space-y-2">
            {members.map((m) => (
              <div key={m.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={m.name}
                  onChange={(e) => updateMember(m.id, e.target.value)}
                  placeholder="Member name"
                  className="flex-1 rounded border border-line bg-card px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                />
                <button
                  onClick={() => removeMember(m.id)}
                  aria-label="Remove member"
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addMember}
            className="mt-3 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
          >
            + Add member
          </button>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Tasks
          </p>
          <div className="mt-3 space-y-2">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={t.name}
                  onChange={(e) => updateTask(t.id, "name", e.target.value)}
                  placeholder="Task name"
                  className="flex-1 rounded border border-line bg-card px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                />
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={t.effort}
                  onChange={(e) => updateTask(t.id, "effort", e.target.value)}
                  placeholder="Effort"
                  className="w-20 rounded border border-line bg-card px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                />
                <button
                  onClick={() => removeTask(t.id)}
                  aria-label="Remove task"
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addTask}
            className="mt-3 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
          >
            + Add task
          </button>
        </div>
      </div>

      <div className="mt-10">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Suggested split
        </p>

        {!result ? (
          <p className="mt-3 text-sm text-ink-soft">
            Add at least one member and one task with an effort score to see
            a split.
          </p>
        ) : (
          <>
            {result.imbalance > 0.25 && (
              <div className="mt-4 rounded-lg border border-line bg-paper-dim p-4">
                <p className="text-sm text-ink">
                  This split is uneven, the heaviest load (
                  {result.max.toFixed(1)}) is more than 25% above the
                  lightest ({result.min.toFixed(1)}). Consider breaking up
                  the largest tasks into smaller pieces, or adjusting effort
                  scores if they don&apos;t feel accurate.
                </p>
              </div>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {result.assignments.map((a) => (
                <div
                  key={a.member.id}
                  className="rounded-lg border border-line bg-card p-5"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-lg text-ink">
                      {a.member.name}
                    </p>
                    <p className="font-mono text-xs text-sage-deep">
                      {a.total.toFixed(1)} total
                    </p>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {a.tasks.map((t, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-ink-soft">{t.name}</span>
                        <span className="font-mono text-xs text-ink-soft">
                          {t.effort}
                        </span>
                      </li>
                    ))}
                    {a.tasks.length === 0 && (
                      <li className="text-sm text-ink-soft">
                        No tasks assigned
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
