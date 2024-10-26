import express from 'express';

import { jobController } from '../controllers/job.controller';
import { isAuth, isEmployer } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/job', isAuth, isEmployer, jobController.postJob);


export default router;
