// src/mail/mail.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // Endpoint to trigger the sending of an email
  @Post('send')
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    // Using the method that adds the email to the queue
    await this.mailService.addEmailToQueue(
      sendEmailDto.recipient, // Use recipient instead of email
      sendEmailDto.subject, // Use subject
      sendEmailDto.body,
    );
    return { message: 'Email added to queue' };
  }
}
