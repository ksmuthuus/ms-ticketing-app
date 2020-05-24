import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from "mongoose";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

//app.use(signinRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
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
