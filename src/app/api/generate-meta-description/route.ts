import { NextRequest, NextResponse } from "next/server";
import { extractJson } from "@/lib/ai-helpers";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string" || content.trim().length < 50) {
      return NextResponse.json(
        { error: "Please paste at least a few sentences of content." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI is not configured yet. Add GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const prompt = `Generate 4 SEO-optimized meta descriptions for the following blog content. Each must be between 140 and 160 characters, accurately summarize the content, and include a natural reason to click. Return ONLY a valid JSON array of 4 strings, nothing else, no markdown formatting.

Content:
"""
${content.slice(0, 6000)}
"""`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      if (response.status === 429) {
        return NextResponse.json(
          { error: "The free daily limit has been reached, please try again later." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Could not generate descriptions right now.", detail: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const descriptions = extractJson<string[]>(rawText);

    if (!descriptions || !Array.isArray(descriptions)) {
      return NextResponse.json(
        { error: "Could not parse the AI response. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ descriptions });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
