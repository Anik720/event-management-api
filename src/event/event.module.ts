import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { EventsController } from './event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { CacheService } from 'src/cache/cache.service';
import { BullModule } from '@nestjs/bull';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue', // Ensure this matches the queue name used in MailService
    }),
    MailModule,
    PrismaModule,
  ],
  providers: [EventService, EventGateway, MailService, CacheService],
  controllers: [EventsController],
})
export class EventModule {}
