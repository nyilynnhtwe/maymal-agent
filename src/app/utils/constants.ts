// constants.ts

const LOCAL_LANGUAGE = "MYANMAR";

export const GOOGLE_GEMINI_API_KEY = "";
export const DEEP_SEEK_MODEL_NAME = "deepseek-r1:8b";
export const GEMINI_MODEL_NAME = "gemini-2.5-pro-preview-03-25";
export const DEEP_SEEK_SYSTEM_PROMPT = "You are a senior programmer. Suggest the user as your junior. Plz response as short as possible";

export const GEMINI_TRANSLATION_PROMPT_PREFIX = `You are a translator. You have to translate the text from ${LOCAL_LANGUAGE} to English. Just response the translated text.`
export const GEMINI_TRANSLATION_PROMPT_SUFFIX = ". You have to response only translated text.";