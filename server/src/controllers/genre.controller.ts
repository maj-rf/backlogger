import { Request, Response } from 'express';
import { selectAllGenre } from '../db/queries';

export async function getAllGenre(req: Request, res: Response) {
  const genre = await selectAllGenre();
  res.send('Genre:' + genre.map((g) => g.name));
}
