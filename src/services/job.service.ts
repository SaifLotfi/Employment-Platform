import { Job } from '@prisma/client';

import { jobRepository } from '../models/job.model';
import { CreateJobDTO } from '../types/dto/job.dto';
import { NotFoundError } from '../utils/app-error';
import { NUMBER_OF_CARDS_PER_PAGE } from '../utils/constants';

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

export const jobService = {
  postJob,
  getPostedJobsAndPaginationInfo,
  checkIfJobExists,
  preventUnauthorizedAccessToViewJobPage,
};
