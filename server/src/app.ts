import express from 'express';
import { genreRouter } from './routes/genre.route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', genreRouter);
export default app;
