import transporter from "../config/mail";

import logger from "../config/logger";

export class EmailService {
  async send(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    try {
      await transporter.sendMail({
        from:
          process.env.SMTP_FROM,

        to,

        subject,

        html,
      });

      logger.info(
        `Email sent to ${to}`
      );
    } catch (error) {
      logger.error(
        `Failed to send email: ${error}`
      );

      throw error;
    }
  }
}

export default new EmailService();