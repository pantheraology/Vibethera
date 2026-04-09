import { GoogleGenAI } from "@google/genai";
import { PREVIEW_SYSTEM_PROMPT } from '../lib/templates/html-preview';
import { Message } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GenerateOptions {
    useSearch?: boolean;
    useThinking?: boolean;
    systemInstruction?: string;
}

export const generateContent = async (
    prompt: string,
    imageBase64: string | null,
    history: Message[] = [],
    modelId: string,
    options: GenerateOptions
) => {
    const config: any = {
        systemInstruction: options.systemInstruction || PREVIEW_SYSTEM_PROMPT,
    };

    // Only apply thinking budget for models that support it generally, or assume passed model supports it if requested.
    // Gemini 3 series supports thinking.
    if (options.useThinking) {
        config.thinkingConfig = { thinkingBudget: 32768 };
        // Do NOT set maxOutputTokens when using thinking
    }

    if (options.useSearch) {
        config.tools = [{ googleSearch: {} }];
    }

    const contents: any[] = [];

    // Add History
    history.forEach(msg => {
        contents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        });
    });

    const currentParts: any[] = [];
    
    if (imageBase64) {
        // Extract base64 data and mimeType if possible, or assume png/jpeg
        // Assuming the input is a full data URL "data:image/png;base64,..."
        const match = imageBase64.match(/^data:(.+);base64,(.+)$/);
        if (match) {
            currentParts.push({
                inlineData: {
                    mimeType: match[1],
                    data: match[2]
                }
            });
        }
    }

    currentParts.push({ text: prompt });
    contents.push({ role: 'user', parts: currentParts });

    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: contents, // Pass array of contents
            config: config
        });
        
        return {
            text: response.text,
            groundingMetadata: response.candidates?.[0]?.groundingMetadata
        };
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const transcribeAudio = async (audioBase64: string) => {
    // Keep gemini-3-flash-preview for fast audio transcription
    const match = audioBase64.match(/^data:(.+);base64,(.+)$/);
    const mimeType = match ? match[1] : 'audio/wav';
    const data = match ? match[2] : audioBase64;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { mimeType, data } },
                    { text: "Transcribe this audio exactly. Do not add any other text." }
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Transcription Error:", error);
        throw error;
    }
};