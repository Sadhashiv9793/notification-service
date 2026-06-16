import nodemailer from "nodemailer";

import { env } from "./env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,

  port: env.SMTP_PORT,

  secure: false,

  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const verifyMailConnection =
  async (): Promise<void> => {
    try {
      await transporter.verify();

      console.log(
        "✅ SMTP Connection Established"
      );
    } catch (error) {
      console.error(
        "❌ SMTP Connection Failed",
        error
      );
    }
  };

export default transporter;

// Usage example:
// import transporter from './config/mail';
// import { verifyMailConnection } from './config/mail';

// await transporter.sendMail({
//   from: "noreply@yourapp.com",

//   to: "user@gmail.com",

//   subject: "Welcome",

//   html: "<h1>Welcome User</h1>",
// });