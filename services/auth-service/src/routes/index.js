import express from "express";
import authRoutes from "./auth.routes.js";
import permissionsRoutes from "./permissions.routes.js";

const router = express.Router();

// Group all microservice routes here
router.use("/auth", authRoutes);

console.log("Entre Index Routes");
router.use("/permissions", permissionsRoutes);

// You could add more here in the future:
// router.use('/admin', adminRoutes);

export default router;
