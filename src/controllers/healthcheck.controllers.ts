import { ApiResponse } from "../utils/api-response.js";
import type { Request, Response } from "express";

const healthCheck = (req: Request, res: Response) => {
  console.log("Server health check done and it's running successfully");
  
  res.status(200).json(new ApiResponse(200, { message: "Server health check done and it's running successfully" }));
};

export { healthCheck };