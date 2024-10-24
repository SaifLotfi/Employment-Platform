import { Employer } from "@prisma/client";
import { CreateEmployerDTO } from "../dto/employer.dto";

export type EmployerDao = {
    createEmployer: (employeeData: CreateEmployerDTO) => Promise<Employer>;
}