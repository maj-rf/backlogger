import dotenv from 'dotenv';
dotenv.config();

export const PORT = Number(process.env.PORT) || 3003;
export const DEV_DB_URL = process.env.DEV_DB_URL || '';
export const DB_URL = process.env.DB_URL || '';
