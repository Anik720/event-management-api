import { Module } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { AttendeeController } from './attendee.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [PrismaModule], 
  providers: [AttendeeService,CacheService],
  controllers: [AttendeeController]
})
export class AttendeeModule {}
