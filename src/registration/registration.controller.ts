import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { RegistrationsService } from './registration.service';

@ApiTags('Registrations')
@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Get(':event_id')
  @ApiOperation({ summary: 'List all registrations for an event' })
  @ApiParam({ name: 'event_id', description: 'ID of the event' })
  @ApiResponse({
    status: 200,
    description: 'Registrations retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findAllByEvent(@Param('event_id') eventId: string) {
    return this.registrationsService.findAllByEvent(eventId);
  }

  @Post()
  @ApiOperation({ summary: 'Register an attendee for an event' })
  @ApiResponse({
    status: 201,
    description: 'Registration completed successfully.',
  })
  @ApiResponse({ status: 400, description: 'Validation or constraint error.' })
  @ApiBody({
    description: 'Payload to register an attendee for an event',
    schema: {
      example: {
        eventId: 'your-event-id',
        attendeeId: 'your-attendee-id',
      },
    },
  })
  register(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.register(
      createRegistrationDto.eventId,
      createRegistrationDto.attendeeId,
    );
  }
}
