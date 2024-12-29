import { InjectQueue } from '@nestjs/bull';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RegistrationsService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  // Register attendee for event
  async register(eventId: string, attendeeId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }

    // Check if event is full
    const totalRegistrations = await this.prisma.registration.count({
      where: { eventId },
    });

    if (totalRegistrations >= event.max_attendees) {
      throw {
        statusCode: 400,
        message: 'Event is full.',
      };
    }

    // Prevent duplicate registration
    const existingRegistration = await this.prisma.registration.findFirst({
      where: {
        eventId,
        attendeeId,
      },
    });

    if (existingRegistration) {
      throw {
        statusCode: 400,
        message: 'Attendee already registered',
      };
    }

    // Register attendee
    const registration = await this.prisma.registration.create({
      data: {
        eventId,
        attendeeId,
      },
    });

    // Add job to queue to send confirmation email asynchronously
    const attendee = await this.prisma.attendee.findUnique({
      where: { id: attendeeId },
    });

    // Ensure attendee exists and has an email address
    console.log(64,attendee);
    if (attendee?.email) {
      console.log('Adding job to emailQueue');
      await this.emailQueue.add('sendConfirmationEmail', {
        attendeeEmail: attendee.email,
        eventName: event.name,
      }, { removeOnComplete: true });
      console.log('Job added to queue');
      
    }

    return registration;
  }

  // List all registrations for an event
  async findAllByEvent(eventId: string) {
    return this.prisma.registration.findMany({
      where: { eventId },
      include: {
        attendee: true,
      },
    });
  }
  async findAll() {
    return this.prisma.registration.findMany({
      include: {
        event: true,
        attendee: true,
      },
    });
  }

  // Remove a registration (unregister an attendee)
  async remove(eventId: string, attendeeId: string) {
    const registration = await this.prisma.registration.findFirst({
      where: {
        eventId,
        attendeeId,
      },
    });

    if (!registration) {
      throw new BadRequestException('Registration not found');
    }

    // Remove registration
    return this.prisma.registration.delete({
      where: {
        id: registration.id,
      },
    });
  }
}
