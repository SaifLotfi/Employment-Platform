import { NextFunction, Request, Response } from 'express';
import stringSimilarity from 'string-similarity';

import { employeeRepository } from '../models/employee.model';
import { jobRepository } from '../models/job.model';
import { employeeService } from '../services/employee.service';
import { jobService } from '../services/job.service';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getJobFilterObject } from '../utils/get-filter-object';

const postJob = async (req: Request, res: Response) => {
  await jobService.postJob({
    ...req.body,
    salary: Number(req.body.salary),
    empId: res.locals.empId,
  });
};

const getPostedJobs = async (req: Request, res: Response) => {
  const page = (req.query.page as string) || '1';

  const { jobs, totalPages } = await jobService.getPostedJobsAndPaginationInfo(
    res.locals.empId,
    page
  );

  return {
    jobs,
    currentPage: page,
    totalPages,
  };
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
  };
};

const getAllJobs = async (req: Request, _res: Response) => {
  const page = (req.query.page as string) || '1';

  const query = req.query.query as string;

  const { jobs, totalPages } = await jobService.filterJobsAndGetTotalNumberOfPages(req.query, page);

  return {
    jobs,
    currentPage: page,
    totalPages,
    query,
  };
};

const applyForAJob = async (req: Request, res: Response) => {
  const jobId = req.params.jobId;
  const empId = res.locals.empId;
  await jobService.applyForAJob(jobId, empId);
  return jobId;
};

const changeJobApplicationStatus = async (
  req: Request,
  _res: Response,
  status: 'accepted' | 'rejected'
) => {
  const jobId = req.params.jobId;
  const empId = req.body.empId;
  await jobService.changeJobApplicationStatus(jobId, empId, status);
  return jobId;
};

const getSuggestedJobs = async (_req: Request, res: Response) => {
  const { employee, employeeInfo } = await jobService.getEmployeeInfo(res.locals.empId);

  const jobs = await jobRepository.getAllJobs(0, Number.MAX_SAFE_INTEGER, {
    expLevel: { equals: employee?.expLevel },
  });

  const suggestedJobs = jobService.sortJobsBasedOnEmployeeTitleAndBio(employeeInfo, jobs);

  return suggestedJobs;
};

export const jobController = {
  postJob,
  getPostedJobs,
  getJobById,
  getAllJobs,
  applyForAJob,
  changeJobApplicationStatus,
  getSuggestedJobs,
};
