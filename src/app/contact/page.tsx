import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Elvyy team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">Get in touch</h1>
      <p className="mt-6 max-w-xl text-ink-soft">
        Questions, feedback, tool requests, or something not working as
        expected, reach out any time.
      </p>
      <div className="mt-8 space-y-3">
        <div className="rounded-lg border border-line bg-card p-6">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Email
          </p>
          <p className="mt-1 font-display text-xl text-ink">
            hajabatool01@gmail.com
          </p>
        </div>
        <div className="rounded-lg border border-line bg-card p-6">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Email
          </p>
          <p className="mt-1 font-display text-xl text-ink">
            fatimahawan098@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
