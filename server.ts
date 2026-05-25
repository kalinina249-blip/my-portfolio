/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please add it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API: AI Optimization for marketplaces
app.post("/api/ai/optimize", async (req, res) => {
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
    return res.json(parsedData);
  } catch (error: any) {
    console.error("AI Optimization failed:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
      details: "Could not optimize listing. Check that GEMINI_API_KEY is configured."
    });
  }
});

// Configure Vite or Static Files
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server and Vite development mounting at http://localhost:${PORT}`);
  });
}

start();
