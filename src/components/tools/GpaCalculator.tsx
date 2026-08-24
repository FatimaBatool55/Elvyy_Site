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
