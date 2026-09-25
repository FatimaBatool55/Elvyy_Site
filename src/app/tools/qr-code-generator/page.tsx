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
      <div className="mt-12 border-t border-line pt-10 space-y-6 text-sm text-ink-soft leading-relaxed max-w-2xl">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">What you can encode in a QR code</p>
          <p>QR codes can store any text up to a few thousand characters. The most common uses are website URLs, contact information (as a vCard), WiFi credentials so guests can connect by scanning, plain text messages, and email addresses. URLs are by far the most scanned type because they open directly in a phone browser.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Best practices before printing or sharing</p>
          <p>Always test the QR code by scanning it yourself before putting it on a flyer, business card, or presentation. Make sure the destination URL is correct and working. Printed QR codes should be at least 2 by 2 centimeters to scan reliably. Avoid placing them on curved surfaces or in low-contrast color combinations.</p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink mb-2">Why this generator has no usage limit</p>
          <p>The QR code is generated entirely in your browser using a public image API. No data you enter is stored on any server. You can generate as many codes as you need, for any purpose, without creating an account or hitting a daily cap.</p>
        </div>
      </div>
    </ToolShell>
  );
}
