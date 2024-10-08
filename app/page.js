"use client";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import SpeechToText from "./components/SpeechToText";

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");
  // Function to handle translation
  const handleTextResult = async (text) => {
    try {
      const response = await axios.post("/api/translate", {
        text,
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("Request data:", error.request);
      }
    }
  };

  return (
    <div className="h-screen  justify-center flex ">
      <Head>
        <title>Speech to Text Generator</title>
        <meta
          name="description"
          content="Speech to Text Generate using Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center flex-col space-y-4">
        <h1>Speech to Text Generator</h1>
        <SpeechToText onTextResult={handleTextResult} />
      </main>
    </div>
  );
}
