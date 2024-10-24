import express from 'express';

import { employeeController } from '../controllers/employee.controller';

const router = express.Router();

router.post('/signup',employeeController.createEmployee);

export default router;
