import { CustomError } from "./custom-error";

export class DbConnError extends CustomError {
  statusCode = 500;

  constructor() {
    super("Failed to connect to DB");
    Object.setPrototypeOf(this, DbConnError.prototype);
  }
  serializeErrors() {
    return [{ message: "Db Connection Failed" }];
  }
}
