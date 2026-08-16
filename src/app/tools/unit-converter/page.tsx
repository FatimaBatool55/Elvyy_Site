import type { Metadata } from "next";
import ToolShell from "@/components/ToolShell";
import UnitConverter from "@/components/tools/UnitConverter";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Unit Converter",
  description: "Free unit converter for length, weight, and temperature.",
};

export default function Page() {
  const tool = getTool("unit-converter")!;
  return (
    <ToolShell tool={tool}>
      <UnitConverter />
    </ToolShell>
  );
}
