import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user-handler";
import { requireAuth } from "../middlewares/require-auth-handler";

const router = express.Router();

router.get("/api/users/me", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as meRouter };
