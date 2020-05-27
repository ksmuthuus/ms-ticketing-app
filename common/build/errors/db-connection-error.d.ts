import { CustomError } from "./custom-error";
export declare class DbConnError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
