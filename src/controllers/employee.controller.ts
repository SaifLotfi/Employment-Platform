import { Request, Response } from 'express';

import { employeeRepository } from '../models/employee.model';
import { AppError } from '../utils/app-error';
import { signJwt } from '../utils/jwt';
import { isPasswordMatch } from '../utils/hash-password';

const registerEmployee = async (req: Request, res: Response) => {
  const existingEmail = await employeeRepository.getEmployeeByEmail(req.body.email);

  const existingNationalId = await employeeRepository.getEmployeeByNationalId(req.body.nationalId);

  if (existingEmail) throw new AppError('Email is already taken', 400, {
      title: 'signup',
      path: 'signup',
      page: 'employee-signup',
    });

  if (existingNationalId) throw new AppError('An Account with this National ID is already registered', 400, {
      title: 'signup',
      path: 'signup',
      page: 'employee-signup',
    });

  const employee = await employeeRepository.createEmployee(req.body);

  const token = signJwt({ empId: employee.empId },'1h');

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000 // 1 hour expiration
  }); 

  res.redirect('/');
};

const loginEmployee = async (req: Request, res: Response) => {
  const employee = await employeeRepository.getEmployeeByEmail(req.body.email);

  if (!employee) throw new AppError('Invalid credentials', 400, {
    title: 'login',
    path: '/login',
    page: 'employee-login',
  });

  const isMatch = await isPasswordMatch(req.body.password, employee.password);

  if (!isMatch) throw new AppError('Invalid credentials', 400, {
    title: 'login',
    path: '/login',
    page: 'employee-login',
  });

  const token = signJwt({ empId: employee.empId },'1h');

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000 // 1 hour expiration
  });

  res.redirect('/');
}

export const employeeController = {
  registerEmployee,
  loginEmployee
};
