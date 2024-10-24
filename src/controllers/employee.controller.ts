import { employeeDao } from "../models/employee.model";
import { Request, Response } from "express";

const createEmployee = async (req:Request, res:Response) => {
  const employee = await employeeDao.createEmployee(req.body);
  res.redirect('/');
};

export const employeeController = {
  createEmployee
}