import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.ts";

// Initialize router
const router = Router();

// Route for health check
router.route("/").get(healthCheck);

export default router;