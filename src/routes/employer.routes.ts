import express from 'express';

import { employerController } from '../controllers/employer.controller';
import { employerSchema, validate } from '../validation';

const router = express.Router();

router.post(
  '/employer/signup',
  validate(employerSchema, 'Register Employer', '/employer/signup', 'employer-signup'),
  async (req, res) => {
    await employerController.registerEmployer(req, res);
    res.redirect('/');
  }
);

router.post(
  '/employer/login',
  validate(
    employerSchema.pick({ email: true, password: true }),
    'Register Employer',
    '/employer/login',
    'employer-login'
  ),
  async (req, res) => {
    await employerController.loginEmployer(req, res);
    res.redirect('/');
  }
);

export default router;
