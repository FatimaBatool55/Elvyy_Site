import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const trimmed = text.slice(0, 15000);

    const params = new URLSearchParams();
    params.append("text", trimmed);
    params.append("language", "en-US");

    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Grammar check service is busy, please try again in a moment." },
        { status: 503 }
      );
    }

    const data = await response.json();

    const matches = (data.matches || []).map(
      (m: {
        message: string;
        shortMessage?: string;
        offset: number;
        length: number;
        replacements?: { value: string }[];
        rule?: { category?: { id?: string; name?: string } };
      }) => ({
        message: m.shortMessage || m.message,
        offset: m.offset,
        length: m.length,
        replacements: (m.replacements || []).slice(0, 3).map((r) => r.value),
        category: m.rule?.category?.id || "OTHER",
        categoryName: m.rule?.category?.name || "Other",
        context: trimmed.slice(
          Math.max(0, m.offset - 25),
          m.offset + m.length + 25
        ),
      })
    );

    return NextResponse.json({ matches });
  } catch {
    return NextResponse.json(
      { error: "Could not run grammar check right now. Try again shortly." },
      { status: 500 }
    );
  }
}
