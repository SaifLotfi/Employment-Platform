import { NextFunction, query, Request, Response } from 'express';
import stringSimilarity from 'string-similarity';

import { employeeRepository } from '../models/employee.model';
import { jobRepository } from '../models/job.model';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getJobFilterObject } from '../utils/get-filter-object';

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

  const numberOfJobs = await jobRepository.getNumberOfPostedJobs(res.locals.empId);

  const jobs = await jobRepository.getPostedJobs(
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE,
    res.locals.empId
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
    });
    return;
  }

  if (res.locals.userType === 'employer' && job.empId !== res.locals.empId) {
    res.render('404', {
      title: 'Not Found',
      path: '/400',
    });
  }

  res.render('view-job', {
    title: 'Job Details',
    path: '/job/:id',
    job,
    userType: res.locals.userType,
  });
};

const getAllJobs = async (req: Request, res: Response, _next: NextFunction) => {
  const { page = 1 } = req.query;

  const query = req.query.query as string;

  const filters = getJobFilterObject(req.query);

  const numberOfJobs = await jobRepository.getNumberOfAllJobs(filters);

  const jobs = await jobRepository.getAllJobs(
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE,
    filters
  );

  const totalPages = Math.ceil(numberOfJobs / NUMBER_OF_CARDS_PER_PAGE);

  res.render('search-for-jobs', {
    title: 'Search For Jobs',
    path: '/job/search',
    jobs,
    currentPage: page,
    totalPages,
    query,
  });
};

const applyForAJob = async (req: Request, res: Response, _next: NextFunction) => {
  const jobId = req.params.jobId;
  const empId = res.locals.empId;
  await jobRepository.applyForAJob(jobId, empId);
  res.redirect(`/job/${jobId}`);
};

const acceptJobApplication = async (req: Request, res: Response, _next: NextFunction) => {
  const jobId = req.params.jobId;
  const empId = req.body.empId;
  await jobRepository.changeJobApplicationStatus(jobId, empId, 'accepted');
  res.redirect(`/job/${jobId}`);
};
const rejectJobApplication = async (req: Request, res: Response, _next: NextFunction) => {
  const jobId = req.params.jobId;
  const empId = req.body.empId;
  await jobRepository.changeJobApplicationStatus(jobId, empId, 'rejected');
  res.redirect(`/job/${jobId}`);
};

const getSuggestedJobs = async (_req: Request, res: Response, _next: NextFunction) => {
  const employee = await employeeRepository.getEmployeeById(res.locals.empId);

  const jobs = await jobRepository.getAllJobs(0, 10, { expLevel: { equals: employee?.expLevel } });

  const employeeInfo = `${employee?.title} ${employee?.bio}`;

  const jobRatings = jobs.map(job => ({
    job,
    rating: stringSimilarity.compareTwoStrings(employeeInfo, `${job.title} ${job.description}`),
  }));

  const suggestedJobs = jobRatings
    .sort((a, b) => b.rating - a.rating)
    .slice(0, NUMBER_OF_CARDS_PER_PAGE)
    .map(item => item.job);

  res.render('suggested-jobs', {
    title: 'Suggested Jobs',
    path: '/job/suggested',
    jobs:suggestedJobs,
  });
};

export const jobController = {
  postJob,
  getPostedJobs,
  getJobById,
  getAllJobs,
  applyForAJob,
  acceptJobApplication,
  rejectJobApplication,
  getSuggestedJobs
};
