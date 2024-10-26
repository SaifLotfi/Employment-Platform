import { prisma } from '../libs/prisma.config';
import { JobDao } from '../types/dao/job.dao';
import { CreateJobDTO } from '../types/dto/job.dto';

const createJob = async (jobData: CreateJobDTO) => {
  const { title, salary, description, expLevel, empId } = jobData;
  const job = await prisma.job.create({
    data: {
      title,
      description,
      salary,
      expLevel,
      employer: {
        connect: {
          empId,
        },
      },
    },
  });
  return job;
};

const getPostedJobs = async (skip: number, take: number, empId: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      empId,
    },
    skip,
    take,
  });
  return jobs;
};

const getAllJobs = async (skip: number, take: number,filters:any) => {
  const jobs = await prisma.job.findMany({
    where: filters,
    skip,
    take
  });

  return jobs;
};

const getNumberOfPostedJobs = async (empId: string) => {

    const numberOfJobs = await prisma.job.count({
    where: {
      empId,
    },
  });

  return numberOfJobs;
};

const getNumberOfAllJobs = async (filters:any) => {
  const numberOfJobs = await prisma.job.count({
    where: filters,
  });

  return numberOfJobs;
};

const getJobById = async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: {
      jobId,
    },
  });
  return job;
};

export const jobRepository: JobDao = {
  createJob,
  getPostedJobs,
  getAllJobs,
  getNumberOfPostedJobs,
  getNumberOfAllJobs,
  getJobById,
};
