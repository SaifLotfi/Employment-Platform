import { NextFunction, Request, Response } from 'express';

import { verifyJWT } from '../utils/jwt';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) {
    return res.redirect('/employee/login');
  }
  let decoded;
  try {
    decoded = verifyJWT(req.cookies.token);
  } catch (err) {
    return res.redirect('/employee/login');
  }

  res.locals.empId = decoded.empId;
  res.locals.userType = decoded.userType;

  next();
};

export const isEmployer = (_req: Request, res: Response, next: NextFunction) => {
  if (res.locals.userType !== 'employer') {
    return res.redirect('/');
  }

  next();
};

export const isEmployee = (_req: Request, res: Response, next: NextFunction) => {
  if (res.locals.userType !== 'employee') {
    return res.redirect('/');
  }

  next();
};
