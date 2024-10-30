import { Request, Response } from 'express';
import { selectAllGenre, selectGamesInGenre } from '../db/queries';
import createHttpError from 'http-errors';

export async function getAllGenre(_req: Request, res: Response) {
  const genre = await selectAllGenre();
  res.json(genre);
}

export async function getAllGamesInGenre(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, 'Invalid request params');
  }
  const games = await selectGamesInGenre(id);
  res.json(games);
}
