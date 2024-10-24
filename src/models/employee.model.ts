import { prisma } from "../config/prisma.config";
import { CreateEmployeeDTO } from "../types/dto/employee.dto";

const createEmployee = async (
  employeeData: CreateEmployeeDTO
) => {
  const {name, email, password, nationalId, city, expLevel} = employeeData;
  const employee = await prisma.employee.create({
    data: {
      name,
      email,
      password,
      nationalId,
      city,
      expLevel,
    },
  });
  return employee;
};

export const employeeDao= {
  createEmployee
}