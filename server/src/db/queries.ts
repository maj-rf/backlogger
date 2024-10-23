import { QueryResult } from 'pg';
import { pool } from './pool';

type Genre = {
  id: number;
  name: string;
};

type GameStatus = 'playing' | 'backlog' | 'finished';

type Game = {
  id: number;
  title: string;
  genre: string[];
  game_status: GameStatus;
};

export type GameWithoutID = Omit<Game, 'id'>;

export async function selectAllGenre(): Promise<Genre[]> {
  const { rows } = await pool.query('SELECT * FROM genre');
  return rows;
}

export async function getAllGamesFromDB(): Promise<Game[]> {
  const getAllGamesQueryText = `SELECT g.title, g.status, ARRAY_AGG(ge.name) AS genre
    FROM games g
    JOIN game_genre gg ON g.id = gg.game_id
    JOIN genre ge ON gg.genre_id = ge.id
    GROUP BY g.id, g.title, g.status
    ORDER BY g.title;`;
  const { rows } = await pool.query(getAllGamesQueryText);
  return rows;
}

export async function insertGameToDB(game: GameWithoutID) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    // 1. Insert the game into the games table
    const insertGameText = `INSERT INTO games (title, status) 
                            VALUES ($1, $2) RETURNING id`;
    const insertGameValues = [game.title, game.game_status];
    const gameResult: QueryResult<Game> = await client.query(insertGameText, insertGameValues);
    const gameId = gameResult.rows[0]?.id; // Get the inserted game's ID

    // 2. For each genre, find its ID and insert into game_genre
    for (const genre of game.genre) {
      // Find the genre ID by name
      const selectGenreText = `SELECT id FROM genre WHERE name = $1`;
      const genreResult: QueryResult<Genre> = await client.query(selectGenreText, [genre]);
      if (genreResult.rows.length === 0) {
        throw new Error(`Genre ${genre} not found`);
      }
      const genreId = genreResult.rows[0]?.id; // Get the genre's ID

      // Insert the relationship into the game_genre table
      const insertGameGenreText = `INSERT INTO game_genre (game_id, genre_id) 
                                   VALUES ($1, $2)`;
      const insertGameGenreValues = [gameId, genreId];
      await client.query(insertGameGenreText, insertGameGenreValues);
    }

    await client.query('COMMIT');
    console.log('Game and genre relationships inserted successfully');
    return gameResult.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error inserting game:', err);
  } finally {
    client.release();
  }
}
