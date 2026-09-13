import { NextRequest, NextResponse } from "next/server";
import { extractJson } from "@/lib/ai-helpers";

type Outline = { title: string; headings: string[] };

export async function POST(req: NextRequest) {
  try {
    const { topic, wordRange } = await req.json();

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json(
        { error: "Please enter a topic." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI is not configured yet. Add GROQ_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const prompt = `Create 2 different blog post outlines for the topic: "${topic.trim()}". The final blog will be roughly ${wordRange || "800-1200"} words. Each outline should take a different angle or structure. Each outline needs a "title" and a "headings" array of 4 to 7 H2-level section headings (no numbering, just the heading text). Return ONLY a valid JSON array of exactly 2 objects like {"title": "...", "headings": ["...", "..."]}, nothing else, no markdown formatting.`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
        }),
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "The free rate limit has been reached, please try again shortly." },
          { status: 429 }
        );
      }
      const errText = await response.text();
      return NextResponse.json(
        { error: "Could not generate outlines right now.", detail: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content || "";
    const outlines = extractJson<Outline[]>(rawText);

    if (!outlines || !Array.isArray(outlines)) {
      return NextResponse.json(
        { error: "Could not parse the AI response. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ outlines });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
