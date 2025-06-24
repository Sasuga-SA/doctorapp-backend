import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true", // true = 465
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

export async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: '"Tu Clínica" <no-reply@tuclinica.mx>',
    to,
    subject,
    html,
  });
}

export function verifyEmailTemplate(name, url) {
  return `
    <p>Hola ${name},</p>
    <p>Verifica tu cuenta haciendo clic en el siguiente enlace:</p>
    <a href="${url}" target="_blank">Verificar cuenta</a>
    <p>Si no solicitaste esto, ignora el mensaje.</p>
  `;
}
