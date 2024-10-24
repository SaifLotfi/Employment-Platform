import { Employee } from "@prisma/client";
import { CreateEmployeeDTO } from "../dto/employee.dto";

export type EmployeeDao = {
    createEmployee: (employeeData: CreateEmployeeDTO) => Promise<Employee>;
}