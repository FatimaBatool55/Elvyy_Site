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
  {
    slug: "final-grade-calculator",
    name: "Final Grade Calculator",
    short: "Find the score you need on what's left",
    description:
      "Enter your completed grades and their weights to find exactly what score you need on your remaining work to hit your target grade.",
    category: "Student",
  },
  {
    slug: "study-plan-spreader",
    name: "Study Plan Spreader",
    short: "Turn deadlines into a daily study schedule",
    description:
      "Add your assignments, exams, and their deadlines to get a realistic day-by-day study plan that spreads the work evenly and flags overload.",
    category: "Student",
  },
  {
    slug: "task-splitter",
    name: "Group Project Task Splitter",
    short: "Fairly split tasks across group members",
    description:
      "List your tasks with an effort score and your group members, and get a fair, balanced split with imbalance flagged automatically.",
    category: "Student",
  },
  {
    slug: "keyword-density-checker",
    name: "Keyword Density Checker",
    short: "Check keyword frequency in your content",
    description:
      "Paste your content to see how often each word and phrase appears, with keyword stuffing flagged automatically.",
    category: "SEO",
  },
  {
    slug: "readability-checker",
    name: "Readability Score Checker",
    short: "Check grade level and sentence complexity",
    description:
      "Paste your writing to get a reading ease score, grade level, passive voice percentage, and complex sentences highlighted.",
    category: "SEO",
  },
  {
    slug: "meta-description-generator",
    name: "AI Meta Description Generator",
    short: "Generate SEO meta descriptions with AI",
    description:
      "Paste your blog content to get 4 AI-generated, SEO-optimized meta description options in the ideal length range.",
    category: "SEO",
  },
  {
    slug: "blog-title-generator",
    name: "AI Blog Title Generator",
    short: "Generate SEO blog titles with AI",
    description:
      "Enter a topic or keyword to get 10 AI-generated, SEO-friendly blog title options from different angles.",
    category: "SEO",
  },
  {
    slug: "ai-blog-generator",
    name: "AI Blog Generator",
    short: "Generate a full blog draft with AI",
    description:
      "Enter a topic and word count, choose from two AI-generated outlines, and get a full blog post draft to edit and publish.",
    category: "SEO",
  },
];

export function getTool(slug: string) {
  return tools.find((t) => t.slug === slug);
}
