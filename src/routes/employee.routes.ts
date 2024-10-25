import express from 'express';

import { employeeController } from '../controllers/employee.controller';

const router = express.Router();

router.post('/employee/signup',employeeController.registerEmployee);

router.post('/employee/login',employeeController.loginEmployee);

export default router;
