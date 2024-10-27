import express from 'express';

import { jobController } from '../controllers/job.controller';
import { isAuth, isEmployee, isEmployer } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/job', isAuth, isEmployer, jobController.postJob);

router.post('/job/:jobId/apply', isAuth, isEmployee, jobController.applyForAJob);

router.post('/job/:jobId/accept', isAuth, isEmployer, jobController.acceptJobApplication);

router.post('/job/:jobId/reject', isAuth, isEmployer, jobController.rejectJobApplication);

export default router;
