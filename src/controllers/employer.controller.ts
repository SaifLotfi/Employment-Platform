import { employerRepository } from "../models/employer.model";
import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { signJwt } from "../utils/jwt";
import { isPasswordMatch } from "../utils/hash-password";
import { employerService } from "../services/employer.service";
import { JWT_MAX_AGE } from "../utils/constants";

const registerEmployer = async (req:Request, res:Response) => {

  await employerService.checkIfEmployerWithSameEmailExists(req.body.email);

  const token = await employerService.registerEmployerAndGenerateToken(req.body);

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: JWT_MAX_AGE // 1 hour expiration
  }); 

};

const loginEmployer = async (req:Request, res:Response) => {
  const employer = await employerService.checkIfEmployerExists(req.body.email);

  await employerService.checkIfPasswordIsCorrect(req.body.password, employer.password);

  const token = await employerService.generateJWTToken(employer.empId);

  // Store the JWT in an HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Ensures the cookie is only sent over HTTPS
    maxAge: JWT_MAX_AGE // 1 hour expiration
  });

  res.redirect('/');
}

export const employerController = {
  registerEmployer,
  loginEmployer
}
