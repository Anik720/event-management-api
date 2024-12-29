import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from './mail-service';
import { EventReminderService } from './schedule.service';


@Module({
  imports: [
    ScheduleModule.forRoot(), // Import the ScheduleModule for cron jobs
  ],
  providers: [EventReminderService, PrismaService, MailService],  // Add the services to providers
})
export class EventReminderModule {}
