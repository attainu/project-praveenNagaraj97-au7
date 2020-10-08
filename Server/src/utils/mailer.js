import { createTransport } from "nodemailer";
import { renderFile } from "pug";
import { fromString } from "html-to-text";
import dotenvConfig from "../config/dotenvConfig";

dotenvConfig();

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.username;
    this.url = url;
    this.from = `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`;
  }
  createTransport() {
    if (process.env.NODE_ENV === "production") {
      // sendGrid
      return createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SEND_GRID_USER,
          pass: process.env.SEND_GRID_PASSWORD,
        },
      });
    }
    return createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    // Render HTML Based On PUG.
    const html = renderFile(`${__dirname}/../views/mail/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject,
    });

    // Mail Options

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: fromString(html),
    };
    // Transporter to send Email
    await this.createTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send("welcome", "Thank you for Joining !keep Shopping");
  }

  async sendResetPassword() {
    await this.send("forgotPassword", "Password reset Valid for 5 minutes");
  }

  async sendNewEmployeeWelcome() {
    await this.send("newEmployeeWelcome", "Welcome to Lexa Team!");
  }

  async sendNewManufacturerWelcome() {
    await this.send("mfrWelcome", "Thank you, Welcome to Lexa");
  }
}
