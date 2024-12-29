// src/attendees/dto/create-attendee.dto.ts
import { IsString, IsEmail } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
