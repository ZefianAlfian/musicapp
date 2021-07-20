class ErrorResponse extends Error {
  statusCode: number;
  /**
   * ErrorResponse
   * @param {String} message - Message.
   * @param {Number} statusCode - StatusCode (optional).
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode
  }
}

export default ErrorResponse;
