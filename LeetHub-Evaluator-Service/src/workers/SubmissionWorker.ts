import { Job, Worker } from "bullmq";
import SubmissionJob from "../jobs/SubmissionJob.js";
import redisConnection from "../config/redisConfig.js";

export default function SubmissionWorker(queueName:string){
  new Worker(
    queueName,
    async (job:Job )=>{
        console.log("SubmissionJob kicking in", job);  
        if(job.name === "SubmissionJob"){
            const SubmissionJobInstance = new SubmissionJob(job.data)
            SubmissionJobInstance.handle(job)

            return true
        }
    },
    {
        connection:redisConnection
    }
  )
}
