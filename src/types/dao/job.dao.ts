import { Job } from "@prisma/client";
import { CreateJobDTO } from "../dto/job.dto";

export type JobDao = {
  createJob: (jobData: CreateJobDTO) => Promise<Job>;
  getPostedJobs: (skip:number,take:number,empId: string) => Promise<Job[]>;
  getAllJobs: (skip:number,take:number,filters:any) => Promise<Job[]>;
  getNumberOfPostedJobs: (empId: string) => Promise<number>;
  getNumberOfAllJobs: (filters:any) => Promise<number>;
  getJobById: (jobId: string) => Promise<Job | null>;
}
