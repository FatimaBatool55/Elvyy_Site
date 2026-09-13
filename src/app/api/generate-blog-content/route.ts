import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic, outline, wordRange } = await req.json();

    if (!topic || !outline || !outline.title || !Array.isArray(outline.headings)) {
      return NextResponse.json(
        { error: "Missing topic or outline." },
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

    const headingsList = outline.headings
      .map((h: string, i: number) => `${i + 1}. ${h}`)
      .join("\n");

    const prompt = `Write a complete blog post on the topic: "${topic}".

Title: ${outline.title}

Follow this exact section structure, using each heading as an H2:
${headingsList}

Target length: roughly ${wordRange || "800-1200"} words total.

Write in clear, natural, plain English. Avoid filler intros, avoid restating the heading as the first sentence of each section, and avoid overly promotional or exaggerated language. Do not include a meta description or title tag, just the article body starting from the first section. Format each H2 heading on its own line starting with "## ".`;

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
          temperature: 0.7,
        }),
        signal: AbortSignal.timeout(45000),
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
        { error: "Could not generate the blog post right now.", detail: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";

    if (!content) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
