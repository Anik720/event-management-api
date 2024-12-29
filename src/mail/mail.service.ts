import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  // This method processes the email sending job from the queue
  async sendEmail(job: Job) {
    const { recipient, subject, body } = job.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'test192@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'utzt qtty tkpn lbpo',
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || 'test192@gmail.com',
      to: recipient, // Use recipient instead of email
      subject: subject, // Use subject
      text: body, // Use body
    });

    console.log('Email sent: %s', info.messageId);
  }

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'test192@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'utzt qtty tkpn lbpo',
    },
  });

  async sendReminderEmail(to: string, subject: string, text: string) {
    const info = await this.transporter.sendMail({
      user: process.env.EMAIL_USER || 'test192@gmail.com',
      to,
      subject,
      text,
    });
    console.log('Email sent:', info.messageId);
  }
  // This method adds the email job to the Bull queue
  async addEmailToQueue(recipient: string, subject: string, body: string) {
    await this.emailQueue.add({
      recipient, // Use recipient instead of email
      subject,
      body, // Use body instead of text
    });
  }
}
