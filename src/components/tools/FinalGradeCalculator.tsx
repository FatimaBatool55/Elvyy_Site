"use client";

import { useMemo, useState } from "react";

type Component = {
  id: string;
  name: string;
  weight: string;
  score: string;
};

let idCounter = 0;
function newId() {
  idCounter += 1;
  return `comp-${idCounter}-${Date.now()}`;
}

function makeComponent(name = "", weight = "", score = ""): Component {
  return { id: newId(), name, weight, score };
}

export default function FinalGradeCalculator() {
  const [components, setComponents] = useState<Component[]>([
    makeComponent("Midterm", "30", "75"),
    makeComponent("Assignments", "20", "90"),
  ]);
  const [finalWeight, setFinalWeight] = useState("50");
  const [targetGrade, setTargetGrade] = useState("85");

  function updateComponent(id: string, field: keyof Component, value: string) {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function addComponent() {
    setComponents((prev) => [...prev, makeComponent()]);
  }

  function removeComponent(id: string) {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  }

  const result = useMemo(() => {
    let completedWeight = 0;
    let weightedScore = 0;
    let hasInvalid = false;

    for (const c of components) {
      const w = parseFloat(c.weight);
      const s = parseFloat(c.score);
      if (c.weight.trim() === "" && c.score.trim() === "") continue;
      if (isNaN(w) || isNaN(s)) {
        hasInvalid = true;
        continue;
      }
      completedWeight += w;
      weightedScore += w * s;
    }

    const fw = parseFloat(finalWeight);
    const target = parseFloat(targetGrade);

    if (isNaN(fw) || isNaN(target) || fw <= 0) {
      return { status: "incomplete" as const };
    }

    const totalWeight = completedWeight + fw;
    const requiredScore =
      (target * totalWeight - weightedScore) / fw;

    return {
      status: "ok" as const,
      totalWeight,
      completedWeight,
      requiredScore,
      hasInvalid,
      currentAverage: completedWeight > 0 ? weightedScore / completedWeight : null,
    };
  }, [components, finalWeight, targetGrade]);

  return (
    <div>
      <p className="max-w-xl text-sm text-ink-soft">
        Enter the grade weights and scores you already have, then the weight
        of what is left, to see exactly what score you need on the
        remaining part of the course.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              <th className="pb-2 pr-3 font-normal">Component (optional)</th>
              <th className="pb-2 pr-3 font-normal">Weight %</th>
              <th className="pb-2 pr-3 font-normal">Score %</th>
              <th className="pb-2 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {components.map((c) => (
              <tr key={c.id} className="border-b border-line">
                <td className="py-2 pr-3">
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) =>
                      updateComponent(c.id, "name", e.target.value)
                    }
                    placeholder="e.g. Midterm"
                    className="w-full rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={c.weight}
                    onChange={(e) =>
                      updateComponent(c.id, "weight", e.target.value)
                    }
                    className="w-24 rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </td>
                <td className="py-2 pr-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={c.score}
                    onChange={(e) =>
                      updateComponent(c.id, "score", e.target.value)
                    }
                    className="w-24 rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                  />
                </td>
                <td className="py-2">
                  <button
                    onClick={() => removeComponent(c.id)}
                    aria-label="Remove component"
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
        onClick={addComponent}
        className="mt-4 font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
      >
        + Add component
      </button>

      <div className="mt-8 grid gap-4 border-t border-line pt-6 sm:grid-cols-2 sm:max-w-md">
        <label className="text-xs text-ink-soft">
          Weight of what&apos;s left (%)
          <input
            type="number"
            min="0"
            max="100"
            value={finalWeight}
            onChange={(e) => setFinalWeight(e.target.value)}
            className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          />
        </label>
        <label className="text-xs text-ink-soft">
          Target overall grade (%)
          <input
            type="number"
            min="0"
            max="100"
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
          />
        </label>
      </div>

      <div className="mt-8">
        {result.status === "incomplete" ? (
          <p className="text-sm text-ink-soft">
            Enter the remaining weight and your target grade to see the
            result.
          </p>
        ) : result.totalWeight > 100.01 || result.totalWeight < 99.99 ? (
          <div className="rounded-lg border border-line bg-card p-6 sm:max-w-md">
            <p className="text-sm text-ink">
              The weights entered add up to {result.totalWeight.toFixed(1)}%,
              not 100%. Adjust the weights so the completed components plus
              what&apos;s left total 100% for an accurate result.
            </p>
          </div>
        ) : result.requiredScore <= 0 ? (
          <div className="rounded-lg border border-line bg-card p-6 sm:max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              Required score
            </p>
            <p className="mt-1 text-sm text-ink">
              Your target is already secured based on what&apos;s completed
              so far. Any score on what&apos;s left will keep you there.
            </p>
          </div>
        ) : result.requiredScore > 100 ? (
          <div className="rounded-lg border border-line bg-card p-6 sm:max-w-md">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              Required score
            </p>
            <p className="mt-1 text-sm text-ink">
              This target isn&apos;t reachable, it would need a score above
              100% on what&apos;s left. Try a lower target grade.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 sm:max-w-md">
            <div className="rounded-lg border border-line bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Score needed
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {result.requiredScore.toFixed(1)}%
              </p>
            </div>
            {result.currentAverage !== null && (
              <div className="rounded-lg border border-line bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Current average
                </p>
                <p className="mt-1 font-display text-3xl text-ink">
                  {result.currentAverage.toFixed(1)}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
