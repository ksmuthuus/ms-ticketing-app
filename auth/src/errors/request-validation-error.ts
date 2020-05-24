import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Request input invalid");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    const formattedError = this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return formattedError;
  }
}
