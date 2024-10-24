import { employerRepository } from "../models/employer.model";
import { Request, Response } from "express";

const createEmployer = async (req:Request, res:Response) => {
  const employer = await employerRepository.createEmployer(req.body);
  res.redirect('/');
};

export const employerController = {
  createEmployer
}