import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://elvyy.com"),
  title: {
    default: "Elvyy, Free tools & everyday reading",
    template: "%s",
  },
  description:
    "Free, unlimited-use tools for everyday tasks, plus a blog covering life, money, health, and more. No signups, no limits.",
  openGraph: {
    siteName: "Elvyy",
    type: "website",
    locale: "en_US",
    title: "Elvyy, Free tools & everyday reading",
    description:
      "Free, unlimited-use tools for everyday tasks, plus a blog covering life, money, health, and more. No signups, no limits.",
    url: "https://elvyy.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvyy, Free tools & everyday reading",
    description:
      "Free, unlimited-use tools for everyday tasks, plus a blog covering life, money, health, and more.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Elvyy",
              url: "https://elvyy.com",
              description:
                "Free online tools and practical articles on money, health, productivity, and lifestyle.",
              founder: {
                "@type": "Person",
                name: "Fatima Batool",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
