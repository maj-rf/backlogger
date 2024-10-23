#! /usr/bin/env node
import { Client } from 'pg';

const SQL = `
-- 1. Create an ENUM type for game_status
CREATE TYPE game_status AS ENUM ('playing', 'backlog', 'finished');

-- 2. Create the genre table
CREATE TABLE IF NOT EXISTS genre (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- 3. Create the games table
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    status game_status NOT NULL
);

-- 4. Create a join table for the many-to-many relationship between games and genre
CREATE TABLE IF NOT EXISTS game_genre (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genre(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

INSERT INTO genre (name) VALUES ('Action'), ('Adventure'), ('RPG'), ('Strategy'), ('Visual Novel'), ('Sports'), ('Fighting'), ('Platformer'), ('FPS'), ('Puzzle');`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: 'postgresql://<role_name>:<role_password>@localhost:5432/top_users',
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
