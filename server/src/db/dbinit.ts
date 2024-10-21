#! /usr/bin/env node
import { Client } from 'pg';

const SQL = `
-- Create an ENUM type for the status column in the Games table
CREATE TYPE game_status AS ENUM ('playing', 'backlog', 'finished');

-- Create the Genres table
CREATE TABLE IF NOT EXISTS genre  (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
);

-- Create the Games table
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    genre_id INT REFERENCES genre(id) ON DELETE SET NULL,  -- Foreign key to Genres table
    status game_status  -- Restrict status to 'playing', 'backlog', or 'finished'
);

INSERT INTO genre (name) VALUES ('Action'), ('Adventure'), ('RPG'), ('Strategy'), ('Visual Novel');
`;

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
