import type { Metadata } from "next";
import NustAggregateCalculator from "@/components/tools/NustAggregateCalculator";

const title = "NUST Aggregate Calculator 2026, Free, No Login";
const description =
  "Free NUST aggregate calculator: 10% Matric, 15% FSc Part I, 75% NET. Find the NET marks you need for your target. Unlimited free, no account needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/nust-aggregate-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/nust-aggregate-calculator",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "NUST Aggregate Calculator",
            description,
            url: "https://elvyy.com/tools/nust-aggregate-calculator",
            applicationCategory: "UtilityApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <NustAggregateCalculator />
    </>
  );
}
