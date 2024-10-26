import { Job } from "@prisma/client";
import { CreateJobDTO } from "../dto/job.dto";

export type JobDao = {
  createJob: (jobData: CreateJobDTO) => Promise<Job>;
  getJobs: (empId: string,skip:number,take:number) => Promise<Job[]>;
  getNumberOfJobs: (empId: string) => Promise<number>;
  getJobById: (jobId: string) => Promise<Job | null>;
}
