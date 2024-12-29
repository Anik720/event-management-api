# Event Management API

## Setup Instructions

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the root of the project and configure the following variables:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
REDIS_HOST=localhost
EMAIL_SERVICE=<email_service_provider>
EMAIL_USER=<your_email>
EMAIL_PASSWORD=<your_email_password>


```

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd event-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run database migrations:

   ```bash
   npx prisma migrate dev --name migration_name

   ```

4. Start Redis server (if not already running):

   ````bash
   redis-server   ```

   ````

5. Start the Database server if you running it locally

6. Start the development server:

   ```bash
   npm run start:dev
   ```

7. Access the API documentation at:

   ```
   http://localhost:3000/api/docs
   ```

## Example API Requests

### Event Module

#### Create a New Event

**Endpoint:** `POST /events`

**Request Body:**

```json
{
  "name": "Tech Conference 2024",
  "description": "Annual tech conference for enthusiasts",
  "date": "2024-12-15T09:00:00.000Z",
  "location": "New York, USA",
  "max_attendees": 500
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "Tech Conference 2024",
  "description": "Annual tech conference for enthusiasts",
  "date": "2024-12-15T09:00:00.000Z",
  "location": "New York, USA",
  "max_attendees": 500,
  "created_at": "2024-12-01T12:00:00.000Z"
}
```

#### Get All Events

**Endpoint:** `GET /events`

**Response:**

```json
[
  {
    "id": "uuid",
    "name": "Tech Conference 2024",
    "description": "Annual tech conference for enthusiasts",
    "date": "2024-12-15T09:00:00.000Z",
    "location": "New York, USA",
    "max_attendees": 500,
    "created_at": "2024-12-01T12:00:00.000Z"
  }
]
```

### Attendee Module

#### Create a New Attendee

**Endpoint:** `POST /attendees`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "created_at": "2024-12-01T12:00:00.000Z"
}
```

#### Get All Attendees

**Endpoint:** `GET /attendees`

**Response:**

```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "created_at": "2024-12-01T12:00:00.000Z"
  }
]
```

### Registration Module

#### Register an Attendee for an Event

**Endpoint:** `POST /registrations`

**Request Body:**

```json
{
  "eventId": "event-uuid",
  "attendeeId": "attendee-uuid"
}
```

**Response:**

```json
{
  "id": "uuid",
  "eventId": "event-uuid",
  "attendeeId": "attendee-uuid",
  "registered_at": "2024-12-01T13:00:00.000Z"
}
```

#### Get Registrations for an Event

**Endpoint:** `GET /registrations/:event_id`

**Response:**

```json
[
  {
    "id": "uuid",
    "event_id": "event-uuid",
    "attendee": {
      "id": "attendee-uuid",
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "registered_at": "2024-12-01T13:00:00.000Z"
  }
]
```

## Notes

- Ensure that the database and Redis server are running before starting the application.
- Use the Swagger documentation to explore and test other endpoints.
- Follow NestJS best practices to extend functionality or fix any issues.
