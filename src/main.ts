import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import { Queue } from 'bull';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the 'emailQueue' provider and set up Bull Board
  // const emailQueue = app.get<Queue>('emailQueue');  // Ensure this line is correct

  // // Create the Bull Board interface
  // const { router } = createBullBoard([new BullAdapter(emailQueue)]);

  // // Use the router for Bull Board at /queues endpoint
  // app.use('/queues', router);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Event Management API')
    .setDescription('API for managing events, attendees, and registrations')
    .setVersion('1.0')
    .addTag('Events')
    .addTag('Attendees')
    .addTag('Registrations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Set the WebSocket adapter (optional, based on your use case)
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
