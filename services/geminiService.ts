import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Select model based on guidelines for basic text tasks
const MODEL_NAME = "gemini-3-flash-preview";

export const generatePlayerTitle = async (profile: UserProfile): Promise<string> => {
  try {
    const prompt = `
      Crie um título de jogador de videogame curto, épico e divertido (máximo 4 palavras) para este usuário:
      Apelido: ${profile.nickname}
      Idade: ${profile.age}
      Gênero: ${profile.gender}
      
      O título deve ser em Português. Exemplo: "O Destruidor de Pixels", "A Víbora Veloz".
      Retorne apenas o texto do título.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text?.trim() || `${profile.nickname} o Jogador`;
  } catch (error) {
    console.error("Error generating title:", error);
    return `${profile.nickname} o Bravo`;
  }
};

export const generateGameCommentary = async (
  profile: UserProfile, 
  score: number, 
  event: 'start' | 'game_over' | 'high_score'
): Promise<string> => {
  try {
    let context = "";
    if (event === 'start') {
      context = "O jogador acabou de entrar na arena. Dê uma frase de encorajamento curta ou um aviso ameaçador.";
    } else if (event === 'game_over') {
      context = `O jogador perdeu com uma pontuação de ${score}. Dê um comentário sarcástico ou consolador, dependendo de quão baixa ou alta foi a pontuação (Score alto é > 10).`;
    }

    const prompt = `
      Você é um narrador de e-sports futurista e carismático.
      Jogador: ${profile.nickname} (${profile.title || 'Iniciante'})
      Contexto: ${context}
      
      Responda em Português do Brasil. Máximo de 2 frases curtas.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text?.trim() || (event === 'start' ? "Boa sorte!" : "Fim de jogo!");
  } catch (error) {
    console.error("Error generating commentary:", error);
    return event === 'start' ? "Prepare-se..." : "Tente novamente!";
  }
};
