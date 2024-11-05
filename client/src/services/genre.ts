import { Game } from './games';

export const BASE_URL = import.meta.env.VITE_WEBSITE_URL || '/api/v1';

export type Genre = {
  id: string;
  name: string;
};

export async function getAll(): Promise<Genre[]> {
  const res = await fetch(`${BASE_URL}/genre`, { mode: 'cors' });
  const data = await res.json();
  return data;
}

export async function getGamesInGenre(id: string): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/genre/${id}`, { mode: 'cors' });
  const data = await res.json();
  return data;
}
