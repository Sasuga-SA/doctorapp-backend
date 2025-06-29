import express from "express";
import {
  registerUserController,
  loginUser,
  getProfile,
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/verify.jwt.js";
import { requirePermission } from "../middlewares/role.permissions.js";
import { validateRegisterUser } from "../middlewares/validated.register.js";
import { rateLimiter } from "../middlewares/rate.limiter.js";
import { verifyEmailController } from "../controllers/verify.controller.js";
import {
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/password.controller.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register/", validateRegisterUser, registerUserController);
router.post("/login", rateLimiter, loginUser);
router.get("/verify-email", verifyEmailController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

// Protected routes with permissions
router.get(
  "/profile",
  verifyJWT,
  requirePermission("canViewProfile"),
  getProfile,
);

export default router;
