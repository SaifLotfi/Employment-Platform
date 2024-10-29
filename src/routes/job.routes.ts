import express, { Request, Response } from 'express';

import { jobController } from '../controllers/job.controller';
import { isAuth, isEmployee, isEmployer } from '../middlewares/auth.middleware';
import { jobSchema, validate } from '../validation';

const router = express.Router();

router.post(
  '/job',
  isAuth,
  isEmployer,
  validate(jobSchema, 'Post Job', '/job/post', 'post-jobs'),
  async (req: Request, res: Response) => {
    await jobController.postJob(req, res);
    res.redirect('/job/post');
  }
);

router.post('/job/:jobId/apply', isAuth, isEmployee, async (req: Request, res: Response) => {
  const jobId = await jobController.applyForAJob(req, res);
  res.redirect(`/job/${jobId}`);
});

router.post('/job/:jobId/accept', isAuth, isEmployer, async (req: Request, res: Response) => {
  const jobId = await jobController.changeJobApplicationStatus(req, res,'accepted');
  res.redirect(`/job/${jobId}`);
});

router.post('/job/:jobId/reject', isAuth, isEmployer, async (req: Request, res: Response) => {
  const jobId = await jobController.changeJobApplicationStatus(req, res,'rejected');
  res.redirect(`/job/${jobId}`);
});

export default router;
