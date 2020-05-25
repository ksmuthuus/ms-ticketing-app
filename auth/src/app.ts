import express from "express";
import { json } from "body-parser";
import "express-async-errors";
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

export { app };
