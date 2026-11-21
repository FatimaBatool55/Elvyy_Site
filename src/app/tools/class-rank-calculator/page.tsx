import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import ClassRankCalculator from "@/components/tools/ClassRankCalculator";
import { getTool } from "@/lib/tools";

const title = "Class Rank and Percentile Calculator, Free, No Login";
const description =
  "Free class rank and percentile calculator. Convert rank to percentile, find the rank needed for a target percentile, or paste class scores to see where you stand.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/class-rank-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/class-rank-calculator",
  },
};

const faqs = [
  {
    q: "How do I convert class rank to percentile?",
    a: "Subtract your rank from the class size, divide by the class size, and multiply by 100. If you are ranked 15th in a class of 120, the calculation is 120 minus 15 divided by 120, multiplied by 100, which gives 87.5 percentile.",
  },
  {
    q: "What does the 90th percentile mean?",
    a: "Being in the 90th percentile means you scored higher than 90 percent of your class. It does not tell you your exact rank unless you know the class size.",
  },
  {
    q: "What rank do I need to reach the 90th percentile?",
    a: "Multiply the class size by the fraction of students below you. For the 90th percentile in a class of 120, you need to outscore 108 students, which means ranking 12th or better.",
  },
  {
    q: "Does a tied score affect my rank?",
    a: "In most ranking systems, tied scores share the same rank. If two students both score 87, they both receive the same rank and the next rank is skipped. This calculator handles ties this way.",
  },
];

export default function Page() {
  const tool = getTool("class-rank-calculator")!;
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

      <ClassRankCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What is class rank?</h2>
          <p className="mt-2">Class rank is your position among all students in a group, ordered from highest to lowest score. If you scored higher than everyone except four students, your rank is 5th. Rank tells you exactly where you stand relative to your peers, which is why universities, scholarship boards and employers often ask for it alongside GPA.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">What is a percentile?</h2>
          <p className="mt-2">A percentile tells you what percentage of the group you scored higher than. The 85th percentile means you scored higher than 85 percent of your class. Percentile is often more useful than rank when comparing across classes of different sizes, because it gives a standardized measure regardless of how many students are in the group.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How to convert rank to percentile</h2>
          <p className="mt-2">Subtract your rank from the class size, divide by the class size, then multiply by 100. A student ranked 15th in a class of 120 performs this calculation: 120 minus 15 equals 105, divided by 120 equals 0.875, multiplied by 100 equals 87.5 percentile. That student scored higher than 87.5 percent of the class.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How to find the rank needed for a target percentile</h2>
          <p className="mt-2">Multiply the class size by the decimal form of the target percentile, then subtract from the class size and round up. To reach the 90th percentile in a class of 120, multiply 120 by 0.90 to get 108. That means you need to outscore 108 students, so you need to rank 12th or better. The calculator does this automatically.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Score versus class mode</h2>
          <p className="mt-2">If you have access to all the scores in your class or exam, paste them into the third tab. Enter your own score separately and the tool places you correctly in the ranked list. It also shows the class highest, lowest, average and median so you can see not just where you rank but how the whole group performed.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How ties are handled</h2>
          <p className="mt-2">When two or more students share the same score, they receive the same rank and the next rank number is skipped. If students rank 3rd and 4th both score 85, they are both ranked 3rd and no one is ranked 4th. This is the standard method used by most academic institutions and competitive examinations.</p>
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
          Also useful:{" "}
          <Link href="/tools/gpa-calculator" className="text-sage-deep hover:underline">
            GPA calculator
          </Link>{" "}
          and{" "}
          <Link href="/tools/attendance-calculator" className="text-sage-deep hover:underline">
            attendance calculator
          </Link>
          .
        </p>
      </div>
    </ToolShell>
  );
}
