import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Event } from '@prisma/client';
import { EventGateway } from './event.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from 'src/mail/mail.service';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private eventGateway: EventGateway,
    private mailService: MailService,
    private cacheService: CacheService,
  ) {}

  async create(data: {
    name: string;
    date: Date;
    location?: string;
    max_attendees: number;
  }) {
    // Validate max_attendees as a positive integer
    if (!Number.isInteger(data.max_attendees) || data.max_attendees <= 0) {
      throw {
        statusCode: 400,
        message: 'max_attendees must be a positive integer',
      };
    }

    // Ensure date is a valid Date object
    const eventDate = new Date(data.date);
    if (isNaN(eventDate.getTime())) {
      throw {
        statusCode: 400,
        message: 'Invalid date format',
      };
    }

    // Check for overlapping events
    const existingEvent = await this.prisma.event.findFirst({
      where: {
        date: eventDate,
      },
    });

    if (existingEvent) {
      throw {
        statusCode: 400,
        message: 'Event overlaps with another event on the same date.',
      };
    }

    // Create the new event
    const newEvent = await this.prisma.event.create({
      data: {
        ...data,
        date: eventDate,
      },
    });

    // Emit real-time event notification
    this.eventGateway.server.emit('eventCreated', newEvent);

    // Invalidate event cache
    await this.cacheService.invalidate('events');

    return newEvent;
  }
  // Get all events
  async findAll() {
    const cachedEvents = await this.cacheService.get<Event[]>('events');

    if (cachedEvents) {
      return cachedEvents;
    }

    const events = await this.prisma.event.findMany();
    await this.cacheService.set('events', events, 3600); // Cache for 1 hour

    return events;
  }

  // Get event by id
  async findOne(id: string) {
    const cacheKey = `event-${id}`;
    const cachedEvent = await this.cacheService.get<Event>(cacheKey);

    if (cachedEvent) {
      return cachedEvent;
    }

    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Cache event details with a TTL of 1 hour
    await this.cacheService.set(cacheKey, event, 3600);

    return event;
  }

  // Update event by id
  async update(id: string, data: Partial<Event>) {
    const event = await this.prisma.event.update({
      where: { id },
      data,
    });

    // Invalidate cache for the event and events list after updating
    await this.cacheService.invalidate(`event-${id}`);
    await this.cacheService.invalidate('events');

    return event;
  }

  // Delete event by id
  async remove(id: string) {
    await this.prisma.event.delete({
      where: { id },
    });

    // Invalidate cache for the event and events list after deleting
    await this.cacheService.invalidate(`event-${id}`);
    await this.cacheService.invalidate('events');
  }

// Filter events by date
async filterEventsByDate(startDate: string, endDate: string) {
  const events = await this.prisma.event.findMany({
    where: {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    include: {
      registrations: true,
    },
  });
  return events;
}

// Search attendees by name or email
async searchAttendees(name: string, email: string) {
  const attendees = await this.prisma.attendee.findMany({
    where: {
      OR: [
        { name: { contains: name, mode: 'insensitive' } },
        { email: { contains: email, mode: 'insensitive' } },
      ],
    },
    include: {
      registrations: true,
    },
  });

  return attendees;
}
}
