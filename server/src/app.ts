import express from 'express';
import 'express-async-errors';
import { genreRouter } from './routes/genre.route';
import { gamesRouter } from './routes/games.route';
import * as middlewares from './middlewares/middlewares';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', genreRouter);
app.use('/games', gamesRouter);

app.use(middlewares.errorHandler);
export default app;
