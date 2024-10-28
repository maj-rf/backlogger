import { Request, Response } from 'express';
import { selectAllGenre } from '../db/queries';

export async function getAllGenre(_req: Request, res: Response) {
  const genre = await selectAllGenre();
  res.json(genre);
}

export async function getAllGamesInGenre(req: Request, res: Response) {
  res.json();
}
