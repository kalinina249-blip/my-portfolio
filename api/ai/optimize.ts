import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Type } from "@google/genai";

// Pre-initialize or lazy-initialize Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please add it in your Vercel Project Settings > Environment Variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build-vercel",
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Guard for POST request only
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { productName, productDesc, platform } = req.body;

    if (!productName) {
      return res.status(400).json({ error: "Product name is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `
      You are Tatiana Kalinina's custom AI Marketplace Assistant. Tatiana is a top-5 marketplace manager who achieves massive turnovers and uses cutting-edge AI for content design. 
      Your task is to take a product name, optional description, and target platform (like Wildberries, Ozon, Yandex Market) and generate high-converting Russian SEO tags, titles, descriptions, strategic promotion tips, and a breakdown of image generation prompts for visual creators.
      Must respond strictly in Russian language (except technical keywords or prompt keywords if necessary) inside a structured JSON.
    `;

    const userPrompt = `
      Target Platform: ${platform || "Wildberries"}
      Product Name: ${productName}
      Raw Description: ${productDesc || "No description provided."}
      
      Generate:
      1. A high-converting optimized SEO Title (max 60 chars) designed to increase CTR.
      2. A persuasive, rich marketplace Description highlighting key selling points (UTP), structured with paragraphs and list points.
      3. A list of 8 high-SEO search terms and keywords.
      4. 3 detailed photographic prompts in English to generate marketplace cover illustrations in Midjourney/Flux (Hero shot, detail close-up, and lifestyle story shot).
      5. 3 battle-tested strategic advice tips for starting sales in this category based on Татьяна's top-5 seller experience (pricing, promo, logistics).
    `;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["seoTitle", "seoDescription", "keywords", "aiPhotoPrompts", "strategicAdvice"],
          properties: {
            seoTitle: {
              type: Type.STRING,
              description: "Optimized marketplace SEO Title",
            },
            seoDescription: {
              type: Type.STRING,
              description: "Persuasive product description with marketplace optimization",
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of exactly 8 high-relevance SEO keywords",
            },
            aiPhotoPrompts: {
              type: Type.OBJECT,
              required: ["hero", "details", "lifestyle"],
              properties: {
                hero: {
                  type: Type.STRING,
                  description: "English prompt for Midjourney/Flux for the main hero thumbnail",
                },
                details: {
                  type: Type.STRING,
                  description: "English prompt showing zoomed visual details or materials",
                },
                lifestyle: {
                  type: Type.STRING,
                  description: "English prompt showing the product in premium real-use environment",
                },
              },
            },
            strategicAdvice: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 strategic marketplace expert tips",
            },
          },
        },
      },
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error("Empty response from AI engine");
    }

    const parsedData = JSON.parse(responseText.trim());
    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error("AI Optimization failed under Vercel Serverless Function:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
      details: "Could not optimize listing under serverless function. Check GEMINI_API_KEY environment variable."
    });
  }
}
