import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';

@ApiTags('Attendees')
@Controller('attendees')
export class AttendeeController {
  constructor(private readonly attendeesService: AttendeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attendee' })
  @ApiResponse({ status: 201, description: 'Attendee created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Validation failed for input data.',
  })
  @ApiBody({
    description: 'Payload to create a new attendee',
    schema: {
      example: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
    },
  })
  create(@Body() createAttendeeDto: CreateAttendeeDto) {
    return this.attendeesService.create(createAttendeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all attendees' })
  @ApiResponse({
    status: 200,
    description: 'List of attendees retrieved successfully.',
  })
  findAll() {
    return this.attendeesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an attendee by ID' })
  @ApiParam({ name: 'id', description: 'ID of the attendee' })
  @ApiResponse({
    status: 200,
    description: 'Attendee details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Attendee not found.' })
  findOne(@Param('id') id: string) {
    return this.attendeesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an attendee by ID' })
  @ApiParam({ name: 'id', description: 'ID of the attendee to delete' })
  @ApiResponse({ status: 200, description: 'Attendee deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Attendee not found.' })
  remove(@Param('id') id: string) {
    return this.attendeesService.remove(id);
  }
}
