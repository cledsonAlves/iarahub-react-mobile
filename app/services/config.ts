// services/config.ts
import axios from 'axios';

export const BASE_URL = 'https://bff-iarahub.vercel.app';

export const iaraApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/users/login',
    REGISTER: '/api/users/register',
    UPDATE: '/api/users/update'
  },
  IA: {
    STACKSPOT: '/api/ia/stackspot'
  },
  PODCAST: {
    GET_ALL: '/api/podcast/getAllPodcast',
    GET_BY_ID: '/api/podcast/:id'
  }
};