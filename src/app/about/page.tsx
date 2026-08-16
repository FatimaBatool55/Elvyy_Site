import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "What Elvyy is and who built it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        About
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">About Elvyy</h1>
      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-soft">
        <p>
          Elvyy started with a simple frustration: most free tools online
          come with a catch, a daily limit, a forced signup, or an upgrade
          wall right when they become useful. Elvyy is built without any
          of that. Every tool here stays free and unlimited, for as long
          as this site exists.
        </p>
        <p>
          Alongside the tools, Elvyy publishes short, practical articles
          on everyday topics: money, health, productivity, and general
          life, written to be actually useful rather than padded out to
          hit a word count.
        </p>
        <p>
          This is a small, independently run project, growing one tool
          and one article at a time. If something here is broken or
          missing, the contact page is the fastest way to reach us.
        </p>
      </div>

      <div className="mt-12 rounded-lg border border-line bg-card p-6">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Made by
        </p>
        <p className="mt-2 font-display text-2xl text-ink">Fatima Batool</p>
        <p className="mt-1 text-sm text-ink-soft">BSCS Student</p>
      </div>
    </div>
  );
}
