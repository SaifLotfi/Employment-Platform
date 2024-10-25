import { employerRepository } from "../models/employer.model";
import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { signJwt } from "../utils/jwt";

const createEmployer = async (req:Request, res:Response) => {
  const existingEmployer = await employerRepository.getEmployer(req.body.email);

  if (existingEmployer) throw new AppError('Email is already taken', 400, {
    title: 'signup',
    path: '/employer/signup',
    page: 'employer-signup',
  });

  const employer = await employerRepository.createEmployer(req.body);

  const token = signJwt({ empId: employer.empId },'1h');

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000 // 1 hour expiration
  }); 

  res.redirect('/');
};

export const employerController = {
  createEmployer
}
