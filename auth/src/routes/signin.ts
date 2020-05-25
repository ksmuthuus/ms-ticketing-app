import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest-handler";
import { User } from "../models/user";
import { NotFoundError } from "../errors/not-found-error";
import { Password } from "../helpers/credentials";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password").notEmpty().withMessage("Password invalid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //Check user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }
    console.log(existingUser);

    //Check password
    const validateCred = await Password.compare(
      existingUser.password,
      password
    );
    if (!validateCred) {
      throw new BadRequestError("Invalid Credentials");
    }

    //Gen JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.send(existingUser);
  }
);

export { router as signinRouter };
