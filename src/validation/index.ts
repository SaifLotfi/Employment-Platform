import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { AppError } from '../utils/app-error';

export const validate = (schema: z.AnyZodObject, title: string, path: string, page: string) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.passthrough().safeParse(req.body);
    if (!result.success) {
      throw new AppError(fromZodError(result.error).toString(), 400, {
        title,
        path,
        page,
      });
    }
    next();
  };
};

export * from './employee.schema';
export * from './employer.schema';
export * from './job.schema';
