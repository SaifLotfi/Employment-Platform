import { NextFunction, Request, Response } from 'express';
import stringSimilarity from 'string-similarity';

import { employeeRepository } from '../models/employee.model';
import { jobRepository } from '../models/job.model';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getJobFilterObject } from '../utils/get-filter-object';
import { jobService } from '../services/job.service';

const postJob = async (req: Request, res: Response) => {
  await jobService.postJob({
    ...req.body,
    salary: Number(req.body.salary),
    empId: res.locals.empId,
  });
};

const getPostedJobs = async (req: Request, res: Response) => {
  const page = req.query.page as string || '1' ;

  const { jobs, totalPages } = await jobService.getPostedJobsAndPaginationInfo(
    res.locals.empId,
    page
  );

  return {
    jobs,
    currentPage:page,
    totalPages,
  }
};

const getJobById = async (req: Request, res: Response) => {
  const job = await jobService.checkIfJobExists(req.params.id);

  await jobService.preventUnauthorizedAccessToViewJobPage(
    res.locals.userType,
    res.locals.empId,
    job
  );

  return {
    job,
    userType: res.locals.userType,
  }

};

const getAllJobs = async (req: Request, _res: Response) => {
  const  page = req.query.page as string || '1' ;

  const query = req.query.query as string;

  const { jobs, totalPages } = await jobService.filterJobsAndGetTotalNumberOfPages(
   req.query,
    page
  );

  return {
    jobs,
    currentPage: page,
    totalPages,
    query,
  }
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
