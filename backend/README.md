# TaskBox API

A RESTful task management API built with Node.js, Express, and MongoDB.

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication (coming Later..)

## Setup
1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in your own MongoDB URI
4. Run `npm run dev`

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/tasks | Create a new task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a single task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |