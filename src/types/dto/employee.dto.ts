import { ExpLevel } from '@prisma/client';

export type CreateEmployeeDTO = {
  name: string;
  email: string;
  password: string;
  nationalId: string;
  city: string;
  expLevel: ExpLevel;
  title: string;
  bio: string;
};
