// services/auth-service/src/routes/permissions.routes.js
import express from "express";
import {
  getUserPermissions,
  checkUserPermission,
  getUserInfoWithPermissions,
  getAllRolesAndPermissions,
} from "../controllers/permissions.controller.js";

import { verifyJWT } from "../middlewares/verify.jwt.js";
import {
  requirePermission,
  // requireAnyPermission,
} from "../middlewares/role.permissions.js";

const router = express.Router();

// All routes require authentication
router.use(verifyJWT);

console.log("Entre");
// Get current user permissions
router.get("/my-permissions", getUserPermissions);

// Check a specific permission
router.get("/check/:permission", checkUserPermission);

// Get complete user information with permissions
router.get(
  "/user-info",
  requirePermission("canViewProfile"),
  getUserInfoWithPermissions,
);

// Get all roles and permissions (administrators only)
router.get(
  "/all-roles",
  requirePermission("canManageSystem"),
  getAllRolesAndPermissions,
);

export default router;
