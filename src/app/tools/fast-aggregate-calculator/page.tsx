import type { Metadata } from "next";
import FastAggregateCalculator from "@/components/tools/FastAggregateCalculator";

const title = "FAST Aggregate Calculator 2026, Free, No Login";
const description =
  "Free FAST aggregate calculator for CS, BBA and Engineering using the official weightage. Find the test score you need. Unlimited free, no account needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/fast-aggregate-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/fast-aggregate-calculator",
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
            name: "FAST Aggregate Calculator",
            description,
            url: "https://elvyy.com/tools/fast-aggregate-calculator",
            applicationCategory: "UtilityApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <FastAggregateCalculator />
    </>
  );
}
