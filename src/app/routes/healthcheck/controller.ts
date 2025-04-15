import { ApiResponse } from "../../../utils/api-response.ts";
import type { Request, Response } from "express";
import { logger } from "../../../utils/logger.ts";

const healthCheck = (req: Request, res: Response) => {
  logger.info("Server health check done and it's running successfully");
  
  res.json(new ApiResponse(200, { message: "Server health check done and it's running successfully" }));
};

export { healthCheck };