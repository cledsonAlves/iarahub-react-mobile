// services/ia.ts
import { iaraApi } from './config';
import { ENDPOINTS } from './config';

export interface IARecommendationRequest {
  prompt: string;
  system: string;
}

export interface IARecommendationResponse {
  message: string;
  status: number;
}

export const iaService = {
  getRecommendation: async (p0: string, p1: string, data: IARecommendationRequest): Promise<IARecommendationResponse> => {
    try {
      const response = await iaraApi.post(ENDPOINTS.IA.STACKSPOT, data);
      return response.data;
    } catch (error) {
      console.error('Error getting IA recommendation:', error);
      throw error;
    }
  },

  generateQuestions: async (subject: string, count: number = 10): Promise<IARecommendationResponse> => {
    try {
      const prompt = `Gere ${count} questões de múltipla escolha sobre ${subject}, cada uma com 4 alternativas`;
      const system = `Você é um especialista em ${subject}`;
      
      const response = await iaraApi.post(ENDPOINTS.IA.STACKSPOT, {
        prompt,
        system
      });
      
      return response.data;
    } catch (error) {
      console.error('Error generating questions:', error);
      throw error;
    }
  },

  getStudyPlan: async (progress: string, subject: string): Promise<IARecommendationResponse> => {
    try {
      const prompt = `Com base no progresso atual do usuário de ${progress}, sugira um plano de estudo personalizado e conciso para ${subject} em no máximo 3 linhas`;
      const system = `Você é um mentor especialista em ${subject}`;
      
      const response = await iaraApi.post(ENDPOINTS.IA.STACKSPOT, {
        prompt,
        system
      });
      
      return response.data;
    } catch (error) {
      console.error('Error getting study plan:', error);
      throw error;
    }
  }
};