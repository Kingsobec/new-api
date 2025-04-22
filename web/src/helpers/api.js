import {
  getTokenFromLocalStorage,
  getUserIdFromLocalStorage,
  showError,
} from './utils';
import axios from 'axios';

const userId = getUserIdFromLocalStorage();
const token = getTokenFromLocalStorage();

export let API = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL
    ? import.meta.env.VITE_REACT_APP_SERVER_URL
    : '',
  headers: {
    'New-API-User': userId,
    Authorization: `Bearer ${token}`,
    'Cache-Control': 'no-store',
  },
});

export function updateAPI() {
  API = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL
      ? import.meta.env.VITE_REACT_APP_SERVER_URL
      : '',
    headers: {
      'New-API-User': getUserIdFromLocalStorage(),
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-store',
    },
  });
}

API.interceptors.response.use(
  (response) => response,
  (error) => {
    showError(error);
  },
);
