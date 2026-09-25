import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">Legal</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated: September 2026</p>

      <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">Data controller</h2>
          <p className="mt-2">Elvyy is operated by Fatima Batool, who acts as the data controller for the purposes described in this policy. As the data controller, Fatima Batool determines why and how any personal data connected to this site is processed. For any privacy question, correction request, or concern, contact hajabatool01@gmail.com. We aim to respond to every inquiry within a reasonable time, generally within 30 days.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">What information we collect</h2>
          <p className="mt-2">Elvyy's calculators and utilities, including the Word Counter, Age Calculator, GPA Calculator, Final Grade Calculator, Study Plan Spreader, and Task Splitter, run entirely inside your browser. Nothing you type into these tools is transmitted to or stored on our servers. The QR Code Generator sends only the text you provide to a third party rendering service solely to generate the image, and nothing is retained afterward. The AI powered tools, including the Meta Description Generator, Blog Title Generator, and Blog Generator, send the text you submit to the relevant AI provider solely to generate a response. This text is not stored by Elvyy once the response is returned.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Lawful basis for processing</h2>
          <p className="mt-2">Where any personal data is processed on this site, most commonly cookie identifiers used for advertising, we rely on your consent as the lawful basis under GDPR. This consent is collected through the cookie banner shown when you first visit the site. You may withdraw consent at any time by declining cookies in that banner, or by clearing cookies through your browser settings. Where processing is strictly necessary for the site to function, such as basic security logs kept temporarily by our hosting provider, we rely on legitimate interest as the lawful basis.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Cookies and advertising</h2>
          <p className="mt-2">This site may display advertisements served by Google AdSense and other advertising partners. These partners may set cookies to serve ads based on your visits to this and other websites, a practice generally referred to as interest based advertising. You can opt out of personalized advertising by visiting Google's Ads Settings page, or by declining non essential cookies through the banner on this site. Declining cookies does not prevent you from using any tool or reading any article on Elvyy.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Your rights under GDPR</h2>
          <p className="mt-2">If you are located in the European Union or United Kingdom, data protection law gives you several rights over your personal data. You have the right to access any personal data we hold about you, the right to request correction of inaccurate data, the right to request erasure of your data, the right to object to or restrict certain processing, and the right to receive a copy of your data in a portable format. Because Elvyy does not maintain user accounts, passwords, or stored personal profiles, most of these rights can be exercised immediately and independently by clearing cookies in your browser. For any request that cannot be satisfied this way, contact hajabatool01@gmail.com.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Data retention</h2>
          <p className="mt-2">Elvyy does not store the content you enter into any tool, whether a calculator, the QR generator, or an AI powered tool. Cookie based advertising identifiers set by third party advertising partners are retained according to those partners' own policies, typically for up to 13 months, after which they expire automatically and are not renewed without fresh consent.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Third party links and services</h2>
          <p className="mt-2">Some articles or tool pages on Elvyy may include links to third party websites, or may rely on third party services such as Google Fonts, Google AdSense, or AI providers to function. Elvyy is not responsible for the privacy practices, content, or security of any external site you visit by following a link from this site. We encourage you to review the privacy policy of any third party site before providing information to it.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Children's privacy</h2>
          <p className="mt-2">Elvyy is not directed at children under 13, and we do not knowingly collect personal data from children. If you believe a child has provided personal data through this site, contact us and we will take steps to remove it.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Changes to this policy</h2>
          <p className="mt-2">We may update this policy from time to time as the site or applicable law changes. The date at the top of this page reflects the most recent update. Continued use of Elvyy after a change means you accept the updated policy.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-2">Questions about this policy, or any request regarding your data, can be sent to hajabatool01@gmail.com.</p>
        </section>
      </div>
    </div>
  );
}
