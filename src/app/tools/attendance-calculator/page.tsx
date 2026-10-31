import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import AttendanceCalculator from "@/components/tools/AttendanceCalculator";
import { getTool } from "@/lib/tools";

const title = "Attendance Calculator 75 Percent, Free, No Login";
const description =
  "Free attendance calculator. See your attendance percentage, how many classes you can miss and how many you must attend to reach 75 percent. Unlimited free.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/attendance-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/attendance-calculator",
  },
};

const faqs = [
  {
    q: "How do I calculate my attendance percentage?",
    a: "Divide the number of classes you attended by the number of classes held, then multiply by 100. If you attended 32 of 40 classes, your attendance is 80 percent.",
  },
  {
    q: "How many classes can I miss and still keep 75 percent?",
    a: "Multiply your attended classes by 100, divide by 75, then subtract the classes held. Round down. With 32 attended out of 40 held, 32 times 100 divided by 75 is 42.67. Subtract 40 and you can miss 2 more classes.",
  },
  {
    q: "How many classes must I attend to get back to 75 percent?",
    a: "Attend classes in a row until the percentage reaches your requirement. With 20 attended out of 30 held, you must attend the next 10 classes in a row to reach exactly 75 percent.",
  },
  {
    q: "Do medical leaves count as attended?",
    a: "That depends on your institution. Many colleges allow a condonation of a few percent with a medical certificate, but the rules differ. Check your student handbook and enter only the classes your college counts as attended.",
  },
];

export default function Page() {
  const tool = getTool("attendance-calculator")!;
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

      <AttendanceCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">How attendance percentage is calculated</h2>
          <p className="mt-2">Attendance percentage is the number of classes you attended divided by the number of classes held, multiplied by 100. If your college held 40 classes and you attended 32, your attendance is 80 percent. This calculator does that sum for every subject and also shows your combined attendance across all subjects.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How many classes can you miss</h2>
          <p className="mt-2">The number of classes you can still miss depends on how far above the requirement you are. Multiply your attended classes by 100 and divide by the required percentage. Subtract the classes held and round down. With 32 attended out of 40 and a 75 percent rule, you get 42.67 minus 40, so you can miss 2 more classes. A third missed class would drop you to 74.4 percent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How many classes you must attend to recover</h2>
          <p className="mt-2">If you are below the requirement, every class you attend lifts both the top and the bottom of the fraction, so recovery is slower than most students expect. With 20 attended out of 30 held, you are at 66.67 percent. You must attend the next 10 classes in a row to reach 75 percent. The calculator works this number out for you.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Plan the whole semester</h2>
          <p className="mt-2">Enter the total number of classes planned for the semester and the tool looks ahead. It shows how many of the remaining classes you must attend and how many you can safely miss. If the target is no longer reachable, it tells you early, while you can still speak to your teacher or department.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Common attendance requirements</h2>
          <p className="mt-2">Many colleges and universities ask for 75 percent attendance to sit the final exam. Some use 60, 65, 80 or 85 percent, and some apply a different limit to labs. Use the quick buttons to switch between common values, or type your own. Always confirm the rule in your student handbook.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Tips to protect your attendance</h2>
          <p className="mt-2">Do not use your spare absences early in the semester. Illness, travel and family events tend to arrive later, and you will want a buffer for them. Check each subject separately, because a single weak subject can block you from an exam even when your overall figure looks healthy. Keep copies of medical certificates in case your college allows condonation.</p>
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
          Planning your study time too? Try our{" "}
          <Link href="/tools/study-plan-spreader" className="text-sage-deep hover:underline">
            study plan spreader
          </Link>{" "}
          and{" "}
          <Link href="/tools/gpa-calculator" className="text-sage-deep hover:underline">
            GPA calculator
          </Link>
          .
        </p>
      </div>
    </ToolShell>
  );
}
