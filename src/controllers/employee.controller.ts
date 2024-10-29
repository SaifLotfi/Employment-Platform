import { Request, Response } from 'express';
import { employeeService } from '../services/employee.service';
import { JWT_MAX_AGE } from '../utils/constants';

const registerEmployee = async (req: Request, res: Response) => {
  await employeeService.checkIfEmployeeWithSameEmailExists(req.body.email);

  await employeeService.checkIfEmployeeWithSameNationalIdExists(req.body.nationalId);

  const token = await employeeService.registerEmployeeAndGenerateToken(req.body);

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: JWT_MAX_AGE, // 1 hour expiration
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
    maxAge: JWT_MAX_AGE, // 1 hour expiration
  });
};

const getAllEmployees = async (req: Request, _res: Response) => {
  const  page = req.query.page as string || '1' ;

  const query = req.query.query as string;

  const { employees, totalPages } = await employeeService.filterEmployeesAndGetTotalNumberOfPages(
    req.query
  );

  const sortedEmployees = employeeService.sortEmployeesBasedOnQuerySimilarity(
    query,
    employees,
    page
  );

  return {
    employees: sortedEmployees,
    currentPage: page,
    totalPages,
    query,
    city: req.query.city as string,
    expLevel: req.query.expLevel as string,
  };
};

const getProfile = async (req: Request, res: Response) => {
  const userType = res.locals.userType;

  const employee = await employeeService.checkIfEmployeeProfileExists(req.params.id);

  await employeeService.preventUnauthorizedProfileAccess(req.params.id, employee.empId, userType);

  await employeeService.addProfileViewsCountIfViewerIsEmployer(employee.empId, userType);

  return {
    employee,
    userType,
  };
};

export const employeeController = {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getProfile,
};
