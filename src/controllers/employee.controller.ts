import { employeeRepository } from "../models/employee.model";
import { Request, Response } from "express";

const createEmployee = async (req:Request, res:Response) => {
  const employee = await employeeRepository.createEmployee(req.body);
  res.redirect('/');
};

export const employeeController = {
  createEmployee
}