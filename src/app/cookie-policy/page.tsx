import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy, How Elvyy Uses Cookies",
  description:
    "How Elvyy uses cookies and local storage, what each one does, and how you can control or remove them in your browser.",
  alternates: { canonical: "/cookie-policy" },
  openGraph: {
    title: "Cookie Policy, How Elvyy Uses Cookies",
    description:
      "How Elvyy uses cookies and local storage, what each one does, and how you can control or remove them in your browser.",
    url: "https://elvyy.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-wide text-sage-deep">Legal</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Cookie Policy</h1>
      <p className="mt-4 text-sm text-ink-soft">Last updated: October 2026</p>

      <div className="mt-8 space-y-6 text-[16px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl text-ink">What cookies are</h2>
          <p className="mt-2">Cookies are small text files that a website stores in your browser. Local storage works in a similar way. Websites use them to remember choices, keep the site working, and sometimes to measure visits or show advertising.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">What Elvyy stores in your browser</h2>
          <p className="mt-2">Elvyy stores one item in your browser's local storage. It is called elvyy-cookie-consent and it remembers whether you accepted or declined cookies, so the banner does not appear on every visit. It contains no personal information and is never sent to our servers.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Third party cookies and advertising</h2>
          <p className="mt-2">Elvyy may display advertisements through Google AdSense in the future. Advertising partners can set cookies to show ads based on your visits to this and other websites. If you decline cookies in our banner, we will not use them for personalised advertising. Our pages also load fonts from Google Fonts, which means your browser contacts Google servers when a page opens.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">How to control cookies</h2>
          <p className="mt-2">You can change your choice at any time by clearing this site's data in your browser settings, which will show the banner again on your next visit. All major browsers also let you block or delete cookies. Blocking cookies does not stop you from using any tool or reading any article on Elvyy. To opt out of personalised ads across the web, visit Google's Ads Settings page.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Changes to this policy</h2>
          <p className="mt-2">We may update this policy when the site changes, for example when advertising is turned on. The date at the top shows the latest update.</p>
        </section>

        <section>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-2">Questions about cookies on Elvyy can be sent to hajabatool01@gmail.com. See also our Privacy Policy for how personal data is handled.</p>
        </section>
      </div>
    </div>
  );
}
