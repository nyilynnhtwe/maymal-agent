import {
  GEMINI_MODEL_NAME,
  GEMINI_TRANSLATION_PROMPT,
  GOOGLE_GEMINI_API_KEY
} from "@/app/utils/constants";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";



process.env.GOOGLE_API_KEY = GOOGLE_GEMINI_API_KEY;

const GEMINI_LLM = new ChatGoogleGenerativeAI({
  model: GEMINI_MODEL_NAME,
});


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt;
    const language = body.language || "en"; // Default to English if no language is provided

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const fullPrompt = `${GEMINI_TRANSLATION_PROMPT}
    Text to translate: ${prompt}
    Target language: ${language}
    Translation:`;

    const result_from_gemini = await GEMINI_LLM.invoke(
      fullPrompt
    );
    return new Response(JSON.stringify({ result: result_from_gemini.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in API:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
