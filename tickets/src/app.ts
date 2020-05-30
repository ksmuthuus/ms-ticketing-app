import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, BadRequestError } from "@ksmuthuus/common";

const app = express();
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.all("*", () => {
  throw new BadRequestError("Invalid Route");
});

app.use(errorHandler);

export { app };
