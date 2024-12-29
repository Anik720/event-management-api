import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from './email.service';

@Processor('emailQueue')
export class EmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process()
  async handleEmailJob(job: Job) {
    console.log('Processing job:', job.data);
    try {
      await this.emailService.sendConfirmationEmail(
        job.data.attendeeEmail,
        job.data.eventName,
      );
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error in handleEmailJob:', error);
    }
  }
}
