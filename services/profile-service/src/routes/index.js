import express from "express";
import profileRoutes from "./profile.routes.js";

const router = express.Router();

// Profile routes
router.use("/profiles", profileRoutes);

// Service health route
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile Service is running",
    timestamp: new Date().toISOString(),
  });
});

export default router; 