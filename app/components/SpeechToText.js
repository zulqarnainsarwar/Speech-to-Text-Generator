import React, { useState, useEffect } from "react";

const SpeechToText = ({ onTextResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Ensure SpeechRecognition is available in the browser
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = "en-US";
        recognitionInstance.interimResults = false;
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onresult = (event) => {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          onTextResult(result);
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      } else {
        console.error("SpeechRecognition API not supported");
      }
    }
  }, []);

  const handleListen = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };

  return (
    <div className=" space-y-2 flex justify-center items-center flex-col">
      <button
        onClick={handleListen}
        className="bg-blue-600 px-3 py-2 rounded text-white"
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p className="border w-auto max-w-sm border-rose-950	 rounded  p-4">
        <b> Transcript:</b> <span>{transcript}</span>
      </p>
    </div>
  );
};

export default SpeechToText;
