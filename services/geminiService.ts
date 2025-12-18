
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizeDocumentDescription = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é um assistente jurídico e administrativo. Resuma o seguinte texto de descrição de documento para um formato de protocolo conciso e profissional em Português: "${text}"`,
    });
    return response.text || "Não foi possível gerar o resumo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao processar com IA.";
  }
};

export const suggestCategory = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Com base na descrição do documento: "${description}", sugira uma categoria curta (ex: Contrato, Nota Fiscal, Ofício, Pessoal, RH). Retorne apenas a palavra da categoria.`,
    });
    return response.text?.trim() || "Geral";
  } catch (error) {
    return "Outros";
  }
};
