import { GoogleGenerativeAI } from "@google/generative-ai";

// Buscando a chave das variáveis de ambiente do Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

// Configurando o modelo (o gemini-1.5-flash é rápido e econômico)
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
