import axios from 'axios';
import { parseCookies } from 'nookies';
const { token } = parseCookies();
const api = axios.create({
  baseURL: process.env.PROD_URL,
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export { api };
