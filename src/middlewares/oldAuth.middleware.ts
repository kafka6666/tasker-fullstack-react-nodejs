// isLoggedIn middleware
import jwt from "jsonwebtoken";
import { env } from "../env.ts";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { logger } from "../utils/logger.ts";
import { ApiError } from "../utils/api-error.ts";
import type { JwtPayload } from "jsonwebtoken";

export const isLoggedIn: RequestHandler = async(req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('=== Auth Middleware Debug ===');
        logger.info('Cookies:', req.cookies);
        logger.info('Headers:', {
            cookie: req.headers.cookie,
            authorization: req.headers.authorization
        });
        
        // Get token from cookie or Authorization header
        let token = req.cookies?.token;
        
        // Check Authorization header if no cookie
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '');
        }

        logger.info('Token found:', token ? 'Yes' : 'No');
        
        // If no token found, return error
        if (!token) {
            logger.info('No token found');
            res.status(401).json(
                new ApiError(
                    401,
                    "Authentication required. Please login.",
                    []
                )
            );
            return;
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;
            logger.info('Token verified successfully');
            
            // Attach user to request
            req.user = {
                id: decoded.id,
                email: decoded.email as string,
                username: decoded.username as string
            };

            // Pass control to the next middleware
            next();
        } catch (error) {
            logger.error('Token verification failed:', error instanceof Error ? error.message : error);
            res.status(401).json(
                new ApiError(
                    401,
                    "Invalid token. Please login again.",
                    [],
                    error instanceof Error ? error.stack : ""
                )
            );
            return;
        }
    } catch (error) {
        logger.error('Auth middleware error:', error instanceof Error ? error.stack : "");
        res.status(500).json(
            new ApiError(
                500,
                "Internal server error",
                [],
                error instanceof Error ? error.stack : ""
            )
        );
        return;
    }
};