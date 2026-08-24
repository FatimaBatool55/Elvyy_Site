export type Tool = {
  slug: string;
  name: string;
  short: string;
  description: string;
  category: string;
};

export const tools: Tool[] = [
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    short: "Turn any link or text into a QR code",
    description:
      "Generate a downloadable QR code from a URL or plain text, instantly, in your browser.",
    category: "Utility",
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    short: "Calculate GPA and plan future grades",
    description:
      "Calculate your grade point average from courses and credits, with a custom grade scale and a planner for the GPA you need in future courses.",
    category: "Student",
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
