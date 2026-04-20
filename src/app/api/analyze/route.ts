import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Missing GOOGLE_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GOOGLE_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Analyze the main object in this image and provide a professional recycling report.\n\nInclude:\n* Object name\n* Material(s)\n* Whether it is recyclable (Yes / No / Sometimes)\n* Common places where it can be recycled\n* Estimated contribution of this type of waste to ocean pollution\n* One short environmental impact sentence\n* One short disposal recommendation\n\nImportant:\n* Do not invent exact statistics if uncertain.\n* Use cautious estimates or general statements instead.\n* Keep the tone professional and concise.\n\nFormat EXACTLY like this:\n\nObject: ...\nMaterial: ...\nRecyclable: ...\nRecycle At: ...\nOcean Pollution Contribution: ...\nImpact: ...\nRecommendation: ...",
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    console.log("Gemini status:", geminiResponse.status);
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    if (!geminiResponse.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gemini request failed",
        },
        { status: geminiResponse.status }
      );
    }

    const result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No analysis result returned.";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Server error during analysis" },
      { status: 500 }
    );
  }
}