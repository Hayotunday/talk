import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const generateSummary = async (transcript: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const prompt = `Summarize the following meeting transcript in 200-300 words, highlighting key points, decisions, and action items:\n\n${transcript}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};
