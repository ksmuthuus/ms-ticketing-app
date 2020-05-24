import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password invalid"),
  ],
  async (req: Request, res: Response) => {
    const valid = validationResult(req);
    if (!valid.isEmpty()) {
      throw new RequestValidationError(valid.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
