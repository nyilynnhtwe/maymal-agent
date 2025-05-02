export function cleanHtmlTags(text: string): string {
    /**
     * Remove HTML tags and the text between <think> and </think> from a string.
     */
    const clean = /<think>.*?<\/think>/g;
    return text.replace(clean, "");
}