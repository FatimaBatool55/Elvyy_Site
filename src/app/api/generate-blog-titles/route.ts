import { NextRequest, NextResponse } from "next/server";
import { extractJson } from "@/lib/ai-helpers";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return NextResponse.json(
        { error: "Please enter a topic or keyword." },
        { status: 400 }
      );
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI is not configured yet. Add MISTRAL_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const prompt = `Generate 10 SEO-friendly blog title options for the topic: "${topic.trim()}". Use a mix of angles: question-based, listicle (with numbers), how-to, comparison, and curiosity-driven. Return ONLY a valid JSON array of 10 strings, nothing else, no markdown formatting.`;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "The free rate limit has been reached, please try again in a minute." },
          { status: 429 }
        );
      }
      const errText = await response.text();
      return NextResponse.json(
        { error: "Could not generate titles right now.", detail: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data?.choices?.[0]?.message?.content || "";
    const titles = extractJson<string[]>(rawText);

    if (!titles || !Array.isArray(titles)) {
      return NextResponse.json(
        { error: "Could not parse the AI response. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ titles });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
