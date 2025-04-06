import {
  DEEP_SEEK_MODEL_NAME,
  DEEP_SEEK_SYSTEM_PROMPT,
} from "@/app/utils/constants";
import { Ollama } from "@langchain/ollama";
import { cleanHtmlTags } from "@/app/utils/regex_util";

const DEEP_SEEK_LLM = new Ollama({
  model: DEEP_SEEK_MODEL_NAME,
});



export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const messages_for_deep_seek = DEEP_SEEK_SYSTEM_PROMPT + "User prompt : " + prompt;
    const result_from_deep_seek = await DEEP_SEEK_LLM.invoke(messages_for_deep_seek);
    const cleaned_result = cleanHtmlTags(result_from_deep_seek);
    return new Response(JSON.stringify({ result: cleaned_result }), {
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
