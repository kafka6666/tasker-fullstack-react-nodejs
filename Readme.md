# Tasker - Task Management API

A full-stack task management application backend built with TypeScript, Express.js, and MongoDB.

## 🌟 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Role-based access control
  - Password reset functionality

- **Project Management**
  - Create, read, update, and delete projects
  - Add/remove project members
  - Project ownership and collaboration

- **Task Management**
  - Create, read, update, and delete tasks
  - Assign tasks to users
  - Task status tracking
  - Task priority levels
  - Sub-tasks support

- **Note Management**
  - Create, read, update, and delete notes
  - Associate notes with projects

## 🛠️ Tech Stack

- **Backend**
  - TypeScript
  - Node.js & Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Express Validator for request validation
  - Nodemailer & Mailgen for email notifications
  - Multer for file uploads

- **Development Tools**
  - ESLint & Prettier for code quality
  - Nodemon for development server
  - TypeScript compiler
  - Git for version control

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB
- Git

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/kafka6666/tasker-fullstack-react-nodejs.git
cd tasker-fullstack-react-nodejs
```

### Install dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env` file in the root directory using the `env.sample` as a template:

```bash
cp env.sample .env
```

Fill in the appropriate values:

```env
MONGODB_URI=mongodb://localhost:27017/tasker
PORT=8000
CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=10d

MAILTRAP_SMTP_HOST=smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your-mailtrap-username
MAILTRAP_SMTP_PASS=your-mailtrap-password

FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/forgot-password
```

### Start the development server

```bash
npm run dev
```

The server will run at `http://localhost:8000` by default.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

## 📁 Project Structure

```plaintext
src/
├── controllers/        # Request handlers
├── db/                 # Database connection setup
├── middlewares/        # Express middlewares
├── models/             # Mongoose data models
├── routes/             # API routes
├── utils/              # Utility functions
├── validators/         # Request validation schemas
├── app.ts              # Express application setup
└── index.ts            # Entry point
```

## 🔐 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### Projects

- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/:projectId` - Get project details
- `PATCH /api/v1/projects/:projectId` - Update project
- `DELETE /api/v1/projects/:projectId` - Delete project
- `POST /api/v1/projects/:projectId/members` - Add project member
- `DELETE /api/v1/projects/:projectId/members/:userId` - Remove project member

### Tasks

- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/:taskId` - Get task details
- `PATCH /api/v1/tasks/:taskId` - Update task
- `DELETE /api/v1/tasks/:taskId` - Delete task
- `POST /api/v1/tasks/:taskId/subtasks` - Create subtask

### Notes

- `GET /api/v1/notes` - Get all notes
- `POST /api/v1/notes` - Create new note
- `GET /api/v1/notes/:noteId` - Get note details
- `PATCH /api/v1/notes/:noteId` - Update note
- `DELETE /api/v1/notes/:noteId` - Delete note

## 🧪 Testing

```bash
# Coming soon
```

## 🔄 CI/CD

```bash
# Coming soon
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributors

- Md. Abdullahel Kafi

## 🌐 Acknowledgments

- Hitesh Chaudhuri and his team from courses.chaicode.com for the project.
