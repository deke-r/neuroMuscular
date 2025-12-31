# NeuroMusculoRehab Backend - Environment Setup

## Step 1: Create .env file

Create a file named `.env` in the `server` directory with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=pmr_hospital
DB_PORT=3306

PORT=5000
NODE_ENV=development
```

## Step 2: Update Database Credentials

Replace `your_mysql_password_here` with your actual MySQL password.

## Step 3: Execute Database Schema

1. Open MySQL Workbench or command line
2. Execute the SQL file: `database_schema.sql`
3. This will create the database, tables, and insert sample data

## Step 4: Start the Server

```bash
cd c:\projectsBhavishya\neuromuscular\server
npm run dev
```

## API Endpoints

Once the server is running, you can test these endpoints:

### Doctors
- `GET http://localhost:5000/api/doctors` - Get all doctors
- `GET http://localhost:5000/api/doctors/:id` - Get doctor by ID

### Services
- `GET http://localhost:5000/api/services/:doctorId` - Get services for a doctor

### Appointments
- `GET http://localhost:5000/api/appointments/available-slots?doctorId=1&date=2025-12-24` - Get available time slots
- `POST http://localhost:5000/api/appointments` - Book an appointment

### Example POST Request Body for Booking:
```json
{
  "doctorId": 1,
  "serviceId": 1,
  "patientName": "John Doe",
  "patientEmail": "john@example.com",
  "patientPhone": "9876543210",
  "patientAge": 35,
  "patientGender": "Male",
  "appointmentDate": "2025-12-24",
  "appointmentTime": "10:00:00",
  "notes": "First time visit"
}
```
