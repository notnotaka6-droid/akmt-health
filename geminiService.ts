
import { GoogleGenAI, Type } from "@google/genai";
import { Language } from "../translations";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSymptoms = async (symptoms: string, language: Language = 'id') => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a professional clinical triage based on these symptoms: "${symptoms}". 
      IMPORTANT: You must provide the summary and specialist recommendation in the language specified: ${language}.
      If the symptoms suggest a severe condition, set urgency to CRITICAL or HIGH.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            urgency: {
              type: Type.STRING,
              description: "LOW, MEDIUM, HIGH, or CRITICAL",
            },
            recommendedSpecialist: {
              type: Type.STRING,
              description: "The type of medical specialist recommended, in the target language.",
            },
            summary: {
              type: Type.STRING,
              description: "A brief professional summary of the condition, in the target language.",
            }
          },
          required: ["urgency", "recommendedSpecialist", "summary"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("AI Triage Error:", error);
    throw error;
  }
};
