import express from 'express';

import { employerController } from '../controllers/employer.controller';

const router = express.Router();

router.post('/employer/signup',employerController.registerEmployer);

router.post('/employer/login',employerController.loginEmployer);

export default router;
