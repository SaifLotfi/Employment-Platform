import { NextFunction, Request, Response } from 'express';

import { jobRepository } from '../models/job.model';

import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';

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
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE
  );

  const totalPages = Math.ceil(numberOfJobs / NUMBER_OF_CARDS_PER_PAGE);

  res.render('posted-jobs', {
    title: 'Posted Jobs',
    path: '/job/posted',
    jobs,
    currentPage: page,
    totalPages,
  });
};

const getJobById = async (req: Request, res: Response, _next: NextFunction) => {
  const job = await jobRepository.getJobById(req.params.id);

  if (!job) {
    res.render('404', {
      title: 'Not Found',
      path: '/400',
    })
  }

  res.render('view-job', {
    title: 'Job Details',
    path: '/job/:id',
    job,
  });
};

export const jobController = {
  postJob,
  getPostedJobs,
  getJobById,
};
