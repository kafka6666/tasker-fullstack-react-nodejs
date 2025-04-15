import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import { logger } from "./logger.ts";

// Define the structure for email content
interface MailgenContent {
    body: {
        name: string;
        intro: string;
        action?: {
            instructions: string;
            button: {
                color: string;
                text: string;
                link: string;
            }
        };
        outro: string;
    };
}

// Mail options interface
interface MailOptions {
    email: string;
    subject: string;
    mailGenContent: MailgenContent;
}

// Mail generator
const sendMail = async (options: MailOptions) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Tasker",
          link: "https://mailgen.js",
        },
      });

    // Generate HTML
    const emailHTML = mailGenerator.generate(options.mailGenContent) as string;

    // Generate Text
    const emailText = mailGenerator.generatePlaintext(options.mailGenContent) as string;

    const transporter = nodemailer.createTransport({
        service: 'smtp',
        host: process.env.MAILTRAP_SMTP_HOST,
        port: parseInt(process.env.MAILTRAP_SMTP_PORT || '2525'),
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_SMTP_USER,
          pass: process.env.MAILTRAP_SMTP_PASS,
        },
      } as nodemailer.TransportOptions);

    const mail = {
      from: "mail.tasker@example.com",
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
        logger.info("Email sent successfully");
      } catch (error) {
        logger.error("Error sending email:", error);
      }
}

// Factory function to generate body content of email verification mail to be sent
const emailVerificationMailContentGen = (username: string, verificationUrl: string): MailgenContent => {
    return {
        body: {
            name: username,
            intro: 'Welcome to Tasker App! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with Our App, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your Email',
                    link: verificationUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}
// Factory function to generate body content of email verification mail to be sent
const forgotPasswordResetMailContentGen = (username: string, passwordResetUrl: string): MailgenContent => {
    return {
        body: {
            name: username,
            intro: 'You are receiving this email because you requested a password reset for your account.',
            action: {
                instructions: 'To reset your password, click the button below:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Password',
                    link: passwordResetUrl
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }
}

export { 
  sendMail, 
  emailVerificationMailContentGen, 
  forgotPasswordResetMailContentGen,
  MailOptions,
  MailgenContent
};