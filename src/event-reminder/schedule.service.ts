import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';
import { MailService } from './mail-service';
  // Assuming you have a MailService for sending emails

@Injectable()
export class EventReminderService {
  constructor(
    private prisma: PrismaService,  // Inject PrismaService
    private mailService: MailService,  // Inject MailService for sending emails
  ) {}

  // Cron job to run once a day at midnight
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sendEventReminders() {
    // Get the events happening in the next 24 hours
    const upcomingEvents = await this.prisma.event.findMany({
      where: {
        date: {
          gte: new Date(), // Events that start after the current time
          lte: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Events within 24 hours from now
        },
      },
    });

    // For each event, send reminder emails to the attendees
    for (const event of upcomingEvents) {
      const registrations = await this.prisma.registration.findMany({
        where: { eventId: event.id },
        include: {
          attendee: true,  // Include attendee details
        },
      });

      for (const registration of registrations) {
        // Send email reminder to each attendee
        await this.mailService.sendEventReminder(
          registration.attendee.email,
          event.name,
          event.date,
        );
      }
    }
  }
}
