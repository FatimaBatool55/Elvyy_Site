"use client";

import { useMemo, useState } from "react";

type Course = {
  id: string;
  name: string;
  credits: string;
  grade: string;
};

type GradeScale = Record<string, number>;

const defaultScale: GradeScale = {
  "A+": 4.3,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

const ignoredGrades = ["P", "NP", "I", "W"];
const gradeOptions = [...Object.keys(defaultScale), ...ignoredGrades];

let idCounter = 0;
function newId() {
  idCounter += 1;
  return `course-${idCounter}-${Date.now()}`;
}

function makeCourse(name = "", credits = "3", grade = "A"): Course {
  return { id: newId(), name, credits, grade };
}

export default function GpaCalculator() {
  const [mode, setMode] = useState<"calculate" | "plan">("calculate");
  const [courses, setCourses] = useState<Course[]>([
    makeCourse("Math", "3", "A"),
    makeCourse("English", "3", "B+"),
    makeCourse("History", "2", "A-"),
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [scale, setScale] = useState<GradeScale>(defaultScale);
  const [includePast, setIncludePast] = useState(false);
  const [pastGpa, setPastGpa] = useState("3.2");
  const [pastCredits, setPastCredits] = useState("30");

  const [planCurrentGpa, setPlanCurrentGpa] = useState("2.8");
  const [planTargetGpa, setPlanTargetGpa] = useState("3.0");
  const [planCurrentCredits, setPlanCurrentCredits] = useState("25");
  const [planAdditionalCredits, setPlanAdditionalCredits] = useState("15");

  function updateCourse(id: string, field: keyof Course, value: string) {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  function addCourse() {
    setCourses((prev) => [...prev, makeCourse()]);
  }

  function removeCourse(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  const result = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    let countedCourses = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      if (isNaN(credits) || credits <= 0) continue;
      if (ignoredGrades.includes(course.grade)) continue;

      const points = scale[course.grade];
      if (points === undefined) continue;

      totalPoints += points * credits;
      totalCredits += credits;
      countedCourses += 1;
    }

    if (includePast) {
      const pGpa = parseFloat(pastGpa);
      const pCredits = parseFloat(pastCredits);
      if (!isNaN(pGpa) && !isNaN(pCredits) && pCredits > 0) {
        totalPoints += pGpa * pCredits;
        totalCredits += pCredits;
      }
    }

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    return { gpa, totalCredits, countedCourses };
  }, [courses, scale, includePast, pastGpa, pastCredits]);

  const planResult = useMemo(() => {
    const current = parseFloat(planCurrentGpa);
    const target = parseFloat(planTargetGpa);
    const currentCredits = parseFloat(planCurrentCredits);
    const additionalCredits = parseFloat(planAdditionalCredits);

    if (
      isNaN(current) ||
      isNaN(target) ||
      isNaN(currentCredits) ||
      isNaN(additionalCredits) ||
      currentCredits <= 0 ||
      additionalCredits <= 0
    ) {
      return null;
    }

    const requiredGpa =
      (target * (currentCredits + additionalCredits) - current * currentCredits) /
      additionalCredits;

    return { requiredGpa, isAchievable: requiredGpa <= 4.3 };
  }, [planCurrentGpa, planTargetGpa, planCurrentCredits, planAdditionalCredits]);

  return (
    <div>
      <div className="flex gap-2 border-b border-line">
        <button
          onClick={() => setMode("calculate")}
          className={`border-b-2 px-1 pb-3 font-mono text-xs uppercase tracking-wide transition-colors ${
            mode === "calculate"
              ? "border-sage-deep text-ink"
              : "border-transparent text-ink-soft hover:text-ink"
          }`}
        >
          Calculate GPA
        </button>
        <button
          onClick={() => setMode("plan")}
          className={`border-b-2 px-1 pb-3 ml-6 font-mono text-xs uppercase tracking-wide transition-colors ${
            mode === "plan"
              ? "border-sage-deep text-ink"
              : "border-transparent text-ink-soft hover:text-ink"
          }`}
        >
          Plan Future GPA
        </button>
      </div>

      {mode === "calculate" && (
        <div className="mt-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  <th className="pb-2 pr-3 font-normal">Course (optional)</th>
                  <th className="pb-2 pr-3 font-normal">Credits</th>
                  <th className="pb-2 pr-3 font-normal">Grade</th>
                  <th className="pb-2 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-line">
                    <td className="py-2 pr-3">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) =>
                          updateCourse(course.id, "name", e.target.value)
                        }
                        placeholder="Course name"
                        className="w-full rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={course.credits}
                        onChange={(e) =>
                          updateCourse(course.id, "credits", e.target.value)
                        }
                        className="w-20 rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <select
                        value={course.grade}
                        onChange={(e) =>
                          updateCourse(course.id, "grade", e.target.value)
                        }
                        className="rounded border border-line bg-card px-2 py-1.5 text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                      >
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeCourse(course.id)}
                        aria-label="Remove course"
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

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={addCourse}
              className="font-mono text-xs uppercase tracking-wide text-sage-deep hover:underline"
            >
              + Add course
            </button>
            <button
              onClick={() => setShowSettings((s) => !s)}
              className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink"
            >
              {showSettings ? "Hide settings" : "Settings"}
            </button>
          </div>

          {showSettings && (
            <div className="mt-6 rounded-lg border border-line bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Grade scale
              </p>
              <p className="mt-1 text-xs text-ink-soft">
                Adjust values if your school uses a different scale, such as
                a 4.0-only scale with no plus or minus grades.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {Object.keys(defaultScale).map((grade) => (
                  <label key={grade} className="text-xs text-ink-soft">
                    {grade}
                    <input
                      type="number"
                      step="0.1"
                      value={scale[grade]}
                      onChange={(e) =>
                        setScale((prev) => ({
                          ...prev,
                          [grade]: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="mt-1 w-full rounded border border-line bg-paper px-2 py-1 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <label className="flex items-center gap-2 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={includePast}
                    onChange={(e) => setIncludePast(e.target.checked)}
                  />
                  Include a past GPA in this calculation
                </label>
                {includePast && (
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:w-72">
                    <label className="text-xs text-ink-soft">
                      Past GPA
                      <input
                        type="number"
                        step="0.01"
                        value={pastGpa}
                        onChange={(e) => setPastGpa(e.target.value)}
                        className="mt-1 w-full rounded border border-line bg-paper px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                      />
                    </label>
                    <label className="text-xs text-ink-soft">
                      Past credits
                      <input
                        type="number"
                        step="1"
                        value={pastCredits}
                        onChange={(e) => setPastCredits(e.target.value)}
                        className="mt-1 w-full rounded border border-line bg-paper px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                GPA
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {result.totalCredits > 0 ? result.gpa.toFixed(3) : "—"}
              </p>
            </div>
            <div className="rounded-lg border border-line bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Total credits
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {result.totalCredits}
              </p>
            </div>
            <div className="rounded-lg border border-line bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                Courses counted
              </p>
              <p className="mt-1 font-display text-3xl text-ink">
                {result.countedCourses}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-lg border border-line bg-paper-dim p-5">
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              Grade scale used in this calculation
            </p>
            <div className="mt-4 grid grid-cols-4 gap-x-4 gap-y-2 text-sm sm:grid-cols-7">
              {Object.entries(scale).map(([grade, value]) => (
                <div key={grade} className="flex items-baseline gap-1.5">
                  <span className="font-medium text-ink">{grade}</span>
                  <span className="text-ink-soft">=</span>
                  <span className="text-ink-soft">{value}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-soft">
              P (pass), NP (not pass), I (incomplete), and W (withdrawal) are
              excluded from the GPA calculation. Open Settings above to
              change any of these values to match your school&apos;s scale.
            </p>
          </div>
        </div>
      )}

      {mode === "plan" && (
        <div className="mt-8">
          <p className="max-w-xl text-sm text-ink-soft">
            Find the average GPA you need across your remaining courses to
            reach a target overall GPA.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:max-w-md">
            <label className="text-xs text-ink-soft">
              Current GPA
              <input
                type="number"
                step="0.01"
                value={planCurrentGpa}
                onChange={(e) => setPlanCurrentGpa(e.target.value)}
                className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </label>
            <label className="text-xs text-ink-soft">
              Target GPA
              <input
                type="number"
                step="0.01"
                value={planTargetGpa}
                onChange={(e) => setPlanTargetGpa(e.target.value)}
                className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </label>
            <label className="text-xs text-ink-soft">
              Current credits
              <input
                type="number"
                step="1"
                value={planCurrentCredits}
                onChange={(e) => setPlanCurrentCredits(e.target.value)}
                className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </label>
            <label className="text-xs text-ink-soft">
              Additional credits
              <input
                type="number"
                step="1"
                value={planAdditionalCredits}
                onChange={(e) => setPlanAdditionalCredits(e.target.value)}
                className="mt-1 w-full rounded border border-line bg-card px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </label>
          </div>

          <div className="mt-8">
            {planResult === null ? (
              <p className="text-sm text-ink-soft">
                Fill in all four fields to see the required GPA.
              </p>
            ) : planResult.isAchievable && planResult.requiredGpa > 0 ? (
              <div className="rounded-lg border border-line bg-card p-6 sm:max-w-md">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  Required average GPA in remaining courses
                </p>
                <p className="mt-1 font-display text-3xl text-ink">
                  {planResult.requiredGpa.toFixed(3)}
                </p>
              </div>
            ) : planResult.requiredGpa <= 0 ? (
              <div className="rounded-lg border border-line bg-card p-6 sm:max-w-md">
                <p className="text-sm text-ink">
                  Your current GPA is already at or above your target. Any
                  passing grade in your remaining courses will keep you
                  there.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-line bg-card p-6 sm:max-w-md">
                <p className="text-sm text-ink">
                  This target is not reachable with the number of credits
                  entered, since it would require an average above 4.3.
                  Try a lower target GPA or more additional credits.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
