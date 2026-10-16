import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import MdcatAggregateCalculator from "@/components/tools/MdcatAggregateCalculator";
import { getTool } from "@/lib/tools";

const title = "MDCAT Aggregate Calculator 2026, Free, No Login";
const description =
  "Free MDCAT aggregate calculator using the official PMDC formula: 10% Matric, 40% FSc, 50% MDCAT. Check MBBS and BDS pass marks and find the marks you need.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/mdcat-aggregate-calculator" },
  openGraph: { title, description, url: "https://elvyy.com/tools/mdcat-aggregate-calculator" },
};

const faqs = [
  {
    q: "What is the MDCAT aggregate formula for 2026?",
    a: "The PMDC formula is 10 percent Matric, 40 percent FSc and 50 percent MDCAT. Some federal colleges use 50 percent FSc and 50 percent MDCAT instead.",
  },
  {
    q: "What is the MDCAT passing score?",
    a: "The pass mark is 55 percent for MBBS, which is 99 out of 180 marks, and 50 percent for BDS, which is 90 out of 180.",
  },
  {
    q: "How much does one MDCAT mark change my aggregate?",
    a: "One extra MDCAT mark adds approximately 0.28 percentage points to your aggregate. Ten extra marks add about 2.8 points.",
  },
];

export default function Page() {
  const tool = getTool("mdcat-aggregate-calculator")!;
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

      <MdcatAggregateCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is the MDCAT aggregate?</h2>
          <p className="mt-2">The MDCAT aggregate is the single percentage that decides your position on a medical college merit list in Pakistan. It combines your Matric result, your FSc result and your MDCAT score into one number. Colleges rank every applicant by this number and fill seats from the top down.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">The official PMDC formula</h2>
          <p className="mt-2">PMDC uses this weightage for MBBS and BDS admissions. Matric counts for 10 percent of the aggregate. FSc counts for 40 percent. MDCAT counts for 50 percent. The calculation is: aggregate = (Matric percentage times 0.10) + (FSc percentage times 0.40) + (MDCAT percentage times 0.50).</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example</h2>
          <p className="mt-2">A student scores 990 out of 1100 in Matric, which is 90 percent and contributes 9 points. The same student scores 935 out of 1100 in FSc, which is 85 percent and contributes 34 points. In MDCAT the student scores 144 out of 180, which is 80 percent and contributes 40 points. The total aggregate is 9 plus 34 plus 40, which equals 83 percent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Why every MDCAT mark matters</h2>
          <p className="mt-2">Your Matric and FSc results are already fixed before MDCAT. That means MDCAT is the only part of the formula you can still improve. One extra mark in MDCAT adds about 0.28 points to your aggregate. Ten extra marks add about 2.8 points, which can move you significantly up a merit list.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">MDCAT passing marks for MBBS and BDS</h2>
          <p className="mt-2">Scoring above the passing threshold in MDCAT is a separate requirement from your aggregate. For MBBS the pass mark is 55 percent, which equals 99 out of 180. For BDS it is 50 percent, which equals 90 out of 180. This calculator checks both for you automatically.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How to use the target marks tool</h2>
          <p className="mt-2">Enter your Matric and FSc marks first, then type your target aggregate in the lower section. The tool calculates how many MDCAT marks out of 180 you need to reach that aggregate. It always rounds up to a whole mark so you know the minimum you must score.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Federal medical colleges</h2>
          <p className="mt-2">Some federal colleges calculate merit without Matric and use 50 percent FSc and 50 percent MDCAT instead. Switch to the federal formula using the button at the top of the calculator if this applies to you. Formulas can change each year, so always confirm with the latest college prospectus before applying.</p>
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
          Planning university grades too? Try our{" "}
          <Link href="/tools/gpa-calculator" className="text-sage-deep hover:underline">
            GPA calculator
          </Link>.
        </p>
      </div>
    </ToolShell>
  );
}
