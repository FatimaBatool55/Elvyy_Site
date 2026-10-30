import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import JambAggregateCalculator from "@/components/tools/JambAggregateCalculator";
import { getTool } from "@/lib/tools";

const title = "JAMB Aggregate Calculator 2027, Free, No Login";
const description =
  "Free JAMB aggregate calculator for UTME, Post UTME and O'Level scores. Use the 50/50 formula or custom weights. Unlimited free, no account needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/jamb-aggregate-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/jamb-aggregate-calculator",
  },
};

const faqs = [
  {
    q: "Is there one official JAMB aggregate formula?",
    a: "No. JAMB marks the UTME, but each university decides how to combine UTME, Post UTME and sometimes O'Level results into its own aggregate. Always use the formula your target school publishes.",
  },
  {
    q: "What is the most common aggregate formula?",
    a: "A widely used formula is UTME divided by 8 plus Post UTME divided by 2. With a UTME out of 400 and a Post UTME out of 100, each part contributes up to 50 points.",
  },
  {
    q: "How are O'Level grades converted to points?",
    a: "A common scale gives A1 six points, B2 five, B3 four, C4 three, C5 two and C6 one. Five subjects give a maximum of 30 points. Some schools use a different scale.",
  },
  {
    q: "What if my Post UTME is not marked out of 100?",
    a: "Some schools mark Post UTME out of 30, 40 or 50. Change the Post UTME total marks field in the calculator and it will scale the score correctly.",
  },
];

export default function Page() {
  const tool = getTool("jamb-aggregate-calculator")!;
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

      <JambAggregateCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is a JAMB aggregate score?</h2>
          <p className="mt-2">A JAMB aggregate score is the single number a Nigerian university uses to rank applicants for admission. It combines your UTME score with your Post UTME screening score and, in some schools, your O&apos;Level results. Candidates are ranked from the highest aggregate downward until a course is full.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">There is no single national formula</h2>
          <p className="mt-2">JAMB marks the UTME, but each university chooses how to weigh the parts. Some schools split UTME and Post UTME equally. Some give more weight to UTME. Others add O&apos;Level grades as a third part. This is why your result must always be checked against the formula published by your target school.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">The most common formula</h2>
          <p className="mt-2">A widely used formula is UTME divided by 8 plus Post UTME divided by 2. For example, a candidate with 280 in UTME gets 35 points. The same candidate with 70 in Post UTME gets 35 points. The aggregate is 70 out of 100.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Formulas that include O&apos;Level results</h2>
          <p className="mt-2">Some schools convert O&apos;Level grades into points. A1 is worth 6 points, B2 is 5, B3 is 4, C4 is 3, C5 is 2 and C6 is 1. Five subjects give a maximum of 30 points. One published screening formula gives 80 percent to UTME and 20 percent to O&apos;Level. A candidate with 273 in UTME and 14 O&apos;Level points scores 54.6 plus 9.33, which is 63.93 out of 100.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How to use this calculator</h2>
          <p className="mt-2">First, pick the preset that matches your school, or choose custom weights and type them in. The three weights must add up to 100. Second, enter your UTME score and your Post UTME score. If your school uses O&apos;Level, pick your five grades. The result shows each part and the final aggregate.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Find the score you need</h2>
          <p className="mt-2">Use the target tool under the result. Enter the aggregate you want and the calculator shows the Post UTME score you need, based on your UTME and O&apos;Level. If your school has no Post UTME, it shows the UTME score you need instead.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Minimum UTME score</h2>
          <p className="mt-2">JAMB has reportedly set a national minimum UTME score of 150 for universities for the 2026/2027 session. Most competitive courses ask for much more. Medicine, law and engineering often need a high UTME score and a strong Post UTME. Always confirm the cut off for your course on your school portal.</p>
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
          Studying at university already? Try our{" "}
          <Link href="/tools/gpa-calculator" className="text-sage-deep hover:underline">
            GPA calculator
          </Link>
          .
        </p>
      </div>
    </ToolShell>
  );
}
