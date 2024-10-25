import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import { DatabaseError } from 'pg';

// use class DatabaseError from pg to create DB errors

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  let errorMessage = 'An unknown error has occurred';
  let status = 500;
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  if (error instanceof DatabaseError) {
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
  next();
};
