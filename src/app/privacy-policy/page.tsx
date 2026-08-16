import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">
        Legal
      </p>
      <h1 className="mt-2 font-display text-4xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated: August 2026</p>

      <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">
            Information we collect
          </h2>
          <p className="mt-2">
            Elvyy's tools run entirely in your browser, text you type into
            the Word Counter, Age Calculator, or Unit Converter is never
            sent to or stored on our servers. The QR Code Generator sends
            the text you enter to a third-party QR rendering service solely
            to generate the image.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">
            Cookies and advertising
          </h2>
          <p className="mt-2">
            This site may display ads served by Google AdSense and other
            advertising partners. These partners may use cookies to serve
            ads based on your prior visits to this and other websites. You
            can opt out of personalized advertising by visiting Google's
            Ads Settings.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Analytics</h2>
          <p className="mt-2">
            We may use standard analytics tools to understand aggregate
            traffic patterns, such as which pages are visited and roughly
            how much traffic the site receives. This data is not used to
            identify individual visitors.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">
            Third-party links
          </h2>
          <p className="mt-2">
            Some articles or tool pages may include affiliate or
            third-party links. We are not responsible for the privacy
            practices of external sites you visit from Elvyy.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to hello@elvyy.com.
          </p>
        </section>
      </div>
    </div>
  );
}
