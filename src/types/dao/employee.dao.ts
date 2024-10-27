import { Employee } from "@prisma/client";
import { CreateEmployeeDTO } from "../dto/employee.dto";

export type EmployeeDao = {
    createEmployee: (employeeData: CreateEmployeeDTO) => Promise<Employee>;
    getEmployeeByEmail: (email: string) => Promise<Employee | null>;
    getEmployeeByNationalId: (nationalId: string) => Promise<Employee | null>;
    getAllEmployees: (skip:number, take: number, filters:any) => Promise<Employee[]>;
    getNumberOfEmployees: (filters:any) => Promise<number>;
    getEmployeeById: (empId: string) => Promise<Employee | null>;
}
