import { Router } from "express";
import { emailQueue } from "../queues/emailQueue";

const router = Router();

router.post("/schedule", async (req, res) => {
  try {
    const {
      to,
      subject,
      body,
      scheduledTime,
    } = req.body;

    if (!to || !subject || !body || !scheduledTime) {
      return res.status(400).json({
        success: false,
        message: "to, subject, body and scheduledTime are required",
      });
    }

    const delay = new Date(scheduledTime).getTime() - Date.now();

    if (delay < 0) {
      return res.status(400).json({
        success: false,
        message: "scheduledTime must be in the future",
      });
    }

    const job = await emailQueue.add(
      "send-email",
      {
        to,
        subject,
        body,
        scheduledTime,
      },
      {
        delay,
        removeOnComplete: false,
        removeOnFail: false,
      }
    );

    res.status(201).json({
      success: true,
      message: "Email scheduled successfully",
      jobId: job.id,
    });
  } catch (error) {
    console.error("Schedule email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to schedule email",
    });
  }
});

export default router;