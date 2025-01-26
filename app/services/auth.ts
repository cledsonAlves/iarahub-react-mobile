import { iaraApi, ENDPOINTS } from './config';

export const authService = {
  login: (credentials: { email: string; password: string }) => 
    iaraApi.post(ENDPOINTS.AUTH.LOGIN, credentials),
    
  register: (userData: any) => 
    iaraApi.post(ENDPOINTS.AUTH.REGISTER, userData),
    
  update: (data: any, token: string) => 
    iaraApi.put(ENDPOINTS.AUTH.UPDATE, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
};