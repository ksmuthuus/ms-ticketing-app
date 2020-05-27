import express from "express";
import { currentUser, requireAuth } from "@ksmuthuus/common";

const router = express.Router();

router.get("/api/users/me", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as meRouter };
