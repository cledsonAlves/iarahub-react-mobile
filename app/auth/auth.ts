import axios from 'axios';

// Função para realizar o login
export async function login(email: string, password: string) {
  const url = 'https://bff-iarahub.vercel.app/api/users/login'; // URL da sua API de login
  const payload = { email, password };

  try {
    const response = await axios.post(url, payload);
    return response.data; // Retorna os dados da resposta
  } catch (error: any) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
    throw error; // Lança o erro para tratamento no componente
  }
}
