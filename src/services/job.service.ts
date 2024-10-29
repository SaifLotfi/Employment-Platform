import { Employee, Job } from '@prisma/client';
import stringSimilarity from 'string-similarity';

import { employeeRepository } from '../models/employee.model';
import { jobRepository } from '../models/job.model';
import { CreateJobDTO } from '../types/dto/job.dto';
import { NotFoundError } from '../utils/app-error';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';
import { getJobFilterObject } from '../utils/get-filter-object';

const postJob = async (jobData: CreateJobDTO) => {
  return await jobRepository.createJob(jobData);
};

const getPostedJobsAndPaginationInfo = async (empId: string, page: string) => {
  const numberOfJobs = await jobRepository.getNumberOfPostedJobs(empId);

  const jobs = await jobRepository.getPostedJobs(
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE,
    empId
  );

  const totalPages = Math.ceil(numberOfJobs / NUMBER_OF_CARDS_PER_PAGE);

  return {
    jobs,
    totalPages,
  };
};

const checkIfJobExists = async (jobId: string) => {
  const job = await jobRepository.getJobById(jobId);

  if (!job) {
    throw new NotFoundError('Job not found');
  }

  return job;
};

const preventUnauthorizedAccessToViewJobPage = async (
  userType: 'employee' | 'employer',
  empId: string,
  job: Job
) => {
  if (userType === 'employer' && job.empId !== empId) {
    throw new NotFoundError('Job not found');
  }
};

const filterJobsAndGetTotalNumberOfPages = async (reqQueryObject: any, page: string) => {
  const filters = getJobFilterObject(reqQueryObject);

  const numberOfJobs = await jobRepository.getNumberOfAllJobs(filters);

  const jobs = await jobRepository.getAllJobs(
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE,
    filters
  );

  const totalPages = Math.ceil(numberOfJobs / NUMBER_OF_CARDS_PER_PAGE);

  return {
    jobs,
    totalPages,
  };
};

const getAllFilteredJobs = async (employee:Employee) => {
  const jobs = await jobRepository.getAllJobs(0, Number.MAX_SAFE_INTEGER, {
    expLevel: { equals: employee?.expLevel },
  });

  return jobs;
};

const sortJobsBasedOnEmployeeTitleAndBio = (employeeInfo: string, jobs: Job[]) => {
  const jobRatings = jobs.map(job => ({
    job,
    rating: stringSimilarity.compareTwoStrings(employeeInfo, `${job.title} ${job.description}`),
  }));

  const suggestedJobs = jobRatings
    .sort((a, b) => b.rating - a.rating)
    .slice(0, NUMBER_OF_CARDS_PER_PAGE)
    .map(item => item.job);

  return suggestedJobs;
};

const getEmployeeInfo = async (empId: string) => {
  const employee = await employeeRepository.getEmployeeById(empId);

  const employeeInfo = `${employee?.title} ${employee?.bio}`;

  return { employeeInfo, employee };
};

const applyForAJob = async (jobId: string, empId: string) => {
  await jobRepository.applyForAJob(jobId, empId);
};
const changeJobApplicationStatus = async (
  jobId: string,
  empId: string,
  status: 'accepted' | 'rejected'
) => {
  await jobRepository.changeJobApplicationStatus(jobId, empId, status);
};

export const jobService = {
  postJob,
  getPostedJobsAndPaginationInfo,
  checkIfJobExists,
  preventUnauthorizedAccessToViewJobPage,
  filterJobsAndGetTotalNumberOfPages,
  sortJobsBasedOnEmployeeTitleAndBio,
  getEmployeeInfo,
  applyForAJob,
  changeJobApplicationStatus,
  getAllFilteredJobs
};
