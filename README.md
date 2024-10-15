# Project Setup and Instructions

## Prerequisites

Make sure you have the following installed:
- Node.js (v14 or above)
- npm (comes with Node.js)

## Project Structure

- `frontend`: Contains the React application.
- `backend`: Contains the NestJS API.

## Setup

### 1. Install Dependencies

You need to install dependencies for both the frontend and backend.

Run the following command in the root of your project to install all dependencies:
npm install

2. Run the Application
You can run the project in two ways:

Option 1: Run Both Frontend and Backend Together
To run both the frontend and backend together, use the concurrently package:
npm start

Option 2: Run Frontend and Backend Separately
You can also run the frontend and backend separately by opening two terminal windows:

To run the backend:
cd backend
npm run start:dev
This will run the backend server at http://localhost:5000.

To run the frontend:
cd frontend
npm start
This will run the frontend application at http://localhost:3000.

Environment Variables
Make sure to set up the required environment variables in the backend/.env file.
