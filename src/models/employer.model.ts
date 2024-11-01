import { prisma } from '../libs/prisma.config';
import { EmployerDao } from '../types/dao/employer.dao';
import { CreateEmployerDTO } from '../types/dto/employer.dto';
import { hashPassword } from '../utils/hash-password';

const createEmployer = async (employerData: CreateEmployerDTO) => {
  const { name, email, password, company } = employerData;
  const employer = await prisma.employer.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      company: {
        create: {
          name: company,
        },
      },
    },
  });
  return employer;
};

export const getEmployer = async (email: string) => {
  const employer = await prisma.employer.findUnique({
    where: {
      email,
    },
  });
  return employer;
};

export const employerRepository: EmployerDao = {
  createEmployer,
  getEmployer
};
