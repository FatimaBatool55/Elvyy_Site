import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "QR Code Generator — 100% Free, No Login",
  description:
    "Free QR code generator, 100% free with no login and no usage limit. Turn any link or text into a downloadable QR code instantly.",
};

export default function Page() {
  const tool = getTool("qr-code-generator")!;
  return (
    <ToolShell tool={tool}>
      <QrCodeGenerator />
    </ToolShell>
  );
}
