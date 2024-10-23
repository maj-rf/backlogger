import { Request, Response } from 'express';
import { getAllGamesFromDB, insertGameToDB } from '../db/queries';

export async function getAllGames(_req: Request, res: Response) {
  const games = await getAllGamesFromDB();
  res.send('Games:' + games.map((game) => game.genre.map((genre) => genre)));
}

export async function addGame(req: Request, res: Response) {
  const { title, game_status, genre } = req.body;
  const addedGame = await insertGameToDB({ title, game_status, genre });
  res.json(addedGame);
}
