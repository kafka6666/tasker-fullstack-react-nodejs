# Tasker Frontend

This is the frontend portion of the Tasker fullstack application built with React, TypeScript, and Vite. The application provides task and project management functionality with a modern, responsive user interface.

## Tech Stack

- React
- TypeScript
- Vite
- Shadcn/ui (for UI components)
- Axios (for API requests)

## Backend Integration

The frontend communicates with the backend through a centralized API client (`src/service/apiClient.ts`). Key features of the integration include:

- Base URL configuration (default: `http://localhost:8000/api/v1`)
- Authentication handling with JWT tokens stored in cookies
- CORS enabled with credentials
- Centralized error handling
- Type-safe API responses

Available API endpoints:

- Auth: `/users/register`, `/users/login`, `/users/logout`, `/users/me`
- Projects: Coming soon
- Tasks: Coming soon
- Notes: Coming soon

## Getting Started

1. Install dependencies:

```bash
npm install
```

The environment variables are automatically handled by Vite, so this step can be skipped. The base URL is already configured in the API client.

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── ui/        # Shadcn UI components
│   ├── lib/           # Utility functions and helpers
│   ├── service/       # API client and services
│   │   └── apiClient.ts  # Centralized API communication
│   └── main.tsx       # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Development Notes

This project uses:

- Vite for fast development and building
- TypeScript for type safety
- Shadcn/ui for consistent UI components
- ESLint for code quality
- Axios for API requests with automatic error handling
- HTTP-only cookies for secure authentication

## Security Considerations

- CORS is configured to only allow requests from trusted origins
- Authentication tokens are stored in HTTP-only cookies
- All API requests include CSRF protection
- Sensitive data is never stored in localStorage

For API documentation and additional development setup, refer to the main project README.
