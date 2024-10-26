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
      }
    },
  });
  return job;
};

const getJobs = async (empId: string,skip:number,take:number) => {
  const jobs = await prisma.job.findMany({
    where: {
      empId,
    },
    skip,
    take,
  });
  return jobs;
};

const getNumberOfJobs = async (empId: string) => {
  const numberOfJobs = await prisma.job.count({
    where: {
      empId,
    },
  });
  return numberOfJobs;
}

export const jobRepository:JobDao = {
  createJob,
  getJobs,
  getNumberOfJobs
};
