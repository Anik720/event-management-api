// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Make sure PrismaService is exported
})
export class PrismaModule {}
