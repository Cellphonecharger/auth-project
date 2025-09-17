import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  quotes,
} from "../controllers/auth.controller.js";

import { verifyCookieToken } from "../middlewares/verifyCookieToken.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.get("/quotes", quotes);
router.get("/check-auth", verifyCookieToken, (req, res) => {
  res.status(200).json({ message: "Authenticated", userId: req.userId });
});

export default router;
