/**
 * Interface for validation error objects
 */
interface ValidationError {
  message: string;
  field: string;
}

class ApiError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {object} data
   * @param {boolean} success
   * @param {ValidationError[]} errors
   * @param {string} stack
   */
  constructor(
    public statusCode: number,
    public message: string = "Something went wrong",
    public data: object | null,
    public success: boolean,
    public errors: ValidationError[],
    public stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically.
    }
  }
}

export { ApiError };