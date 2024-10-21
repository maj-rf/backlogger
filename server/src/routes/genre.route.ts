import { Router } from 'express';
import * as genreController from '../controllers/genre.controller';
export const genreRouter = Router();

genreRouter.get('/', genreController.getAllGenre);
