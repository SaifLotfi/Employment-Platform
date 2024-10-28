import { employeeRepository } from '../models/employee.model';
import { CreateEmployeeDTO } from '../types/dto/employee.dto';
import { AppError, NotFoundError } from '../utils/app-error';
import { isPasswordMatch } from '../utils/hash-password';
import { signJwt } from '../utils/jwt';

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

export const employeeService = {
  checkIfEmployeeWithSameEmailExists,
  checkIfEmployeeWithSameNationalIdExists,
  registerEmployeeAndGenerateToken,
  checkIfEmployeeExists,
  checkIfPasswordIsCorrect,
  generateJWTToken,
  checkIfEmployeeProfileExists,
  preventUnauthorizedProfileAccess,
  addProfileViewsCountIfViewerIsEmployer
};
