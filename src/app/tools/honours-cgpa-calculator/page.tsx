import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import HonoursCgpaCalculator from "@/components/tools/HonoursCgpaCalculator";
import { getTool } from "@/lib/tools";

const title = "Honours CGPA Calculator 2026, Free, No Login";
const description =
  "Free honours CGPA calculator for National University Bangladesh. Add courses by year, get your GPA and CGPA, and the GPA you need to hit your target.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/honours-cgpa-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/honours-cgpa-calculator",
  },
};

const faqs = [
  {
    q: "How is honours CGPA calculated?",
    a: "Multiply each course's grade point by its credit, add all the results, then divide by the total credits. Grade points run from 4.00 for A plus down to 2.00 for D, and 0.00 for F.",
  },
  {
    q: "Is the final honours CGPA weighted by year?",
    a: "This calculator weights by credits, so every credit counts equally across all four years. Some websites describe a formula that gives later years more weight. Your official result from the university is the final authority, so compare it with this tool.",
  },
  {
    q: "What marks do I need for each grade?",
    a: "80 and above is A plus. 75 to 79 is A. 70 to 74 is A minus. 65 to 69 is B plus. 60 to 64 is B. 55 to 59 is B minus. 50 to 54 is C plus. 45 to 49 is C. 40 to 44 is D. Below 40 is F.",
  },
  {
    q: "Do failed courses count in my CGPA?",
    a: "A failed course keeps its credits in the total with zero grade points, which lowers your CGPA until you retake it. Retake rules differ by institution, so check your department.",
  },
];

export default function Page() {
  const tool = getTool("honours-cgpa-calculator")!;
  return (
    <ToolShell tool={tool}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <HonoursCgpaCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is an honours CGPA?</h2>
          <p className="mt-2">Honours CGPA is the Cumulative Grade Point Average for a four year honours degree. It turns every course grade into points, weights those points by credit and gives one number out of 4.00. Employers, scholarship boards and universities abroad use this number to judge your overall results.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">The grading scale</h2>
          <p className="mt-2">This calculator uses the National University Bangladesh scale. 80 to 100 marks is A plus with 4.00 points. 75 to 79 is A with 3.75. 70 to 74 is A minus with 3.50. 65 to 69 is B plus with 3.25. 60 to 64 is B with 3.00. 55 to 59 is B minus with 2.75. 50 to 54 is C plus with 2.50. 45 to 49 is C with 2.25. 40 to 44 is D with 2.00. Anything below 40 is F with 0.00.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How the calculation works</h2>
          <p className="mt-2">For each course, multiply the grade point by the credit. Add those numbers for every course you have taken. Then divide the total by the total credits. A four credit course moves your CGPA twice as much as a two credit course, which is why high credit courses deserve the most attention.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example</h2>
          <p className="mt-2">A student takes three courses in Year 1. A plus in a four credit course gives 16 points. A in a four credit course gives 15 points. B plus in a four credit course gives 13 points. In Year 2 the student gets A minus in four credits for 14 points, B in four credits for 12 points and A in three credits for 11.25 points. The total is 81.25 points over 23 credits. Divide 81.25 by 23 and the CGPA is 3.53. Year 1 alone gives 3.67 and Year 2 alone gives 3.39.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Plan your final years</h2>
          <p className="mt-2">Enter the courses you have finished, then use the target tool. Type the CGPA you want and the credits you still have. The tool shows the GPA you need in those remaining credits, and the letter grade that average is close to. If the target is out of reach, it tells you the best final CGPA you can still get.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Tips to raise your CGPA</h2>
          <p className="mt-2">Put extra study time into your highest credit courses first. Do not ignore a D or an F in a large course, because it drags the average down for the whole programme. If your university allows a retake or an improvement exam, run the numbers here before you decide. Early years matter because they set the base for every later calculation.</p>
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
          Also see our{" "}
          <Link href="/tools/gpa-calculator" className="text-sage-deep hover:underline">
            GPA calculator
          </Link>{" "}
          and{" "}
          <Link href="/tools/final-grade-calculator" className="text-sage-deep hover:underline">
            final grade calculator
          </Link>
          .
        </p>
      </div>
    </ToolShell>
  );
}
