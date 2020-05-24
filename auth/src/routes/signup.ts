import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DbConnError } from "../errors/db-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password invalid"),
  ],
  (req: Request, res: Response) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) {
      throw new RequestValidationError(valid.array());
    }
    console.log("Creating new user");
    throw new DbConnError();
    res.send({});
  }
);

export { router as signupRouter };
