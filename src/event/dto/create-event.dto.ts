// src/event/dto/create-event.dto.ts
import { IsString, IsDate, IsOptional, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsInt()
  @Min(1)
  max_attendees: number;
}
