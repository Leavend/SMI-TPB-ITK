// const nodemailer = require('nodemailer');
// const fs = require('fs');
// const path = require('path');

// const emailTemplate = path.join(`${__dirname}`, '..', 'templates/email.html');
// const template = fs.readFileSync(emailTemplate, 'utf8');

// class EmailService {
//   constructor() {}

//   static async sendForgotPasswordMail(to: string, code: string) {
//     const subject = 'Forgot Password';
//     const message = `Your email verification code is <b>${code}</b>`;
//     return this.sendMail(to, subject, message);
//   }

//   private static replaceTemplateConstant(_template: string, key: string, data: string) {
//     const regex = new RegExp(key, 'g');
//     return _template.replace(regex, data);
//   }

//   private static async sendMail(to: string, subject: string, message: string) {
//     const appName = process.env.APP_NAME as string;
//     const supportMail = process.env.SUPPORT_MAIL as string;
//     const name = to.split('@')[0];
//     let html = this.replaceTemplateConstant(template, '#APP_NAME#', appName);
//     html = this.replaceTemplateConstant(html, '#NAME#', name);
//     html = this.replaceTemplateConstant(html, '#MESSAGE#', message);
//     html = this.replaceTemplateConstant(html, '#SUPPORT_MAIL#', supportMail);
//     const transport = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.MAIL_USER,
//       to,
//       subject,
//       text: message,
//       html: html,
//     };

//     const infoMail = await transport.sendMail(mailOptions);
//     return infoMail;
//   }
// }

// export default EmailService;

import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

class EmailService {
  private static templatePath = path.join(__dirname, '..', 'templates/email.html');

  private static async getEmailTemplate(): Promise<string> {
    try {
      const template = await fs.readFile(this.templatePath, 'utf8');
      return template;
    } catch (error) {
      throw new Error('Error reading email template');
    }
  }

  public static async sendForgotPasswordMail(to: string, code: string): Promise<void> {
    const subject = 'Forgot Password';
    const message = `Your email verification code is <b>${code}</b>`;
    await this.sendMail(to, subject, message);
  }

  private static replaceTemplateConstant(template: string, key: string, data: string): string {
    const regex = new RegExp(key, 'g');
    return template.replace(regex, data);
  }

  private static async sendMail(to: string, subject: string, message: string): Promise<void> {
    try {
      const template = await this.getEmailTemplate();
      const appName = process.env.APP_NAME as string;
      const supportMail = process.env.SUPPORT_MAIL as string;
      const name = to.split('@')[0];

      let html = this.replaceTemplateConstant(template, '#APP_NAME#', appName);
      html = this.replaceTemplateConstant(html, '#NAME#', name);
      html = this.replaceTemplateConstant(html, '#MESSAGE#', message);
      html = this.replaceTemplateConstant(html, '#SUPPORT_MAIL#', supportMail);

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject,
        text: message,
        html: html,
      };

      const infoMail = await transport.sendMail(mailOptions);
      console.log(`Email sent: ${infoMail.messageId}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}

export default EmailService;
