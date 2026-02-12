import { GoogleGenAI } from "@google/genai";
import { BasicPromptDto } from "../dtos/basic-prompt.dto";

interface Options {
    model?: string;
    systemInstruction?: string;
}

export const basicPromptUseCase = async (
    ai: GoogleGenAI,
    basicPromptDto: BasicPromptDto,
    options?: Options
) => {
    const { 
        model = "gemini-2.5-flash",
        systemInstruction = 
            `Responde únicamente en español
            en formato markdown
            con un tono amigable
            de manera resumida
            no más de 5 renglones
            usa el sistema metrico decimal
            `
    } = options || {};

    const response = await ai.models.generateContent({
        model,
        contents: basicPromptDto.prompt,
        config: { systemInstruction }
    });
    return response.text
}
