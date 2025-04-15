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
    public message: string,
    public errors: ValidationError[],
    public stack: string = "",
    public data?: object,
    public success?: boolean
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = data;
    this.success = success || statusCode > 400;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor); // Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically.
    }
  }
}

export { ApiError };