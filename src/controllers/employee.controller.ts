import { Request, Response } from 'express';

import { employeeRepository } from '../models/employee.model';
import { AppError } from '../utils/app-error';

const createEmployee = async (req: Request, res: Response) => {
  const employee = await employeeRepository.getEmployee(req.body.email);

  if (employee) throw new AppError('Email is already taken', 400, {
      title: 'signup',
      path: '/employee/signup',
      page: 'employee-signup',
    });

  await employeeRepository.createEmployee(req.body);

  res.redirect('/');
};

export const employeeController = {
  createEmployee,
};
