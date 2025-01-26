import { ENDPOINTS, iaraApi } from "./config";

export const authService = {
  login: (credentials: any) => iaraApi.post(ENDPOINTS.AUTH.LOGIN, credentials),
  update: (data: any, token: any) => iaraApi.put(
    ENDPOINTS.AUTH.UPDATE, 
    data,
    { headers: { Authorization: `Bearer ${token}` }}
  )
};