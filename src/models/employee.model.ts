import { prisma } from "../config/prisma.config";
import { EmployeeDao } from "../types/dao/employee.dao";
import { CreateEmployeeDTO } from "../types/dto/employee.dto";
import { hashPassword } from "../utils/hash-password";

const createEmployee = async (
  employeeData: CreateEmployeeDTO
) => {
  const {name, email, password, nationalId, city, expLevel} = employeeData;
  const employee = await prisma.employee.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      nationalId,
      city,
      expLevel,
    },
  });
  return employee;
};

export const employeeRepository: EmployeeDao = {
  createEmployee
}