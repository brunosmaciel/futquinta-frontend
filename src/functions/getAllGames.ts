import { api } from '../services/axios';
import { Game } from './../../index.d';

async function getAllGames() {
  try {
    const data = await api.get<Game[]>('/games');

    return data.data;
  } catch (err) {}
}

export { getAllGames };
