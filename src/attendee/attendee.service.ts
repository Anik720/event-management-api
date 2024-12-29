import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Attendee } from '@prisma/client';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class AttendeeService {
  constructor(
    private prisma: PrismaService,
    private cacheService: CacheService,
  ) {}

  // Create a new attendee
  async create(data: { name: string; email: string }) {
    const existingAttendee = await this.prisma.attendee.findUnique({
      where: { email: data.email },
    });

    if (existingAttendee) {
      throw {
        statusCode: 400,
        message: 'Email already exists.',
      };
    }

    const newAttendee = await this.prisma.attendee.create({
      data,
    });

    // Invalidate attendee cache
    await this.cacheService.invalidate('attendees');

    return newAttendee;
  }

  // Get all attendees
  // Get all attendees with caching
  async findAll() {
    const cachedAttendees =
      await this.cacheService.get<Attendee[]>('attendees');

    if (cachedAttendees) {
      return cachedAttendees;
    }

    const attendees = await this.prisma.attendee.findMany();
    await this.cacheService.set('attendees', attendees, 3600); // Cache for 1 hour

    return attendees;
  }

  // Get attendee by id with caching
  async findOne(id: string) {
    const cacheKey = `attendee-${id}`;
    const cachedAttendee = await this.cacheService.get<Attendee>(cacheKey);

    if (cachedAttendee) {
      return cachedAttendee;
    }

    const attendee = await this.prisma.attendee.findUnique({
      where: { id },
    });

    if (!attendee) {
      throw new NotFoundException('Attendee not found');
    }

    // Cache attendee details with a TTL of 1 hour
    await this.cacheService.set(cacheKey, attendee, 3600);

    return attendee;
  }

  // Delete attendee by id
  async remove(id: string) {
    try {
      // Delete related registrations first
      await this.prisma.registration.deleteMany({
        where: { attendeeId: id },
      });
  
      // Then delete the attendee
      await this.prisma.attendee.delete({
        where: { id },
      });
  
      // Invalidate cache for the attendee and attendees list
      await this.cacheService.invalidate(`attendee-${id}`);
      await this.cacheService.invalidate('attendees');
    } catch (error) {
      console.error('Error deleting attendee:', error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  }
  
}
