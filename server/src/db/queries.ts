import { pool } from './pool';

type Genre = {
  id: number;
  name: string;
};

export async function selectAllGenre(): Promise<Genre[]> {
  const { rows } = await pool.query('SELECT * FROM genre');
  return rows;
}
