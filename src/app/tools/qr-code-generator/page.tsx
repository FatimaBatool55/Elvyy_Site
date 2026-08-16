import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Free QR code generator. Turn any link or text into a downloadable QR code.",
};

export default function Page() {
  const tool = getTool("qr-code-generator")!;
  return (
    <ToolShell tool={tool}>
      <QrCodeGenerator />
    </ToolShell>
  );
}
