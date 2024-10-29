import { Request, Response } from 'express';

import { jobService } from '../services/job.service';

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
    expLevel: req.query.expLevel as string,
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

  const jobs = await jobService.getAllFilteredJobs(employee!);

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
