import { Request, Response } from 'express';
import {
  deleteGameFromDB,
  GameWithoutID,
  getAllGamesFromDB,
  getGameFromDB,
  insertGameToDB,
  updateGameFromDB,
} from '../db/queries';
import createHttpError from 'http-errors';
import { DatabaseError } from 'pg';

export async function getAllGames(_req: Request, res: Response) {
  const games = await getAllGamesFromDB();
  res.json(games);
}

export async function getGame(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    throw createHttpError(400, 'Invalid request params');
  }
  const game = await getGameFromDB(id);
  res.json(game);
}

export async function addGame(req: Request, res: Response) {
  const { title, status, genre }: GameWithoutID = req.body;
  if (!title || !status || genre.length === 0) {
    throw createHttpError(422, 'Invalid/Missing title, game_status, or genre');
  }
  const result = await insertGameToDB({ title, status, genre });
  if (result instanceof DatabaseError) {
    throw result;
  }
  res.json(result);
}

export async function deleteGame(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    throw createHttpError(400, 'Invalid request params');
  }
  const result = await deleteGameFromDB(id);
  if (result instanceof DatabaseError) {
    throw result;
  }
  res.json(result);
}

export async function updateGame(req: Request, res: Response) {
  const { id } = req.params;
  const { game_status } = req.body;
  const allowedStatuses = ['playing', 'backlog', 'finished'];
  if (!id || !allowedStatuses.includes(game_status)) {
    throw createHttpError(400, 'Invalid request params or body');
  }
  const result = await updateGameFromDB({ id, status: game_status });
  if (result instanceof DatabaseError) {
    throw result;
  }
  res.json(result);
}
