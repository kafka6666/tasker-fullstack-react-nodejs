import express from "express";
import type { Router } from "express";
import { healthCheck } from "./controller.ts";

export function registerRouter(): Router {
  const router = express.Router();

  router.route("/").get(healthCheck);
  return router;
}