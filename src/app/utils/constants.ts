// constants.ts

export const GOOGLE_GEMINI_API_KEY = "";
export const DEEP_SEEK_MODEL_NAME = "deepseek-r1:8b";
export const GEMINI_MODEL_NAME = "gemini-2.5-pro-preview-03-25";
export const DEEP_SEEK_SYSTEM_PROMPT = "You are a senior programmer. Suggest the user as your junior. Plz response as short as possible";


export const GEMINI_TRANSLATION_PROMPT = `You are a professional translator. 
Follow these rules:
1. Preserve technical terms
2. Maintain original tone
3. Keep proper nouns unchanged

Translate following text to the specified language while following these rules:`;

export const GEMINI_TRANSLATION_PROMPT_SUFFIX = ". You have to response only translated text.";