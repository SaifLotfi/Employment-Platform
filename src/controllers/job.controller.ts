import { NextFunction, Request, Response } from 'express';

import { jobRepository } from '../models/job.model';

const postJob = async (req: Request, res: Response, _next: NextFunction) => {
  await jobRepository.createJob({
    ...req.body,
    salary: Number(req.body.salary),
    empId: res.locals.empId,
  });

  res.redirect('/job/post');
};

export const jobController = {
  postJob,
};
