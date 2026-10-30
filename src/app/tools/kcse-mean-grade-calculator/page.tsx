import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import KcseMeanGradeCalculator from "@/components/tools/KcseMeanGradeCalculator";
import { getTool } from "@/lib/tools";

const title = "KCSE Mean Grade Calculator 2026, Free, No Login";
const description =
  "Free KCSE mean grade and points calculator. Enter your grades, see aggregate points out of 84, your mean grade and what you need for the next grade.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/kcse-mean-grade-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/kcse-mean-grade-calculator",
  },
};

const faqs = [
  {
    q: "How is the KCSE mean grade calculated?",
    a: "KNEC adds the points from your seven counted subjects to get the aggregate, which has a maximum of 84. The aggregate is divided by 7 and rounded to the nearest whole point. That whole point decides your mean grade.",
  },
  {
    q: "Which seven subjects count?",
    a: "Under the system reported since 2023, Mathematics always counts, along with the better of English and Kiswahili, plus your five best remaining subjects. The weaker language can still count if it is among those five.",
  },
  {
    q: "What aggregate points do I need for C plus?",
    a: "A mean grade of C plus needs 46 to 52 aggregate points. C plus has traditionally been the minimum for public university degree programmes, but you should check the current KUCCPS rules.",
  },
  {
    q: "Does sitting eight or nine subjects help?",
    a: "It can. Only your best counted subjects form the mean, so a strong extra subject can replace a weaker one. The three groups of required subjects still apply when you register.",
  },
];

export default function Page() {
  const tool = getTool("kcse-mean-grade-calculator")!;
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

      <KcseMeanGradeCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is the KCSE mean grade?</h2>
          <p className="mt-2">The KCSE mean grade is the single letter that summarises your results in the Kenya Certificate of Secondary Education. It is built from your best seven subjects. Universities, colleges and employers use it to judge your overall performance.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">KCSE grades and points</h2>
          <p className="mt-2">Every subject is graded on a 12 point scale. A is 12 points. A minus is 11. B plus is 10. B is 9. B minus is 8. C plus is 7. C is 6. C minus is 5. D plus is 4. D is 3. D minus is 2. E is 1 point.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Which seven subjects count?</h2>
          <p className="mt-2">Since the 2023 examination, Mathematics always counts. The better of English and Kiswahili counts as your language subject. The five best of your remaining subjects fill the other places. The weaker language can still count if it is among your best five.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How the mean grade is worked out</h2>
          <p className="mt-2">Add the points from the seven counted subjects. The maximum is 84. Divide by 7 and round to the nearest whole point. This gives these aggregate ranges. A is 81 to 84. A minus is 74 to 80. B plus is 67 to 73. B is 60 to 66. B minus is 53 to 59. C plus is 46 to 52. C is 39 to 45. C minus is 32 to 38. D plus is 25 to 31. D is 18 to 24. D minus is 11 to 17. E is 7 to 10.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example</h2>
          <p className="mt-2">A student gets B in Mathematics (9 points) and B in English (9 points). The student gets C plus in Kiswahili (7 points). The five other subjects are Biology B minus (8), Chemistry C plus (7), History B (9) and Business Studies C plus (7). English is the better language, so Kiswahili joins the pool of five. The total is 9 + 9 + 7 + 8 + 7 + 9 + 7, which is 56 points. Divided by 7 this is 8.00, so the mean grade is B minus.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Why the best seven matter</h2>
          <p className="mt-2">Only your best seven subjects count, so a weak subject outside that group does not pull your mean down. A strong eighth subject can even replace a weaker counted one. Use this calculator to test what happens if one grade improves by a single step.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">University entry</h2>
          <p className="mt-2">A mean grade of C plus has traditionally been the minimum for public university degree programmes, which means at least 46 aggregate points. Specific courses ask for higher subject grades through cluster points. Rules can change, so confirm with KNEC and KUCCPS.</p>
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
          Also at university level? Try our{" "}
          <Link href="/tools/gpa-calculator" className="text-sage-deep hover:underline">
            GPA calculator
          </Link>{" "}
          or the{" "}
          <Link href="/tools/jamb-aggregate-calculator" className="text-sage-deep hover:underline">
            JAMB aggregate calculator
          </Link>
          .
        </p>
      </div>
    </ToolShell>
  );
}
