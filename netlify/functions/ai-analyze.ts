import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const handler: Handler = async (event) => {
  try {
    const baseUrl = process.env.URL;
    if (!baseUrl) {
      throw new Error("Base URL (process.env.URL) is not available.");
    }

    const res = await fetch(`${baseUrl}/.netlify/functions/getPrice`);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch price data: ${res.status} - ${errorText}`);
    }
    const { priceUsd, liquidityUsd, volume24hUsd } = await res.json();

    const model = 'gemini-2.5-pro';
    const prompt = `
Act as a DeFi analyst. Using the following NVX token metrics:

- Price (USD): ${priceUsd}
- Liquidity (USD): ${liquidityUsd}
- 24h Volume (USD): ${volume24hUsd}

1) Summarize market health and liquidity confidence in 2–4 sentences.
2) Provide one short risk note if applicable.
3) Provide one actionable next step for transparency (e.g., locking, auditing, router control).

Keep it concise, factual, and investor-friendly.
    `;
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const summary = response.text;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
      },
      body: JSON.stringify({ summary })
    };
  } catch (e) {
    console.error("Gemini analysis error:", e);
    const message = e instanceof Error ? e.message : "An unknown error occurred during AI analysis.";
    return { 
        statusCode: 500, 
        body: JSON.stringify({ error: "gemini_failed", message }) 
    };
  }
};
