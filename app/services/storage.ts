// services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  role?: string;
  enterprise?: string;
  language?: string;
  progress?: string;
}

export const storageKeys = {
  USER_DATA: 'userData',
  AUTH_TOKEN: 'authToken',
  SETTINGS: 'settings',
  PROGRESS: 'progress'
};

export const storageService = {
  setUserData: async (data: UserData): Promise<void> => {
    try {
      await AsyncStorage.setItem(storageKeys.USER_DATA, JSON.stringify(data));
    } catch (error) {
      console.error('Error setting user data:', error);
      throw error;
    }
  },

  getUserData: async (): Promise<UserData | null> => {
    try {
      const data = await AsyncStorage.getItem(storageKeys.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  },

  setAuthToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(storageKeys.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error setting auth token:', error);
      throw error;
    }
  },

  getAuthToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(storageKeys.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      throw error;
    }
  },

  updateUserProgress: async (progress: string): Promise<void> => {
    try {
      const userData = await storageService.getUserData();
      if (userData) {
        userData.progress = progress;
        await storageService.setUserData(userData);
      }
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  },

  clearStorage: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      throw error;
    }
  }
};