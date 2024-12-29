import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER || 'test192@gmail.com',
      pass:  process.env.EMAIL_PASSWORD || 'utzt qtty tkpn lbpo',
    },
  });

  // Function to send event reminder email
  async sendEventReminder(email: string, eventName: string, eventDate: Date) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: `Reminder: Event "${eventName}" is tomorrow!`,
      text: `Dear attendee,\n\nThis is a reminder that the event "${eventName}" is happening tomorrow, ${eventDate.toDateString()}.\n\nWe hope to see you there!\n\nBest regards,\nEvent Team`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
    }
  }
}
