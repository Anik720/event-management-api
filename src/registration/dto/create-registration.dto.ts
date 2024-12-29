// src/registrations/dto/create-registration.dto.ts
import { IsString } from 'class-validator';

export class CreateRegistrationDto {
  @IsString()
  eventId: string;

  @IsString()
  attendeeId: string;
}
