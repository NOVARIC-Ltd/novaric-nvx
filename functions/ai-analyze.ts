import type { Handler } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const handler: Handler = async () => {
  try {
    const res = await fetch(`${process.env.URL}/.netlify/functions/getPrice`);
    const { priceUsd, liquidityUsd, volume24h } = await res.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });
    const prompt = `
Act as a DeFi analyst. Using the following NVX token metrics:

- Price (USD): ${priceUsd}
- Liquidity (USD): ${liquidityUsd}
- 24h Volume (USD): ${volume24h}

1) Summarize market health and liquidity confidence in 2–4 sentences.
2) Provide one short risk note if applicable.
3) Provide one actionable next step for transparency (e.g., locking, auditing, router control).

Keep it concise, factual, and investor-friendly.
    `;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    return { statusCode: 200, body: JSON.stringify({ summary }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: "gemini_failed" }) };
  }
};
