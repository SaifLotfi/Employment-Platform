import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/app-error';

const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Set default values for statusCode and message
  err.statusCode = err.statusCode || 500;

  res.redirect('/500');
};

export default globalErrorHandler;
