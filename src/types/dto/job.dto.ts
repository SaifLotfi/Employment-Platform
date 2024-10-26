import { ExpLevel } from "@prisma/client";

export type CreateJobDTO = {
  title: string;
  salary: number;
  description: string;
  expLevel: ExpLevel;
  empId: string;
};
