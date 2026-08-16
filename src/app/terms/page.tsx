import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        Legal
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated: August 2026</p>

      <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">Use of this site</h2>
          <p className="mt-2">
            Elvyy's tools and articles are provided for free, general use.
            By using this site, you agree not to misuse the tools, attempt
            to disrupt the service, or scrape content for redistribution
            without permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">No warranty</h2>
          <p className="mt-2">
            Tools and calculators on this site (including the Age
            Calculator and Unit Converter) are provided for general,
            informational purposes. While we aim for accuracy, results
            should not be relied on for medical, legal, financial, or
            other professional decisions.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Content</h2>
          <p className="mt-2">
            All articles and tool interfaces on Elvyy are original content
            unless otherwise noted, and may not be reproduced elsewhere
            without permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Changes</h2>
          <p className="mt-2">
            These terms may be updated from time to time as the site
            grows. Continued use of the site after changes means you
            accept the updated terms.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms can be sent to hello@elvyy.com.
          </p>
        </section>
      </div>
    </div>
  );
}
