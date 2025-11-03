import { GoogleGenAI } from "@google/genai";
import { NvxData, LiquidityLock } from '../types';

// Fix: Initialize the Google GenAI client. The API key is sourced from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Calls the Gemini API to analyze dashboard data.
 * @param data - The NVX token data.
 * @returns A promise that resolves to a string with the AI's analysis.
 */
export const analyzeDashboardData = async (data: NvxData): Promise<string> => {
  const prompt = `
    You are an AI financial analyst for a blockchain project.
    Analyze the following on-chain data for the NVX token and provide a summary with "Overall Sentiment" and "Potential Risks".
    Keep the analysis concise and easy for an investor to understand.
    Data: ${JSON.stringify(data)}
  `;

  try {
    // Fix: Use the Gemini API to generate content based on the prompt, replacing mock data.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing dashboard data:", error);
    return "Could not retrieve AI analysis at this time. Please try again later.";
  }
};


/**
 * Calls the Gemini API to analyze liquidity lock data.
 * @param locks - The liquidity lock data.
 * @returns A promise that resolves to a string with the AI's analysis.
 */
export const analyzeLiquidityData = async (locks: LiquidityLock[]): Promise<string> => {
  const prompt = `
    You are a DeFi security analyst. 
    Based on this liquidity lock data for the NVX token from UNCX, summarize the token's security and stability.
    Identify key strengths and upcoming events (like unlocks).
    Data: ${JSON.stringify(locks)}
  `;

  try {
    // Fix: Use the Gemini API to generate content based on the prompt, replacing mock data.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing liquidity data:", error);
    return "Could not retrieve AI analysis at this time. Please try again later.";
  }
};
