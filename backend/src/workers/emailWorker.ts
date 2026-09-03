import { Worker } from "bullmq";
import redisConnection from "../config/redis";
import { sendEmail } from "../services/emailService";

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log("📧 Processing email job:", job.id);
    console.log("Email data:", job.data);

    const { to, subject, body } = job.data;

    const result = await sendEmail(to, subject, body);

    console.log("✅ Email processed successfully");

    return {
      success: true,
      jobId: job.id,
      messageId: result.messageId,
      previewUrl: result.previewUrl,
    };
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

emailWorker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

emailWorker.on("failed", (job, error) => {
  console.error(`❌ Job ${job?.id} failed:`, error.message);
});

console.log("🚀 Email worker is running...");