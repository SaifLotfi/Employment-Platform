import { Employee } from "@prisma/client";
import { CreateEmployeeDTO } from "../dto/employee.dto";

export type EmployeeDao = {
    createEmployee: (employeeData: CreateEmployeeDTO) => Promise<Employee>;
    getEmployeeByEmail: (email: string) => Promise<Employee | null>;
    getEmployeeByNationalId: (nationalId: string) => Promise<Employee | null>;
    getAllEmployees: (skip:number, take: number) => Promise<Employee[]>;
    getNumberOfEmployees: () => Promise<number>;
}
