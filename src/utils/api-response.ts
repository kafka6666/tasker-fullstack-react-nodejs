class ApiResponse {
  constructor(
    public statusCode: number,
    public data: object,
    public message?: string,
    public success?: boolean
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success || statusCode < 400;
  }
}

export { ApiResponse };