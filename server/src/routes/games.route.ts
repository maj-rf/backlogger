import { Router } from 'express';
import * as gamesController from '../controllers/games.controller';
export const gamesRouter = Router();

gamesRouter.get('/', gamesController.getAllGames);
gamesRouter.post('/', gamesController.addGame);
gamesRouter.delete('/:id', gamesController.deleteGame);
gamesRouter.patch('/:id', gamesController.updateGame);
