import { prisma } from '../libs/prisma.config';
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

export const jobRepository = {
  createJob,
};
