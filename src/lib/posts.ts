export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "simple-budgeting-habits",
    title: "Five budgeting habits that actually stick",
    excerpt:
      "Most budgeting advice fails because it asks for too much discipline too soon. Here's a gentler way in.",
    category: "Money",
    date: "2026-08-01",
    readTime: "5 min read",
    content: [
      "Most people don't quit budgeting because the math is hard. They quit because the system asks for more attention than their life can spare in week three.",
      "A habit that survives a busy month beats a perfect spreadsheet that gets abandoned. Start with one number: what you can safely spend this week without checking anything else.",
      "Automate the boring parts first, savings transfers, bill payments, so the only decision left is the fun kind: where the remaining money goes.",
      "Review weekly, not daily. Daily tracking creates fatigue; a five-minute Sunday check-in creates awareness without dread.",
      "Finally, let the budget change as your life does. A system built for a version of you from a year ago will always feel like it's fighting you.",
    ],
  },
  {
    slug: "better-sleep-without-gadgets",
    title: "Better sleep without buying anything",
    excerpt:
      "No gadgets, no supplements, just the handful of changes that consistently make a measurable difference.",
    category: "Health",
    date: "2026-07-22",
    readTime: "4 min read",
    content: [
      "Light exposure in the first hour after waking is one of the most underrated levers for sleep quality that night. It anchors your body's clock more reliably than anything you do before bed.",
      "A consistent wake time matters more than a consistent bed time. Your body adjusts sleep pressure around when you get up, not when you lie down.",
      "Caffeine's half-life is longer than most people assume, a 3pm coffee can still be measurably in your system at 9pm.",
      "The bedroom should be boring: cool, dark, and associated only with sleep. If you can't sleep after twenty minutes, leave the room rather than lying there frustrated.",
    ],
  },
  {
    slug: "start-a-small-garden",
    title: "Starting a small garden when you have no space",
    excerpt:
      "A windowsill, a balcony, or a single sunny corner is enough to start. Here's what actually grows well.",
    category: "Lifestyle",
    date: "2026-07-10",
    readTime: "6 min read",
    content: [
      "Space is rarely the real constraint, light is. Before choosing plants, spend two days simply noticing which spot in your home gets direct sun, and for how long.",
      "Herbs are the most forgiving place to start: mint, coriander, and chillies tolerate inconsistent watering far better than most vegetables.",
      "Containers need drainage holes, no exceptions. Waterlogged roots are the single most common reason first gardens fail.",
      "Expect to lose a few plants while you learn your specific light and watering rhythm. That's not failure, that's the actual learning process every gardener goes through.",
    ],
  },
  {
    slug: "focus-without-willpower",
    title: "Focus is a environment problem, not a willpower problem",
    excerpt:
      "If you're relying on discipline to stay off your phone, you're fighting a battle you don't need to fight.",
    category: "Productivity",
    date: "2026-06-28",
    readTime: "5 min read",
    content: [
      "Willpower is a finite resource that depletes across the day. Environment design doesn't deplete, a phone in another room stays effective at 6pm the same way it does at 9am.",
      "The most effective change is usually the most boring one: physical distance. Friction added between you and a distraction is worth more than any amount of self-control.",
      "Batch shallow work, email, messages, into two or three fixed windows instead of letting it interrupt continuously through the day.",
      "Protect your first hour. Whatever you do before checking messages tends to set the tone for how the rest of the day gets used.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
