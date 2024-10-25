import { employerRepository } from "../models/employer.model";
import { Request, Response } from "express";
import { AppError } from "../utils/app-error";

const createEmployer = async (req:Request, res:Response) => {
  const employer = await employerRepository.getEmployer(req.body.email);

  if (employer) throw new AppError('Email is already taken', 400, {
    title: 'signup',
    path: '/employer/signup',
    page: 'employer-signup',
  });

  await employerRepository.createEmployer(req.body);

  res.redirect('/');
};

export const employerController = {
  createEmployer
}
