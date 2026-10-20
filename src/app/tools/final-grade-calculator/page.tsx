import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import FinalGradeCalculator from "@/components/tools/FinalGradeCalculator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Final Grade Calculator, 100% Free, No Login",
  description:
    "Find the exact score you need on remaining work to hit your target grade. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/final-grade-calculator" },
  openGraph: {
    title: "Final Grade Calculator, 100% Free, No Login",
    description:
      "Find the exact score you need on remaining work to hit your target grade. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/final-grade-calculator",
  },
};

export default function Page() {
  const tool = getTool("final-grade-calculator")!;
  return (
    <ToolShell tool={tool}>
      <FinalGradeCalculator />
            <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">How this calculator works</h2>
          <p className="mt-2">Enter each graded component such as midterm, assignments, and quizzes with its weight percentage and your score. Then enter what is left in the course and its weight. The calculator tells you the minimum score you need on that remaining work to finish the course at your target grade. It handles any combination of weights as long as everything adds up to 100 percent.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Common use cases</h2>
          <p className="mt-2">Students use this most often before finals to find out whether they need to study hard or whether they can relax. It is also useful mid-semester when checking if dropping a course is worth it, or when deciding how much effort to put into an assignment relative to its weight. Knowing the exact number changes how you allocate your limited study time across multiple subjects.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Why weighted grades are harder to calculate manually</h2>
          <p className="mt-2">Most students make the mistake of simply averaging their scores. If your midterm is worth 30 percent, your assignments 20 percent, and your final 50 percent, a simple average gives the wrong answer. The correct calculation weights each component before adding them. This tool does that automatically so you get an accurate result instead of a false sense of security or unnecessary worry.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">What to do if the required score is above 100</h2>
          <p className="mt-2">If the calculator shows you need more than 100 percent on remaining work, your current target grade is out of reach with the scores you have so far. The realistic options are to lower your target grade, speak with your professor about extra credit before the semester ends, or check whether your school has a grade replacement policy if you plan to retake the course.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Using this tool to decide whether to drop a course</h2>
          <p className="mt-2">If you are considering dropping a course, run the numbers first. Enter your current scores and see what you need on remaining work. If the required score is achievable, dropping may cost you more than finishing. If it is above 90 or 100 percent and the course heavily affects your GPA, dropping before the deadline is often the better choice. The calculator gives you the data to make that decision clearly.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
          <div className="mt-3 space-y-4">
            {[
              { q: "What if my professor has not announced the final exam weight?", a: "Check your course syllabus. The weight of every graded component is usually listed there. If it is genuinely not available, contact your professor or departmental office before the final." },
              { q: "Can I use this for multiple remaining assignments, not just a final?", a: "Yes. Combine all remaining work into a single entry by adding their weights together. Enter that combined weight as the remaining component and set your target. The result tells you the average you need across everything still to come." },
              { q: "Does extra credit change the calculation?", a: "It depends on how your professor applies it. If extra credit adds points directly to a specific component, adjust that component's score. If it adds to the overall total above 100 percent, enter it as a separate component with a small positive weight." },
              { q: "What if my weights do not add up to 100 percent?", a: "The calculator will flag this. Check your syllabus again and make sure you have included every graded component. Common omissions are participation grades, lab reports, or attendance points that each carry a small percentage." },
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
