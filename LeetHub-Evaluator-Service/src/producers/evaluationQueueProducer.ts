import evaluationQueue from "../queues/evaluationQueue.js";

export default async function(payload: Record<string, unknown>) {
  try {
    const job = await evaluationQueue.add("EvaluationJob", payload);
    console.log("✅ Job added to evaluationQueue:", job.id, payload);
  } catch (err) {
    console.error("❌ Failed to add job:", err);
  }
}
