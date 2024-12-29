// src/events/dto/update-event.dto.ts
import { IsString, IsDate, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @IsInt()
  @Min(1) // Ensure max_attendees is positive
  @IsOptional()
  max_attendees?: number;
}
