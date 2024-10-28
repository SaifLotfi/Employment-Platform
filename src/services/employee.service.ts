import { Employee } from '@prisma/client';
import { employeeRepository } from '../models/employee.model';
import { CreateEmployeeDTO } from '../types/dto/employee.dto';
import { AppError, NotFoundError } from '../utils/app-error';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getEmployeeFilterObject } from '../utils/get-filter-object';
import { isPasswordMatch } from '../utils/hash-password';
import { signJwt } from '../utils/jwt';
import stringSimilarity  from 'string-similarity';

const checkIfEmployeeWithSameEmailExists = async (email: string) => {
  const existingEmail = await employeeRepository.getEmployeeByEmail(email);
  if (existingEmail)
    throw new AppError('Email is already taken', 400, {
      title: 'signup',
      path: 'signup',
      page: 'employee-signup',
    });
};

const checkIfEmployeeWithSameNationalIdExists = async (nationalId: string) => {
  const existingNationalId = await employeeRepository.getEmployeeByNationalId(nationalId);

  if (existingNationalId)
    throw new AppError('An Account with this National ID is already registered', 400, {
      title: 'signup',
      path: 'signup',
      page: 'employee-signup',
    });
};

const registerEmployeeAndGenerateToken = async (employeeData: CreateEmployeeDTO) => {
  const employee = await employeeRepository.createEmployee(employeeData);

  return await generateJWTToken(employee.empId);
};

const checkIfEmployeeExists = async (email: string) => {
  const employee = await employeeRepository.getEmployeeByEmail(email);

  if (!employee)
    throw new AppError('Invalid credentials', 400, {
      title: 'login',
      path: '/login',
      page: 'employee-login',
    });
  return employee;
};

const checkIfPasswordIsCorrect = async (password: string, employeePassword: string) => {
  const isMatch = await isPasswordMatch(password, employeePassword);

  if (!isMatch)
    throw new AppError('Invalid credentials', 400, {
      title: 'login',
      path: '/login',
      page: 'employee-login',
    });
};

const generateJWTToken = async (empId: string) => {
  const token = signJwt({ empId: empId, userType: 'employee' }, '1h');

  return token;
};

const checkIfEmployeeProfileExists = async (empId: string) => {
  const employee = await employeeRepository.getEmployeeById(empId);

  if (!employee) {
    throw new NotFoundError('Employee not found');
  }

  return employee;
}

const preventUnauthorizedProfileAccess = async (empId: string,empProfileId:string,userType:'employee'|'employer') => {
  if (userType === 'employee' && empId !== empProfileId ) {
    throw new NotFoundError('Employee not found');
  }
}

const addProfileViewsCountIfViewerIsEmployer = async (empId: string,userType:'employee'|'employer') => {
  if(userType === 'employee')
    await employeeRepository.addProfileViewsCount(empId);
}

const filterEmployeesAndGetTotalNumberOfPages = async (reqQueryObject:any) => {
  const filters = getEmployeeFilterObject(reqQueryObject);

  const numberOfEmployees = await employeeRepository.getNumberOfEmployees(filters);

  const totalPages = Math.ceil(numberOfEmployees / NUMBER_OF_CARDS_PER_PAGE);

  const employees = await employeeRepository.getAllEmployees(0, Number.MAX_SAFE_INTEGER, filters);

  return {
    employees,
    totalPages
  }
}

const sortEmployeesBasedOnQuerySimilarity = (query: string, employees: Employee[],page:string) => {
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

  return sortedEmployees;
}

export const employeeService = {
  checkIfEmployeeWithSameEmailExists,
  checkIfEmployeeWithSameNationalIdExists,
  registerEmployeeAndGenerateToken,
  checkIfEmployeeExists,
  checkIfPasswordIsCorrect,
  generateJWTToken,
  checkIfEmployeeProfileExists,
  preventUnauthorizedProfileAccess,
  addProfileViewsCountIfViewerIsEmployer ,
  filterEmployeesAndGetTotalNumberOfPages,
  sortEmployeesBasedOnQuerySimilarity
};
