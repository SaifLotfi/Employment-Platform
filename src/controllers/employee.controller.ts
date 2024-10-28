import { NextFunction, Request, Response } from 'express';
import stringSimilarity from 'string-similarity';

import { employeeRepository } from '../models/employee.model';
import { AppError } from '../utils/app-error';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getEmployeeFilterObject } from '../utils/get-filter-object';
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

  const filters = getEmployeeFilterObject(req.query);

  const numberOfEmployees = await employeeRepository.getNumberOfEmployees(filters);

  const employees = await employeeRepository.getAllEmployees(0, Number.MAX_SAFE_INTEGER, filters);

  const employeesRatings = employees.map(employee => ({
    employee,
    rating: stringSimilarity.compareTwoStrings(
      query||'',
      `${employee.name} ${employee.title} ${employee.bio} ${employee.expLevel}`
    ),
  }));

  const sliceStartIndex = NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1);
  const sliceEndIndex = sliceStartIndex + NUMBER_OF_CARDS_PER_PAGE;

  const sortedEmployees = employeesRatings
    .sort((a, b) => b.rating - a.rating)
    .slice(sliceStartIndex, sliceEndIndex)
    .map(item => item.employee);

  const totalPages = Math.ceil(numberOfEmployees / NUMBER_OF_CARDS_PER_PAGE);

  res.render('search-for-employees', {
    title: 'Search For Employees',
    path: '/employee/search',
    employees: sortedEmployees,
    currentPage: page,
    totalPages,
    query,
  });
};

const getProfile = async (req: Request, res: Response, _next: NextFunction) => {
  const employee = await employeeRepository.getEmployeeById(req.params.id);

  if (!employee) {
    res.render('404', {
      title: 'Not Found',
      path: '/400',
    });
    return;
  }

  if (res.locals.userType === 'employee' && employee.empId !== res.locals.empId) {
    res.render('404', {
      title: 'Not Found',
      path: '/400',
    });
  }

  if (res.locals.userType === 'employer') {
    await employeeRepository.addProfileViewsCount(employee.empId);
  }

  res.render('employee-profile', {
    title: 'Employee Profile',
    path: '/employee/:id',
    employee,
    userType: res.locals.userType,
  });
};

export const employeeController = {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getProfile,
};
