// src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
 // Import your Bull Queue

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',  // This is the queue name
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
  controllers: [MailController],
})
export class MailModule {}
