import { NextFunction, Request, Response } from 'express';

import { jobRepository } from '../models/job.model';

const PAGE_SIZE = 6;

const postJob = async (req: Request, res: Response, _next: NextFunction) => {
  await jobRepository.createJob({
    ...req.body,
    salary: Number(req.body.salary),
    empId: res.locals.empId,
  });

  res.redirect('/job/post');
};

const getPostedJobs = async (req: Request, res: Response, _next: NextFunction) => {
  const { page = 1 } = req.query;

  const numberOfJobs = await jobRepository.getNumberOfJobs(res.locals.empId);

  const jobs = await jobRepository.getJobs(
    res.locals.empId,
    PAGE_SIZE * (Number(page) - 1),
    PAGE_SIZE
  );

  const totalPages = Math.ceil(numberOfJobs / PAGE_SIZE);

  res.render('posted-jobs', {
    title: 'Posted Jobs',
    path: '/job/posted',
    jobs,
    currentPage: page,
    totalPages,
  });
};

export const jobController = {
  postJob,
  getPostedJobs,
};
