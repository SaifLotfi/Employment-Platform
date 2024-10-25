import { Request, Response } from 'express';

import { employeeRepository } from '../models/employee.model';
import { AppError } from '../utils/app-error';
import { signJwt } from '../utils/jwt';

const createEmployee = async (req: Request, res: Response) => {
  const existingEmployee = await employeeRepository.getEmployee(req.body.email);

  if (existingEmployee) throw new AppError('Email is already taken', 400, {
      title: 'signup',
      path: '/employee/signup',
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

export const employeeController = {
  createEmployee,
};
