import express from "express";
import { json } from "body-parser";
import "express-async-errors";
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

app.listen(4000, () => {
  console.log("v1");
  console.log("Auth service listening on port 4000");
});
