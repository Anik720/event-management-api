import { Module } from '@nestjs/common';
import { RegistrationsService } from './registration.service';
import { RegistrationsController } from './registration.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
    PrismaModule,
  ],
  providers: [EmailService, EmailProcessor, RegistrationsService],
  controllers: [RegistrationsController],
})
export class RegistrationModule {}
