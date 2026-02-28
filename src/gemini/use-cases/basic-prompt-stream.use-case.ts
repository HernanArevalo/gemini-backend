import { GoogleGenAI } from "@google/genai";
import { BasicPromptDto } from "../dtos/basic-prompt.dto";

interface Options {
    model?: string;
    systemInstruction?: string;
}

export const basicPromptStreamUseCase = async (
    ai: GoogleGenAI,
    basicPromptDto: BasicPromptDto,
    options?: Options
) => {
    const {
        model = "gemini-3-flash",
        systemInstruction =
        `Responde únicamente en español
            en formato markdown
            con un tono amigable
            usa el sistema metrico decimal
            `
    } = options || {};

    const response = await ai.models.generateContentStream({
        model,
        contents: basicPromptDto.prompt,
        config: { systemInstruction }
    });
    return response
}

