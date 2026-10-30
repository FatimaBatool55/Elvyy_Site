import type { Metadata } from "next";
import GikiAggregateCalculator from "@/components/tools/GikiAggregateCalculator";

const title = "GIKI Aggregate Calculator 2026, Free, No Login";
const description =
  "Free GIKI aggregate calculator: 15% Matric and 85% entry test. FSc is not counted. Find the test marks you need. Unlimited free, no account needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tools/giki-aggregate-calculator" },
  openGraph: {
    title,
    description,
    url: "https://elvyy.com/tools/giki-aggregate-calculator",
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
            name: "GIKI Aggregate Calculator",
            description,
            url: "https://elvyy.com/tools/giki-aggregate-calculator",
            applicationCategory: "UtilityApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <GikiAggregateCalculator />
    </>
  );
}
