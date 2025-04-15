import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Define environment variables schema
const envSchema = z.object({
  MONGODB_URI: z.string(),
  BASE_URL: z.string(),
  PORT: z.string().optional(),
  CORS_ORIGIN: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
  MAILTRAP_SMTP_HOST: z.string(),
  MAILTRAP_SMTP_PORT: z.string(),
  MAILTRAP_SMTP_USER: z.string(),
  MAILTRAP_SMTP_PASS: z.string(),
  JWT_COOKIE_EXPIRE_TIME: z.string(),
  JWT_EXPIRE_TIME: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string(),
  FRONTEND_URL: z.string(),
  FORGOT_PASSWORD_REDIRECT_URL: z.string().optional(),
})

// Create environment variables
function createEnv(env: NodeJS.ProcessEnv) {
  const validationEnvResult = envSchema.safeParse(env);
  
  if (!validationEnvResult.success) {
    throw new Error(`Invalid environment variables: ${validationEnvResult.error.message}`);
  }
  
  return validationEnvResult.data;
}

export const env = createEnv(process.env);