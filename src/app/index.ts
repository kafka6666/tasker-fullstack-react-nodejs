import express from "express";
import type { Application } from "express";
import { registerRouter as registerHealthCheckRouter } from "./routes/healthcheck/route.ts";

export function createApp(): Application {
    const app: Application = express();

    // Register health check router
    app.use("/api/v1/healthcheck", registerHealthCheckRouter());

    return app;
}