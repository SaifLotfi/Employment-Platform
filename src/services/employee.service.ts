import { employeeRepository } from '../models/employee.model';
import { CreateEmployeeDTO } from '../types/dto/employee.dto';
import { AppError } from '../utils/app-error';
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

  const token = signJwt({ empId: employee.empId, userType: 'employee' }, '1h');

  return token;
}

export const employeeService = {
  checkIfEmployeeWithSameEmailExists,
  checkIfEmployeeWithSameNationalIdExists,
  registerEmployeeAndGenerateToken
};
