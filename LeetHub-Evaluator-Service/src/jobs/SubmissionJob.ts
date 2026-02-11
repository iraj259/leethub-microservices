import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition.js";
import { SubmissionPayload } from "../types/submissionPayload.js";
import createExecutor from "../utils/ExecutorFactory.js";
import evaluationQueueProducer from "../producers/evaluationQueueProducer.js";
import { ExecutionResponse } from "../types/codeExecuterStrategy.js";

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = async (job?: Job) => {
    if (!this.payload || Object.keys(this.payload).length === 0) {
      console.log("No payload received for job:", job?.id);
      return;
    }

    // console.log("Handler of the job called for job ID:", job?.id);
    // console.log(this.payload);

    // Iterate over all submissions in the payload
    for (const [submissionId, submission] of Object.entries(this.payload)) {
      if (!submission) {
        console.warn(`Submission ${submissionId} is undefined, skipping.`);
        continue;
      }

      const { code, language, inputCase, outputCase, userId } = submission;

      if (!language) {
        console.warn(`Submission ${submissionId} is missing language, skipping.`);
        continue;
      }

      const strategy = createExecutor(language.toLowerCase());

      if (!strategy) {
        console.warn(`No executor available for language: ${language}, skipping.`);
        continue;
      }

      try {
        const response: ExecutionResponse = await strategy.execute(code, inputCase, outputCase);

        // Push result to evaluation queue
        evaluationQueueProducer({ response, userId, submissionId });

        // Logging
        if (response.status === "SUCCESS") {
          console.log(`Submission ${submissionId} executed successfully:`, response);
        } else if (response.status === "WA") {
          console.log(`Submission ${submissionId} executed but output was wrong:`, response);
        } else {
          console.log(`Submission ${submissionId} execution error:`, response);
        }
      } catch (err) {
        console.error(`Error executing submission ${submissionId}:`, err);
      }
    }
  };

  failed = (job?: Job): void => {
    console.log("Job failed:", job?.id);
    if (job && job.data) {
      console.error("Failure reason:", job.data);
    }
  };
}
