import pg from 'pg';
import { DB_URL, DEV_DB_URL } from '../config/config';
const { Pool } = pg;

const connectionString = process.env.NODE_ENV === 'production' ? DB_URL : DEV_DB_URL;

export const pool = new Pool({ connectionString });
