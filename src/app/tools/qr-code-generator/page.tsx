import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "QR Code Generator, 100% Free, No Login",
  description:
    "Turn any link or text into a downloadable QR code instantly. Unlimited free, no account needed.",
  alternates: { canonical: "/tools/qr-code-generator" },
  openGraph: {
    title: "QR Code Generator, 100% Free, No Login",
    description:
      "Turn any link or text into a downloadable QR code instantly. Unlimited free, no account needed.",
    url: "https://elvyy.com/tools/qr-code-generator",
  },
};

export default function Page() {
  const tool = getTool("qr-code-generator")!;
  return (
    <ToolShell tool={tool}>
      <QrCodeGenerator />
          <div className="mt-12 max-w-2xl space-y-6 border-t border-line pt-10 text-sm leading-relaxed text-ink-soft">
      <section>
        <h2 className="font-display text-xl text-ink">What you can encode in a QR code</h2>
        <p className="mt-2">QR codes can store any text up to a few thousand characters. The most common uses are website URLs, contact information as a vCard, WiFi credentials so guests can connect by scanning, plain text messages, and email addresses. URLs are by far the most scanned type because they open directly in a phone browser without any app required.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Best practices before printing or sharing</h2>
        <p className="mt-2">Always test the QR code by scanning it yourself before putting it on a flyer, business card, or presentation. Make sure the destination URL is correct and working. Printed QR codes should be at least 2 by 2 centimeters to scan reliably. Avoid placing them on curved surfaces or in low-contrast color combinations such as yellow on white.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Common uses you may not have considered</h2>
        <p className="mt-2">Restaurants use QR codes to link to digital menus so they never need to reprint when prices change. Event organizers link to registration forms or schedules. Teachers share reading materials with students by posting a code in the classroom. Freelancers put QR codes on business cards that link directly to their portfolio. Once you start noticing how many physical spaces could benefit from a scannable link, the use cases feel endless.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Why QR codes are more reliable than short links</h2>
        <p className="mt-2">Short links depend on a third-party service staying active. If that service closes or changes its pricing, your short link breaks. A QR code generated from the original URL stores the destination directly in the pattern itself. There is no middleman, no expiry date, and no monthly fee. The code you download today will still work in ten years as long as the destination URL remains active.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Why this generator has no usage limit</h2>
        <p className="mt-2">The QR code is generated entirely in your browser using a public image API. No data you enter is stored on any server. You can generate as many codes as you need, for any purpose, without creating an account or hitting a daily cap.</p>
      </section>
      <section>
        <h2 className="font-display text-xl text-ink">Frequently asked questions</h2>
        <div className="mt-3 space-y-4">
          {[
            { q: "Can I edit a QR code after generating it?", a: "No. A QR code encodes a fixed piece of text or URL at the moment it is generated. If you need to change the destination, generate a new code and replace the old one wherever it appears." },
            { q: "How much text can a QR code store?", a: "A standard QR code can store up to around 4,000 characters of text or about 3,000 alphanumeric characters. For most URLs and short messages this limit is never a concern." },
            { q: "Do QR codes expire?", a: "QR codes generated from a direct URL never expire on their own. The code remains valid as long as the URL it points to is still active." },
            { q: "Can I use a QR code for WiFi sharing?", a: "Yes. Enter your WiFi network name and password as plain text and generate a code. Guests scan it and their phone prompts them to connect automatically on most modern devices." },
          ].map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-lg text-ink">{f.q}</h3>
              <p className="mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </ToolShell>
  );
}
