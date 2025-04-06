"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function PromptFlow() {
  const [prompt, setPrompt] = useState("");
  const [geminiResult, setGeminiResult] = useState("");
  const [deepSeekResult, setDeepSeekResult] = useState("");
  const [isDeepSeekLoading, setIsDeepSeekLoading] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    try {
      setIsDeepSeekLoading(true);
      toast.loading("Sending to DeepSeek...");

      const deepSeekRes = await fetch("/api/prompt/deepseek", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
      });

      const deepSeekData = await deepSeekRes.json();
      if (!deepSeekRes.ok) throw new Error(deepSeekData.error);

      toast.dismiss();
      toast.success("DeepSeek responded!");
      setDeepSeekResult(deepSeekData.result);
      setIsDeepSeekLoading(false);

      setIsGeminiLoading(true);
      toast.loading("Sending to Gemini...");

      const geminiRes = await fetch("/api/prompt/gemini", {
        method: "POST",
        body: JSON.stringify({ prompt: deepSeekData.result }),
        headers: { "Content-Type": "application/json" },
      });

      const geminiData = await geminiRes.json();
      if (!geminiRes.ok) throw new Error(geminiData.error);

      toast.dismiss();
      toast.success("Gemini responded!");
      setGeminiResult(geminiData.result);
      setIsGeminiLoading(false);
    } catch (err: any) {
      toast.dismiss();
      toast.error("Error: " + err.message);
      setIsDeepSeekLoading(false);
      setIsGeminiLoading(false);
    }
  };

  return (
    <div className="overflow-auto max-w-6xl mx-auto mt-10 p-6 md:p-10 bg-white shadow-xl rounded-2xl space-y-6">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center">🙋‍♀️🙋🏼‍♀️🙋🏿‍♀️ May Mal Agent 🙋🏿‍♂️🙋🏻‍♂️🙋‍♂️</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handlePromptSubmit();
            }
          }}
        />
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handlePromptSubmit}
        >
          Translate
        </button>
      </div>

      {(isDeepSeekLoading || isGeminiLoading || geminiResult || deepSeekResult) && (
        <div className={`grid mt-6 gap-6 ${(deepSeekResult || geminiResult) ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          <motion.div
            className="p-5 bg-green-50 border border-green-200 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-semibold text-lg mb-2">DeepSeek Result:</h2>
            <p className="whitespace-pre-wrap break-words max-h-96 overflow-auto">
              {isDeepSeekLoading ? (
                <span className="text-gray-500">Loading...</span>
              ) : deepSeekResult}
            </p>
          </motion.div>

          <motion.div
            className="p-5 bg-blue-50 border border-blue-200 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="font-semibold text-lg mb-2">Gemini Result:</h2>
            <p className="whitespace-pre-wrap break-words max-h-96 overflow-auto">
              {isGeminiLoading ? (
                <span className="text-gray-500">Loading...</span>
              ) : geminiResult}
            </p>
          </motion.div>
        </div>
      )}

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Nyilynn Htwe. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/nyilynnhtwe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://x.com/lynnthelight"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}