import { NextResponse } from "next/server";

export async function POST(request) {
  const { text, targetLanguage } = await request.json();

  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLanguage,
      }),
    });

    if (!response.ok) {
      // Read response text to get more details about the error
      const errorText = await response.text();
      console.error(`API Error: ${errorText}`);
      return NextResponse.json(
        { error: `API Error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ translatedText: data.translatedText });
  } catch (error) {
    console.error("Error translating text:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
