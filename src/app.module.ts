import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { AttendeeModule } from './attendee/attendee.module';
import { RegistrationModule } from './registration/registration.module';
import { MailModule } from './mail/mail.module';
import { CacheModule } from './cache/cache.module';
import { EventReminderModule } from './event-reminder/schedule.service.module';
@Module({
  imports: [
    EventModule,
    AttendeeModule,
    RegistrationModule,
    MailModule,
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost', // Redis host
    //     port: 6379, // Redis port
    //   },
    // }),

    // // Register the 'emailQueue' here
    // BullModule.registerQueue({
    //   name: 'emailQueue', // The name of the queue
    // }),
    CacheModule,
    EventReminderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
