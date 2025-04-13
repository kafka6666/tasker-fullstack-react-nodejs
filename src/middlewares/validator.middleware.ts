import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

// Define types for express-validator error objects
interface ExpressValidatorError {
  msg: string;
  [key: string]: unknown; // This allows for both 'path' and 'param' properties
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  // Validate request
  const errors = validationResult(req);

  // If no errors, continue to next middleware
  if (errors.isEmpty()) {
    return next();
  }

  // Extract errors from validationResult
  const extractedError = errors.array().map((err: ExpressValidatorError) => {
    return {
      message: err.msg,
      field: 'path' in err ? String(err.path) : 'param' in err ? String(err.param) : '',
    };
  });

  // Throw ApiError with extracted errors
  throw new ApiError(422, "Received data is not valid", null, false, extractedError);
};