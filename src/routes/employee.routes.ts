import express from 'express';

import { employeeController } from '../controllers/employee.controller';
import { employeeSchema, validate } from '../validation';

const router = express.Router();

router.post(
  '/employee/signup',
  validate(employeeSchema, 'Register Employee', '/employee/signup', 'employee-signup'),
  async (req, res) => {
    await employeeController.registerEmployee(req, res);
    res.redirect('/');
  }
);

router.post(
  '/employee/login',
  validate(
    employeeSchema.pick({ email: true, password: true }),
    'Employee Login',
    '/employee/signup',
    'employee-login'
  ),
  async (req, res) => {
    await employeeController.loginEmployee(req, res);
    res.redirect('/');
  }
);

export default router;
