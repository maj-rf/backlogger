import express from 'express';
import { genreRouter } from './routes/genre.route';
import { gamesRouter } from './routes/games.route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', genreRouter);
app.use('/games', gamesRouter);
export default app;
