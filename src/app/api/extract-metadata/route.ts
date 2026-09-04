import { NextRequest, NextResponse } from "next/server";

function extractMeta(html: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return "";
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ElvyyCitationBot/1.0; +https://elvyy.com)",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not fetch this page" },
        { status: 422 }
      );
    }

    const html = await response.text();

    const title = decodeHtmlEntities(
      extractMeta(html, [
        /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i,
        /<title[^>]*>([^<]+)<\/title>/i,
      ])
    );

    const author = decodeHtmlEntities(
      extractMeta(html, [
        /<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']author["']/i,
        /<meta[^>]+property=["']article:author["'][^>]+content=["']([^"']+)["']/i,
      ])
    );

    const siteName = decodeHtmlEntities(
      extractMeta(html, [
        /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:site_name["']/i,
      ])
    ) || parsedUrl.hostname.replace(/^www\./, "");

    const publishedDate = decodeHtmlEntities(
      extractMeta(html, [
        /<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+name=["']date["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+name=["']publish-date["'][^>]+content=["']([^"']+)["']/i,
      ])
    );

    let year = "";
    let fullDate = "";
    if (publishedDate) {
      const d = new Date(publishedDate);
      if (!isNaN(d.getTime())) {
        year = String(d.getFullYear());
        fullDate = d.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      }
    }

    return NextResponse.json({
      title,
      author,
      siteName,
      year,
      fullDate,
      url: parsedUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not extract details from this page" },
      { status: 500 }
    );
  }
}
