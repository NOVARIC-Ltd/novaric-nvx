"use client";
import { useEffect, useState } from "react";

export default function AISummary() {
  const [text, setText] = useState("Loading AI insight…");
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    fetch("/.netlify/functions/ai-analyze")
      .then(r => r.json())
      .then(d => {
        setText(d.summary || "AI analysis is currently unavailable. Please try again later.");
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch AI summary", err);
        setText("Could not connect to the AI analysis service.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 border border-gray-800 rounded-2xl bg-gradient-to-br from-gray-900/50 to-transparent">
      <h3 className="font-semibold mb-3 text-gray-200">Gemini AI Insight</h3>
      {loading ? (
        <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      ) : (
        <p className="text-gray-300 whitespace-pre-line leading-relaxed">{text}</p>
      )}
    </div>
  );
}
