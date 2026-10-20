import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import GpaCalculator from "@/components/tools/GpaCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "GPA Calculator, 100% Free, No Login",
  description:
    "Calculate your GPA across courses and plan future grades. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/gpa-calculator" },
  openGraph: {
    title: "GPA Calculator, 100% Free, No Login",
    description:
      "Calculate your GPA across courses and plan future grades. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/gpa-calculator",
  },
};

export default function Page() {
  const tool = getTool("gpa-calculator")!;
  return (
    <ToolShell tool={tool}>
      <GpaCalculator />
          <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
      <section>
        <h2 className="font-display text-xl text-ink">What is GPA and how is it calculated</h2>
        <p className="mt-2">GPA stands for Grade Point Average and is the standard way universities measure academic performance. Each letter grade carries a point value: A is 4.0, B is 3.0, C is 2.0, and so on. Your GPA is the weighted average of these points across all your courses, where credit hours act as the weight. A 3-credit course counts three times more than a 1-credit course toward your final average.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">When to use this calculator</h2>
        <p className="mt-2">Use it at the end of each semester to track your cumulative GPA, before registering for next semester to plan which courses will help or hurt your average, and when deciding whether to retake a course. The planning tab shows exactly what average you need in remaining courses to hit a target GPA, which is useful when you are applying for scholarships, graduate programs, or internships with a GPA cutoff.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Tips for improving your GPA</h2>
        <p className="mt-2">Focus on courses with high credit hours first since they affect your GPA the most. A B in a 4-credit course moves your GPA more than an A in a 1-credit elective. If your school allows grade replacement for retaken courses, use the settings to adjust the scale and see the exact impact before committing to a retake. Dropping a course before the deadline is sometimes a smarter move than finishing with a D.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">How different grading scales affect your GPA</h2>
        <p className="mt-2">Not all universities use the same 4.0 scale. Some use a 4.3 scale where A+ is worth 4.3 points. Others use percentage-based conversion tables. This calculator lets you customize the point value for each letter grade in the settings, so your result matches your institution exactly rather than defaulting to the standard American scale.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Cumulative GPA vs semester GPA</h2>
        <p className="mt-2">Semester GPA reflects only the courses taken in one term. Cumulative GPA reflects all courses taken since you enrolled. Both matter but for different reasons. Semester GPA shows recent performance and is what scholarship committees often look at for renewal. Cumulative GPA is what appears on your transcript and what graduate programs evaluate.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
        <div className="mt-3 space-y-4">
          {[
            { q: "Does a W on my transcript affect my GPA?", a: "A withdrawal grade (W) does not affect your GPA because no grade points are assigned. However, too many withdrawals can raise concerns for graduate admissions committees about your ability to complete coursework." },
            { q: "How much can one semester change my cumulative GPA?", a: "It depends on how many total credit hours you have completed. Early in your degree, one semester has a large impact. After 60 or more credit hours, a single semester moves the needle much less because it represents a smaller share of your total credits." },
            { q: "What GPA do I need for graduate school?", a: "Most graduate programs look for a 3.0 minimum, but competitive programs in fields like medicine, law, and engineering often expect 3.5 or above. Use the planning tab to find the average you need in remaining courses to reach your target." },
            { q: "Can I calculate GPA for transfer credit?", a: "Yes. Add each transfer course with its credit hours and letter grade just as you would for any other course. The calculator weights everything by credit hours regardless of where the course was taken." },
          ].map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-lg text-ink">{f.q}</h3>
              <p className="mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </ToolShell>
  );
}
