# Event Booking System API

A scalable backend system for managing events, ticket bookings, and attendance tracking using unique booking codes. Built with Node.js, Express, MySQL, and Sequelize.

---

## Table of Contents

* Project Overview
* Features
* Tech Stack
* System Design
* Setup Instructions
* Environment Variables
* Database Schema
* API Documentation
* API Endpoints
* Testing Guide
* Error Handling
* Future Improvements
* Author

---

## Project Overview

This project provides RESTful APIs for:

* Creating and managing events
* Booking tickets with concurrency control
* Preventing overbooking using transactions
* Tracking attendance via unique booking codes

---

## Features

* Event creation with capacity tracking
* Ticket booking with **transaction management**
* Prevents overbooking
* Unique booking code (UUID)
* Attendance marking system
* Swagger API documentation
* Clean MVC-like structure

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **ORM:** Sequelize
* **API Docs:** Swagger (swagger-jsdoc, swagger-ui-express)
* **Utilities:** UUID, dotenv, cors

---

## System Design

### Architecture

* REST API-based architecture
* Sequelize ORM handles DB interactions
* Transaction used during booking to ensure consistency

### Booking Flow

1. User sends booking request
2. Transaction starts
3. Check event availability
4. Reduce ticket count
5. Create booking with UUID
6. Commit transaction

---

## Setup Instructions

### Clone Repository

bash--
git clone <your-repo-link>
cd event-booking-system

---

### Install Dependencies

bash--
npm install

---

### Environment Variables

Create a `.env` file:

env--
DB_NAME=event_system

DB_USER=root

DB_PASS=Arti@2005

DB_HOST=localhost

PORT=3000

---

## Database Setup

### Create Database

sql--
CREATE DATABASE event_system;

---

### Automatic Table Creation (Recommended)

Sequelize will automatically create tables when the server starts.


### Manual Schema (Optional)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  date DATETIME,
  total_capacity INT,
  remaining_tickets INT
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  booking_code VARCHAR(255)
);

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(255)
);
```

---

## Run the Server

bash--
npx nodemon server.js


Server runs at:

```
http://localhost:3000
```

---

## API Documentation (Swagger)

Access Swagger UI:

```
http://localhost:3000/api-docs
```

---

##  API Endpoints

### User

* `POST /users` → Create user

### Event

* `GET /events` → Get all events
* `POST /events` → Create event

### Booking

* `POST /bookings` → Book ticket
* `GET /users/{id}/bookings` → Get user bookings

### Attendance

* `POST /events/{id}/attendance` → Mark attendance

---

## Testing Guide (Postman Flow)

1. Create User
2. Create Event
3. Book Ticket
4. Fetch User Bookings
5. Mark Attendance

---

## Error Handling

| Error           | Cause                    |
| --------------- | ------------------------ |
| No tickets left | Event capacity exhausted |
| User not found  | Invalid user_id          |
| Invalid code    | Wrong booking_code       |
| Server error    | DB / internal issue      |

---

## Key Concepts Used

* Database Transactions (ACID properties)
* REST API Design
* UUID for unique booking identification
* Sequelize ORM mapping
* API Documentation using Swagger

---

## Author

Prince Kumar
B.Tech CSE | Full Stack Developer
