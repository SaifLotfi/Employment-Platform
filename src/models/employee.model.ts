import { prisma } from '../libs/prisma.config';
import { EmployeeDao } from '../types/dao/employee.dao';
import { CreateEmployeeDTO } from '../types/dto/employee.dto';
import { hashPassword } from '../utils/hash-password';

const createEmployee = async (employeeData: CreateEmployeeDTO) => {
  const { name, email, password, nationalId, city, expLevel, title } = employeeData;
  const employee = await prisma.employee.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      nationalId,
      city,
      expLevel,
      title,
    },
  });
  return employee;
};

const getEmployeeByEmail = async (email: string) => {
  const employee = await prisma.employee.findUnique({
    where: {
      email,
    },
  });
  return employee;
};

const getEmployeeByNationalId = async (nationalId: string) => {
  const employee = await prisma.employee.findUnique({
    where: {
      nationalId,
    },
  });
  return employee;
};

const getAllEmployees = async (skip: number, take: number, filters: any) => {
  const employees = await prisma.employee.findMany({
    where:filters,
    take,
    skip,
  });
  return employees;
};

const getNumberOfEmployees = async (filters: any) => {
  const numberOfEmployees = await prisma.employee.count({
    where:filters ,
  });
  return numberOfEmployees;
};

export const employeeRepository: EmployeeDao = {
  createEmployee,
  getEmployeeByEmail,
  getEmployeeByNationalId,
  getAllEmployees,
  getNumberOfEmployees,
};
