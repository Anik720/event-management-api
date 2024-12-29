import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventService) {}
  @Get('filter-by-date')
  @ApiOperation({ summary: 'Filter events by date range' })
  @ApiQuery({
    name: 'startDate',
    required: true,
    description: 'Start date of the range',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    description: 'End date of the range',
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered events retrieved successfully.',
  })
  filterEventsByDate(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.eventsService.filterEventsByDate(startDate, endDate);
  }

  @Get('search-attendees')
  @ApiOperation({ summary: 'Filter events by date range' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'attendee name',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'attendee email',
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered attendees retrieved successfully.',
  })
  searchAttendees(@Query('name') name: string, @Query('email') email: string) {
    return this.eventsService.searchAttendees(name, email);
  }
  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for input data.',
  })
  @ApiBody({
    description: 'Payload to create a new event',
    schema: {
      example: {
        name: 'Tech Conference 2024',
        description: 'An annual conference for tech enthusiasts',
        date: '2024-12-15T09:00:00.000Z',
        location: 'New York, USA',
        max_attendees: 1000,
      },
    },
  })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all events' })
  @ApiResponse({
    status: 200,
    description: 'List of events retrieved successfully.',
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an event by ID' })
  @ApiParam({ name: 'id', description: 'ID of the event' })
  @ApiResponse({
    status: 200,
    description: 'Event details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiParam({ name: 'id', description: 'ID of the event to update' })
  @ApiResponse({ status: 200, description: 'Event updated successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiParam({ name: 'id', description: 'ID of the event to delete' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
