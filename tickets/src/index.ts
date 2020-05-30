import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY not configured");
  }

  if (!process.env.MONGO_SERVER) {
    throw new Error("MONGO_SERVER not configured");
  }

  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_SERVER}:27017/tickets`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
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
