import { BASE_URL } from './genre';

type GameStatus = 'playing' | 'backlog' | 'finished';

export type Game = {
  id: number;
  title: string;
  genre: string[];
  game_status: GameStatus;
};

export type GameWithoutID = Omit<Game, 'id'>;

export async function getAllGames(): Promise<Game[] | undefined> {
  try {
    const res = await fetch(`${BASE_URL}/games`, { mode: 'cors' });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
