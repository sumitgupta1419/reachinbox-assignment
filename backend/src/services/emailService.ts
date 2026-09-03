import nodemailer from "nodemailer";

export async function sendEmail(
  to: string,
  subject: string,
  body: string
) {
  // Create a temporary Ethereal account
  const testAccount = await nodemailer.createTestAccount();

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Send email
  const info = await transporter.sendMail({
    from: `"ReachInbox" <${testAccount.user}>`,
    to,
    subject,
    text: body,
  });

  console.log("📧 Email sent successfully!");
  console.log("Message ID:", info.messageId);

  const previewUrl = nodemailer.getTestMessageUrl(info);

  if (previewUrl) {
    console.log("🔗 Ethereal Preview URL:", previewUrl);
  }

  return {
    messageId: info.messageId,
    previewUrl,
  };
}