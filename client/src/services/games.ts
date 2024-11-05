import { BASE_URL } from './genre';

type GameStatus = 'playing' | 'backlog' | 'finished';

export type Game = {
  id: number;
  title: string;
  genre: string[];
  status: GameStatus;
};

export type GameWithoutID = Omit<Game, 'id'>;

export async function getAllGames(): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games`, { mode: 'cors' });
  const data = await res.json();
  return data;
}

export async function getGame(id: string): Promise<Game> {
  const res = await fetch(`${BASE_URL}/games/${id}`, { mode: 'cors' });
  const data = await res.json();
  return data;
}

export async function addGame(obj: GameWithoutID): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games/`, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      title: obj.title,
      status: obj.status,
      genre: obj.genre,
    }),
    headers: { 'Content-type': 'application/json' },
  });
  const data = await res.json();
  return data;
}
