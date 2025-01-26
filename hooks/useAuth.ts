// hooks/useAuth.ts
import { authService } from "@/app/services/auth";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
    const [user, setUser] = useState(null);
   
    const login = async (credentials: any) => {
      try {
        const response = await authService.login(credentials);
        if (response?.data) {
          await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
          await AsyncStorage.setItem('authToken', response.data.token);
          setUser(response.data.user);
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    };
   
    const updateProgress = async (progress: any) => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const userData = await AsyncStorage.getItem('userData');
        if (token && userData) {
          const user = JSON.parse(userData);
          await authService.update({ id: user.id, progress }, token);
        }
      } catch (error) {
        throw error;
      }
    };
   
    return { user, login, updateProgress };
}