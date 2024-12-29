import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'; // Use `* as` to import nodemailer

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure Nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service here
      auth: {
        user: process.env.EMAIL_USER || 'test192@gmail.com', // Your email
        pass: process.env.EMAIL_PASSWORD || 'utzt qtty tkpn lbpo', // Your email password (or use OAuth2)
      },
    });
  }

  async sendConfirmationEmail(to: string, eventName: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'test192@gmail.com', // Sender email
      to, // Recipient email
      subject: `Registration Confirmation for ${eventName}`,
      text: `You have successfully registered for the event: ${eventName}. We look forward to seeing you there!`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
