import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/app-error';

const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Set default values for statusCode and message
  err.statusCode = err.statusCode || 500;

  if (err.pageInfo) {
    res.render(err.pageInfo.page, {
      errorMessage: err.message,
      title: err.pageInfo.title,
      path: err.pageInfo.path,
      error: true,
      data: err.data,
    });
  } else {
    res.redirect('/500');
  }
};

export default globalErrorHandler;
