import { NextFunction, Request, Response } from 'express';
import stringSimilarity from 'string-similarity';

import { employeeRepository } from '../models/employee.model';
import { employeeService } from '../services/employee.service';
import { AppError } from '../utils/app-error';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getEmployeeFilterObject } from '../utils/get-filter-object';
import { isPasswordMatch } from '../utils/hash-password';
import { signJwt } from '../utils/jwt';

const registerEmployee = async (req: Request, res: Response) => {
  await employeeService.checkIfEmployeeWithSameEmailExists(req.body.email);

  await employeeService.checkIfEmployeeWithSameNationalIdExists(req.body.nationalId);

  const token = await employeeService.registerEmployeeAndGenerateToken(req.body);

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000, // 1 hour expiration
  });
};

const loginEmployee = async (req: Request, res: Response) => {
  const employee = await employeeService.checkIfEmployeeExists(req.body.email);

  await employeeService.checkIfPasswordIsCorrect(req.body.password, employee.password);

  const token = await employeeService.generateJWTToken(employee.empId);

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000, // 1 hour expiration
  });
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
      query || '',
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

const getProfile = async (req: Request, res: Response) => {
  const userType = res.locals.userType;

  const employee = await employeeService.checkIfEmployeeProfileExists(req.params.id);

  await employeeService.preventUnauthorizedProfileAccess(req.params.id,employee.empId, userType);

  await employeeService.addProfileViewsCountIfViewerIsEmployer(employee.empId, userType);

  return {
    employee,
    userType
  }

};

export const employeeController = {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getProfile,
};
