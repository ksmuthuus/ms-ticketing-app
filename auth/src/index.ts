import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { meRouter } from "./routes/whoami";
import { errorHandler } from "./middlewares/error-handler";
import { BadRequestError } from "./errors/bad-request-error";
import { signoutRouter } from "./routes/signout";

const app = express();
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(signinRouter);
app.use(signupRouter);
app.use(meRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new BadRequestError("Invalid Route");
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not configured");
  }

  if (!process.env.MONGO_SERVER) {
    throw new Error("MONGO_SERVER not configured");
  }

  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_SERVER}:27017/auth`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Successfully connected to db");
  } catch (err) {
    console.error(err);
  }
  app.listen(4000, () => {
    console.log("v1");
    console.log("Auth service listening on port 4000");
  });
};

start();
