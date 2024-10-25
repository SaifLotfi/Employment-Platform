import { employerRepository } from "../models/employer.model";
import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { signJwt } from "../utils/jwt";
import { isPasswordMatch } from "../utils/hash-password";

const registerEmployer = async (req:Request, res:Response) => {
  const existingEmployer = await employerRepository.getEmployer(req.body.email);

  if (existingEmployer) throw new AppError('Email is already taken', 400, {
    title: 'signup',
    path: '/signup',
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

const loginEmployer = async (req:Request, res:Response) => {
  const employer = await employerRepository.getEmployer(req.body.email);

  if (!employer) throw new AppError('Invalid credentials', 400, {
    title: 'login',
    path: '/login',
    page: 'employer-login',
  });

  const isMatch = await isPasswordMatch(req.body.password, employer.password);

  if (!isMatch) throw new AppError('Invalid credentials', 400, {
    title: 'login',
    path: '/login',
    page: 'employer-login',
  });

  const token = signJwt({ empId: employer.empId },'1h');

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: 3600000 // 1 hour expiration
  });

  res.redirect('/');
}

export const employerController = {
  registerEmployer,
  loginEmployer
}
