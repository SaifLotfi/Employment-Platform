import { Request, Response } from 'express';

import { employeeRepository } from '../models/employee.model';
import { AppError } from '../utils/app-error';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { isPasswordMatch } from '../utils/hash-password';
import { signJwt } from '../utils/jwt';

const registerEmployee = async (req: Request, res: Response) => {
  const existingEmail = await employeeRepository.getEmployeeByEmail(req.body.email);

  const existingNationalId = await employeeRepository.getEmployeeByNationalId(req.body.nationalId);

  if (existingEmail)
    throw new AppError('Email is already taken', 400, {
      title: 'signup',
      path: 'signup',
      page: 'employee-signup',
    });

  if (existingNationalId)
    throw new AppError('An Account with this National ID is already registered', 400, {
      title: 'signup',
      path: 'signup',
      page: 'employee-signup',
    });

  const employee = await employeeRepository.createEmployee(req.body);

  const token = signJwt({ empId: employee.empId, userType: 'employee' }, '1h');

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000, // 1 hour expiration
  });

  res.redirect('/');
};

const loginEmployee = async (req: Request, res: Response) => {
  const employee = await employeeRepository.getEmployeeByEmail(req.body.email);

  if (!employee)
    throw new AppError('Invalid credentials', 400, {
      title: 'login',
      path: '/login',
      page: 'employee-login',
    });

  const isMatch = await isPasswordMatch(req.body.password, employee.password);

  if (!isMatch)
    throw new AppError('Invalid credentials', 400, {
      title: 'login',
      path: '/login',
      page: 'employee-login',
    });

  const token = signJwt({ empId: employee.empId, userType: 'employee' }, '1h');

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000, // 1 hour expiration
  });

  res.redirect('/');
};

const getAllEmployees = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;

  const query = req.query.query as string;

  const numberOfEmployees = await employeeRepository.getNumberOfEmployees(query);

  const employees = await employeeRepository.getAllEmployees(
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE,
    query
  );

  const totalPages = Math.ceil(numberOfEmployees / NUMBER_OF_CARDS_PER_PAGE);

  res.render('search-for-employees', {
    title: 'Search For Employees',
    path: '/employee/search',
    employees,
    currentPage: page,
    totalPages,
    query
  });
};

export const employeeController = {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
};
