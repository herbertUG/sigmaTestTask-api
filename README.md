# Candidate Management System

This project is a web application for storing information about job candidates. It consists of a separate back-end service with API endpoints and a front-end application that utilizes these endpoints.

## Features
- Add and update candidate contact information
- Use email as the unique identifier for candidates
- Store information in a PostgreSQL database
- Authentication using JWT

## Technologies Used
- **Backend:** Node.js, Express, Sequelize, PostgreSQL
- **Frontend:** Next.js
- **Authentication:** JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Installation

1. Clone the repository
2. Set up environment variables
3. Install dependencies
4. Since it's using postgres, create the table
5. Run migrations `npx sequelize-cli db:migrate`
6. Run the application `npm run start`