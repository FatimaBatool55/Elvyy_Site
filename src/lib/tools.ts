export type Tool = {
  slug: string;
  name: string;
  short: string;
  description: string;
  category: string;
};

export const tools: Tool[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    short: "Count words, characters & reading time",
    description:
      "Paste any text to see live word count, character count, sentence count, and estimated reading time.",
    category: "Writing",
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    short: "Turn any link or text into a QR code",
    description:
      "Generate a downloadable QR code from a URL or plain text, instantly, in your browser.",
    category: "Utility",
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    short: "Find exact age in years, months & days",
    description:
      "Enter a birth date to get an exact age breakdown, plus days until your next birthday.",
    category: "Everyday",
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    short: "Convert length, weight & temperature",
    description:
      "Quickly convert between metric and imperial units for length, weight, and temperature.",
    category: "Everyday",
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
