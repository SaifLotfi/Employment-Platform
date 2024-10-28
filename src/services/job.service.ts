import { jobRepository } from "../models/job.model";
import { CreateJobDTO } from "../types/dto/job.dto";

const postJob = async (jobData: CreateJobDTO) => {
  return await jobRepository.createJob(jobData);
};

export const jobService = {
  postJob
}
