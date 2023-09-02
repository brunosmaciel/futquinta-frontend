import axios from 'axios';
import { parseCookies } from 'nookies';
import { localStorageKeys } from '../config/localStorageKeys';
const { token } = parseCookies();
const api = axios.create({
  baseURL: process.env.BASE_URL,
});

if (typeof window !== 'undefined') {
  const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  token && (api.defaults.headers['Authorization'] = `Bearer ${token}`);
}

export { api };
