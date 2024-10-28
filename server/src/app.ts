import express from 'express';
import 'express-async-errors';
import { genreRouter } from './routes/v1/genre.route';
import { gamesRouter } from './routes/v1/games.route';
import * as middlewares from './middlewares/middlewares';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'welcome to backlogger' });
});
app.use('/api/v1/genre', genreRouter);
app.use('/api/v1/games', gamesRouter);

app.use(middlewares.errorHandler);
export default app;
