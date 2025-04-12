import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// Mail generator
const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: "Tasker",
          link: "https://mailgen.js",
        },
      });

    // Generate HTML
    const emailHTML = mailGenerator.generate(options.mailGenContent);

    // Generate Text
    const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_SMTP_USER,
          pass: process.env.MAILTRAP_SMTP_PASS,
        },
      });

    const mail = {
      from: "mail.tasker@example.com",
      to: options.email,
      subject: options.subject,
      text: emailText,
      html: emailHTML,
    };

    try {
        await transporter.sendMail(mail);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
}

// Factory function to generate body content of email verification mail to be sent
const emailVerificationMailContentGen = (username, verificationUrl) => {
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
const forgotPasswordResetMailContentGen = (username, passwordResetUrl) => {
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

export { sendMail, emailVerificationMailContentGen, forgotPasswordResetMailContentGen }