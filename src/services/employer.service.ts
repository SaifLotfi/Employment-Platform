import { employerRepository } from "../models/employer.model";
import { CreateEmployerDTO } from "../types/dto/employer.dto";
import { AppError } from "../utils/app-error";
import { isPasswordMatch } from "../utils/hash-password";
import { signJwt } from "../utils/jwt";

const checkIfEmployerWithSameEmailExists = async (email: string) => {
  const existingEmployer = await employerRepository.getEmployer(email);

  if (existingEmployer) throw new AppError('Email is already taken', 400, {
    title: 'signup',
    path: '/signup',
    page: 'employer-signup',
  });
}

const registerEmployerAndGenerateToken = async (employerData: CreateEmployerDTO) => {
  const employer = await employerRepository.createEmployer(employerData);

  const token = signJwt({ empId: employer.empId,userType:'employer' },'1h');

  return token;
}

const checkIfEmployerExists = async (email: string) => {
  const employer = await employerRepository.getEmployer(email);

  if (!employer) throw new AppError('Invalid credentials', 400, {
    title: 'login',
    path: '/login',
    page: 'employer-login',
  });

  return employer;
}

const checkIfPasswordIsCorrect = async (password:string, employerPassword: string) => {
  const isMatch = await isPasswordMatch(password, employerPassword);

  if (!isMatch) throw new AppError('Invalid credentials', 400, {
    title: 'login',
    path: '/login',
    page: 'employer-login',
  });
}

const generateJWTToken = async (empId: string) => {
  const token = signJwt({ empId: empId, userType: 'employer' }, '1h');

  return token;
};

export const employerService = {
  checkIfEmployerWithSameEmailExists,
  registerEmployerAndGenerateToken,
  checkIfEmployerExists,
  checkIfPasswordIsCorrect,
  generateJWTToken
}
