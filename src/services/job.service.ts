import { jobRepository } from "../models/job.model";
import { CreateJobDTO } from "../types/dto/job.dto";
import { NUMBER_OF_CARDS_PER_PAGE } from "../utils/constants";

const postJob = async (jobData: CreateJobDTO) => {
  return await jobRepository.createJob(jobData);
};

const getPostedJobsAndPaginationInfo = async (empId: string,page: string) => {
  const numberOfJobs = await jobRepository.getNumberOfPostedJobs(empId);

  const jobs = await jobRepository.getPostedJobs(
    NUMBER_OF_CARDS_PER_PAGE * (Number(page) - 1),
    NUMBER_OF_CARDS_PER_PAGE,
    empId
  );

  const totalPages = Math.ceil(numberOfJobs / NUMBER_OF_CARDS_PER_PAGE);

  return {
    jobs,
    totalPages
  }
}

export const jobService = {
  postJob,
  getPostedJobsAndPaginationInfo
}
