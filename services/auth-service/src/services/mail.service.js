import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true", // true = 465
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

export async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: '"Your Clinic" <no-reply@tuclinica.mx>',
    to,
    subject,
    html,
  });
}

export function verifyEmailTemplate(name, url) {
  return `
    <p>Hello ${name},</p>
    <p>Verify your account by clicking on the following link:</p>
    <a href="${url}" target="_blank">Verify account</a>
    <p>If you didn't request this, ignore the message.</p>
  `;
}
