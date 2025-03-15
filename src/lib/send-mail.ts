'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = 'smtp.gmail.com';
const SMTP_SERVER_USERNAME = 'ammarhammed07@gmail.com';
const SMTP_SERVER_PASSWORD = 'ldnm milw cexz dbjt';
const SITE_MAIL_RECIEVER = 'skizoodev@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD
  }
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
    return;
  }
  const info = await transporter.sendMail({
    from: email,
    to: sendTo || SITE_MAIL_RECIEVER,
    subject: subject,
    text: text,
    html: html ? html : ''
  });
  return info;
}
