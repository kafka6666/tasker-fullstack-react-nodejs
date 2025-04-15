// isLoggedIn middleware (new)
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.ts";
import { ApiError } from "../utils/api-error.ts";
import { env } from "../env.ts";
import { logger } from "../utils/logger.ts";

// Define the JWT payload interface
interface JwtPayload {
  id: string;
  email?: string;
  username?: string;
}

// Extend the Express Request interface using module augmentation
declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
      username: string;
    };
  }
}

export const isLoggedIn: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // Debugging
    logger.info('=== Auth Middleware Debug ===');
    logger.info('Cookies:', req.cookies);
    logger.info('Headers:', {
      cookie: req.headers.cookie,
      authorization: req.headers.authorization
    });

    // Get token from cookies or headers
    const token = 
      (req.cookies?.token as string) || 
      (req.header("Authorization")?.replace("Bearer ", "") as string);

    if (!token) {
      logger.info("Unauthorized - Please login to access this resource");
      res.status(401).json(
        new ApiError(
          401,
          "Unauthorized - Please login to access this resource",
          []
        )
      );
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;

    // Check if decoded has the expected structure
    if (!decoded.id) {
      logger.info("Invalid token format");
      res.status(401).json(
        new ApiError(
          401,
          "Invalid token format",
          []
        )
      );
      return;
    }

    // Find user by id
    const user = await User.findById(decoded.id);

    if (!user) {
      logger.info("User not found");
      res.status(401).json(
        new ApiError(
          401,
          "User not found",
          []
        )
      );
      return;
    }

    // Add user to request object
    req.user = {
      id: user._id as string,
      email: user.email as string,
      username: user.username as string
    };

    // Pass control to the next middleware
    next();
  } catch (error) {
    logger.error("Auth middleware error:", error);
    res.status(401).json(
      new ApiError(
        401,
        "Invalid or expired token",
        [],
        error instanceof Error ? error.stack : ""
      )
    );
  }
};
