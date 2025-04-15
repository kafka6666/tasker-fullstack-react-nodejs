import express from "express";
import type { Application, Request, Response } from "express";
import { registerRouter as registerHealthCheckRouter } from "./routes/healthcheck/route.ts";
import { registerRouter as registerUserRouter } from "./routes/users/route.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "../env.ts";
import { logger } from "../utils/logger.ts";
import { ApiResponse } from "../utils/api-response.ts";

export function createApp(): Application {
    const app: Application = express();

    // Configure cookie parser
    app.use(cookieParser());

    // Configure CORS
    app.use(cors({
        origin: env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        exposedHeaders: ["Set-Cookie", "*"],
    }));

    // Configure JSON middleware
    app.use(express.json());

    // Configure URL-encoded middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    // Test route to check sample cookie handling
    app.get("/", (req: Request, res: Response) => {
        logger.info("===Cookie Debug===");
        logger.info("Request cookies: ", req.cookies);
        logger.info("Request headers: ", {
            cookie: req.headers.cookies,
            origin: req.headers.origin,
        });

        // send response
        res.json(
            new ApiResponse(
                200, 
                { 
                    message: "Hello Cookies!",
                    cookies: req.cookies,
                }
            )
        );
    });
    
    // Register health check router
    app.use("/api/v1/healthcheck", registerHealthCheckRouter());

    // User routes
    app.use("/api/v1/users", registerUserRouter());

    return app;
}