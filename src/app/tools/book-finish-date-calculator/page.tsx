import Link from "next/link";
import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import BookFinishCalculator from "@/components/tools/BookFinishCalculator";
import { getTool } from "@/lib/tools";

const title = "Book Finish Date Calculator, Free, No Login";
const description =
  "Free book finish date calculator. Enter pages and your reading speed to see the day you will finish, milestone dates and the pages per day you need.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/book-finish-date-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/book-finish-date-calculator",
  },
};

const faqs = [
  {
    q: "How do I work out when I will finish a book?",
    a: "Subtract the pages you have read from the total pages. Divide the pages left by the pages you read each day and round up. That is the number of reading days you need. Count that many reading days forward from your start date.",
  },
  {
    q: "How many pages per hour does the average reader manage?",
    a: "It depends on the book. As a rough guide, many readers cover 30 to 60 pages an hour in a novel. Dense or technical books are often slower, around 20 to 30 pages an hour. Time yourself for a few sessions to find your own pace.",
  },
  {
    q: "Does the start date count as a reading day?",
    a: "Yes, if that weekday is one of your reading days. The calculator counts the start date as day one, so reading today brings your finish date one day closer.",
  },
  {
    q: "Can I skip weekends or other days?",
    a: "Yes. Switch off any weekday in the Days you read buttons. The calculator then only counts the days you picked, so the finish date moves to match your real routine.",
  },
];

export default function Page() {
  const tool = getTool("book-finish-date-calculator")!;
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

      <BookFinishCalculator />

      <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">How a book finish date is calculated</h2>
          <p className="mt-2">The calculation has three steps. First, subtract the pages you have already read from the total pages. Second, divide the pages left by the pages you read each day, and round up to a whole day. Third, count that many reading days forward from your start date. The calendar date you land on is your finish date.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">A worked example</h2>
          <p className="mt-2">A book has 320 pages and you have read 40. That leaves 280 pages. At 20 pages a day, you need 14 reading days. If you read every day, you finish on day 14. If you read only Monday to Friday and start on a Monday, the same book takes 18 calendar days, because weekends do not count.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Use your reading pace instead</h2>
          <p className="mt-2">If you do not know your pages per day, switch to the pace option. Enter how many pages you read in an hour and how many minutes you read each day. At 30 pages an hour and 45 minutes a day, you read about 22 pages a day. The calculator also shows how many hours of reading are left in the book.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Work backwards from a deadline</h2>
          <p className="mt-2">Sometimes the date comes first, such as a book club meeting or an exam. Use the finish by tool near the bottom. Enter the date and the calculator divides the pages left across your reading days. With 280 pages left and 30 days to read, you need about 10 pages a day. At 30 pages an hour, that is roughly 19 minutes.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Milestone dates keep you on track</h2>
          <p className="mt-2">The table shows the dates you should reach 25, 50, 75 and 100 percent of the book. Check it against the page you are on. If you are behind a milestone, add a few pages to the next sessions rather than waiting until the end to catch up.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Tips for finishing more books</h2>
          <p className="mt-2">Pick a small daily target you can keep on a busy day, because consistency beats long sessions. Read at the same time each day so it becomes a habit. Keep a spare book or an audiobook for travel. If your pace turns out slower than you guessed, update the numbers and the calculator will fix your finish date straight away.</p>
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
          Studying from a textbook? Try our{" "}
          <Link href="/tools/study-plan-spreader" className="text-sage-deep hover:underline">
            study plan spreader
          </Link>{" "}
          to turn deadlines into a daily schedule.
        </p>
      </div>
    </ToolShell>
  );
}
